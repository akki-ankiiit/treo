#!/usr/bin/env python3
"""
TREO Construction media scraper.

Collects authentic media from the official TREO Construction website
(https://www.treoconstruction.com) in one controlled browser session, downloads
the highest-resolution originals, de-duplicates them, converts photography to
WebP and writes `public/assets/treo/asset-manifest.json`.

It also stores the page text / project metadata it found in
`scripts/data/treo-source.json` so copy can be verified against the source.

Usage:
    python3 -m venv .venv && .venv/bin/pip install playwright beautifulsoup4 requests pillow
    .venv/bin/python -m playwright install chromium
    .venv/bin/python scripts/scrape_treo_assets.py [--headless] [--max-per-project 12]

Notes
- The site sits behind a Cloudflare browser check. A normal (headed) Chromium
  session passes it without interaction; no evasion techniques are used. If a
  challenge requires human interaction the script stops instead of bypassing it.
- Already downloaded files are reused (idempotent re-runs).
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import re
import sys
import time
from dataclasses import dataclass, field, asdict
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from PIL import Image
from playwright.sync_api import sync_playwright

BASE = "https://www.treoconstruction.com"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "treo"
SOURCE_JSON = ROOT / "scripts" / "data" / "treo-source.json"

CORE_PAGES = {
    "home": "/",
    "about": "/about/",
    "team": "/our-team/",
    "services": "/services/",
    "portfolio": "/portfolio/",
    "process": "/our-process/",
    "contact": "/contact-us/",
    "monograph": "/monograph/",
    "testimonials": "/testimonials/",
    "unique": "/what-makes-us-unique/",
}

IMG_RE = re.compile(r"\.(jpe?g|png|webp|avif|gif)(\?.*)?$", re.I)
WP_SIZE_RE = re.compile(r"-\d{2,4}x\d{2,4}(?=\.(jpe?g|png|webp|avif|gif)$)", re.I)
SKIP_RE = re.compile(r"(gravatar|emoji|icon|favicon|spinner|loader|placeholder|blank\.gif)", re.I)

LOCATION_FOLDERS = {
    "golden beach": "golden-beach",
    "miami beach": "miami-beach",
    "bay harbor islands": "bay-harbor",
    "bal harbour": "bal-harbour",
}
KEYWORD_FOLDERS = [
    ("kitchens", r"kitchen"),
    ("bathrooms", r"bath|powder"),
    ("landscaping", r"landscap(e|ing)-?design|garden"),
    ("construction", r"construction-progress|site-?work|under-construction|framing|concrete"),
    ("waterfront", r"waterfront|dock|bay-?view"),
    ("interiors", r"interior|living|dining|bedroom|stair"),
    ("exteriors", r"facade|exterior|front|rear|elevation"),
]

GALLERY_MAX_W = 1600   # gallery images display at ≤ ~800 css px
COVER_MAX_W = 2400     # covers double as full-bleed hero / panorama imagery
WEBP_QUALITY = 80
MIN_SIDE = 150         # smaller images are icons, badges or sprites

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
)

# Collect every image reference on the page: <img> (src/srcset/data-*), lightbox
# links, inline/computed CSS backgrounds and meta tags. Each record keeps context
# so images can be associated with the correct project.
COLLECT_JS = r"""
() => {
  const out = [];
  const inChrome = el => !!el.closest('header, footer, .elementor-location-header, .elementor-location-footer');
  const linkTo = el => { const a = el.closest('a[href]'); return a ? a.href : null; };
  const biggest = srcset => {
    if (!srcset) return null;
    let best = null, bw = 0;
    for (const part of srcset.split(',')) {
      const [u, d] = part.trim().split(/\s+/);
      const w = parseInt(d || '0', 10) || 1;
      if (u && w >= bw) { best = u; bw = w; }
    }
    return best;
  };
  document.querySelectorAll('img').forEach(img => {
    const cands = [img.getAttribute('data-large_image'), img.getAttribute('data-orig-file'),
      biggest(img.getAttribute('data-srcset')), biggest(img.getAttribute('srcset')),
      img.getAttribute('data-lazy-src'), img.getAttribute('data-src'), img.currentSrc, img.src];
    out.push({ kind: 'img', urls: cands.filter(Boolean), alt: img.alt || img.title || '',
      chrome: inChrome(img), link: linkTo(img), w: img.naturalWidth, h: img.naturalHeight });
  });
  document.querySelectorAll('a[href]').forEach(a => {
    if (/\.(jpe?g|png|webp|avif)(\?|$)/i.test(a.href))
      out.push({ kind: 'lightbox', urls: [a.href], alt: a.title || a.getAttribute('aria-label') || '',
        chrome: inChrome(a), link: null });
  });
  document.querySelectorAll('*').forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    const attr = el.getAttribute('data-bg') || el.getAttribute('data-background') || el.getAttribute('data-lazy-background');
    const urls = [];
    if (bg && bg !== 'none') for (const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) urls.push(m[1]);
    if (attr) urls.push(attr);
    if (urls.length) out.push({ kind: 'background', urls, alt: el.getAttribute('aria-label') || '',
      chrome: inChrome(el), link: linkTo(el) });
  });
  document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(m =>
    out.push({ kind: 'social', urls: [m.content], alt: 'social preview', chrome: false, link: null }));
  return out;
}
"""

# Portfolio grid: titles, links, cover image and filter classes per item.
PORTFOLIO_JS = r"""
() => {
  const filters = {};
  document.querySelectorAll('[data-filter]').forEach(f => {
    const key = f.getAttribute('data-filter'); const label = f.textContent.trim();
    if (key && label) filters[key.replace(/^\./, '')] = label;
  });
  const items = [];
  const seen = new Set();
  document.querySelectorAll('a[href*="/portfolio-item/"]').forEach(a => {
    if (seen.has(a.href)) return; seen.add(a.href);
    const card = a.closest('article, .elementor-portfolio-item, .elementor-post, [class*="portfolio"]') || a;
    let classes = '';
    for (let el = a; el && el !== document.body; el = el.parentElement) {
      classes += ' ' + el.className;
      if (el.tagName === 'ARTICLE') break;
    }
    const img = card.querySelector('img');
    items.push({ href: a.href, title: (card.querySelector('h1,h2,h3,h4,h5,.elementor-portfolio-item__title')?.textContent || a.textContent).trim(),
      classes: classes.trim().split(/\s+/), image: img ? (img.currentSrc || img.src) : null, alt: img ? img.alt : '' });
  });
  return { filters, items };
}
"""


def clean_text(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "noscript", "svg", "select", "header", "footer"]):
        tag.decompose()
    text = soup.get_text("\n")
    return re.sub(r"\n\s*\n+", "\n", re.sub(r"[ \t]+", " ", text)).strip()


def parse_project_meta(text: str) -> dict:
    """Project pages list 'Architect: / Interiors: / Landscape: / Status: / Location:' pairs."""
    meta = {}
    for key in ("Architect", "Interiors", "Landscape", "Status", "Location"):
        m = re.search(rf"{key}[^:\n]*:\s*\n?\s*([^\n]+)", text)
        if m and m.group(1).strip() and not m.group(1).strip().endswith(":"):
            meta[key.lower()] = m.group(1).strip()
    if "status" in meta:
        label = re.sub(r"\s*\(\s*", ", " if "construction" in meta["status"].lower() else " ", meta["status"])
        meta["status_label"] = re.sub(r"[()]", "", label).strip()
        # The portfolio only distinguishes Active and Completed; permitting counts as active.
        meta["status"] = "Active" if re.search(r"construction|progress|ongoing|active|permit", meta["status"], re.I) else "Completed"
    if "location" in meta:
        meta["location_full"] = meta.pop("location")
    return meta


def slugify(text: str) -> str:
    text = re.sub(r"[^a-z0-9]+", "-", text.lower())
    return re.sub(r"-+", "-", text).strip("-")


def original_url(url: str) -> str:
    """WordPress thumbnails end in -WxH; the original file has no suffix."""
    return WP_SIZE_RE.sub("", url.split("?")[0])


def title_case_address(title: str) -> str:
    keep_upper = {"NE", "SW", "NW", "SE", "N", "S", "E", "W", "FL", "II", "III"}
    words = []
    for w in title.split():
        core = w.strip(",.")
        if core.upper() in keep_upper:
            words.append(w.upper())
        elif re.match(r"^\d+(st|nd|rd|th)$", core, re.I):
            words.append(w.lower())
        else:
            words.append(w.capitalize())
    return " ".join(words)


@dataclass
class Asset:
    original_url: str
    source_page: str
    kind: str
    alt: str = ""
    project_slug: str | None = None
    project_name: str | None = None
    location: str | None = None
    project_status: str | None = None
    category: str = "miscellaneous"
    tags: list = field(default_factory=list)
    local_file: str | None = None
    width: int | None = None
    height: int | None = None
    format: str | None = None
    bytes: int | None = None
    sha256: str | None = None
    dhash: str | None = None
    download_status: str = "pending"
    duplicate_of: str | None = None
    order: int = 0


class Scraper:
    def __init__(self, headless: bool, max_per_project: int):
        self.headless = headless
        self.max_per_project = max_per_project
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": UA, "Referer": BASE + "/"})
        self.pages: dict = {}
        self.projects: dict = {}
        self.assets: dict[str, Asset] = {}

    # ------------------------------------------------------------------ browser
    def visit(self, page, path: str) -> dict | None:
        url = path if path.startswith("http") else BASE + path
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=60000)
        except Exception as exc:  # noqa: BLE001
            print(f"  ! {path}: {exc.__class__.__name__}")
            return None
        for _ in range(20):
            if "just a moment" not in page.title().lower():
                break
            page.wait_for_timeout(1000)
        else:
            sys.exit("Cloudflare requires interactive verification; stopping instead of bypassing it.")
        page.wait_for_timeout(1500)
        # Scroll gradually to trigger lazy loading / reveal animations.
        height = page.evaluate("document.body.scrollHeight")
        y = 0
        while y < height:
            y += 700
            page.mouse.wheel(0, 700)
            page.wait_for_timeout(120)
            height = page.evaluate("document.body.scrollHeight")
        page.wait_for_timeout(800)
        html = page.content()
        return {
            "url": url,
            "status": "ok",
            "title": page.title(),
            "text": clean_text(html),
            "images": page.evaluate(COLLECT_JS),
            "iframes": [f.get("src") for f in BeautifulSoup(html, "html.parser").find_all("iframe") if f.get("src")],
            "og_image": page.evaluate("document.querySelector('meta[property=\"og:image\"]')?.content || null"),
        }

    def crawl(self):
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=self.headless)
            context = browser.new_context(viewport={"width": 1440, "height": 1000})
            page = context.new_page()
            for key, path in CORE_PAGES.items():
                print(f"→ {path}")
                data = self.visit(page, path)
                if not data:
                    continue
                if "page not found" in data["title"].lower():
                    data["status"] = "404"
                    print("  (404 — skipped)")
                if key == "portfolio":
                    data["grid"] = page.evaluate(PORTFOLIO_JS)
                self.pages[key] = data

            self.build_project_index()
            for slug, project in self.projects.items():
                print(f"→ project {project['name']}")
                data = self.visit(page, project["url"])
                if data:
                    project["page"] = data
                    project.update(parse_project_meta(data["text"]))

            # Monograph: the publication is an Issuu embed. Only its public cover
            # preview is recorded; the publication itself is not downloaded.
            issuu = next((s for s in self.pages.get("monograph", {}).get("iframes", []) if "issuu.com" in s), None)
            if issuu:
                doc = re.search(r"[?&]d=([^&]+)", issuu)
                user = re.search(r"[?&]u=([^&]+)", issuu)
                if doc and user:
                    doc_url = f"https://issuu.com/{user.group(1)}/docs/{doc.group(1)}"
                    try:
                        page.goto(doc_url, wait_until="domcontentloaded", timeout=45000)
                        page.wait_for_timeout(2500)
                        og = page.evaluate("document.querySelector('meta[property=\"og:image\"]')?.content || null")
                        self.pages["monograph"]["issuu"] = {"embed": issuu, "document": doc_url, "cover": og}
                    except Exception as exc:  # noqa: BLE001
                        print(f"  ! issuu: {exc.__class__.__name__}")

            # Share Cloudflare clearance cookies with requests for downloads.
            for c in context.cookies():
                self.session.cookies.set(c["name"], c["value"], domain=c["domain"], path=c["path"])
            self.context_request = context.request
            self.download_all(context)
            browser.close()

    # ---------------------------------------------------------------- projects
    def build_project_index(self):
        grid = self.pages.get("portfolio", {}).get("grid", {"filters": {}, "items": []})
        filters = grid["filters"]
        for order, item in enumerate(grid["items"]):
            path = urlparse(item["href"]).path
            slug = path.rstrip("/").split("/")[-1]
            raw = re.sub(r"\s+", " ", item["title"]).strip()
            labels = sorted({filters[c] for c in item["classes"] if c in filters and filters[c] != "All"})
            status = "Active" if "Active" in labels else "Completed" if "Completed" in labels else None
            locations = [l for l in labels if l not in ("Active", "Completed")]
            # Title format on the site: "ADDRESS, LOCATION" (one entry uses ". ").
            parts = re.split(r",\s*|\.\s+(?=[A-Z]+$)", raw, maxsplit=1)
            name = title_case_address(parts[0])
            location = title_case_address(parts[1]) if len(parts) > 1 else (locations[0] if locations else None)
            self.projects[slug] = {
                "slug": slug,
                "name": name,
                "title": raw,
                "location": location,
                "filters": labels,
                "status": status,
                "url": item["href"],
                "cover": item["image"],
                "cover_alt": item["alt"],
                "order": order,
            }
        print(f"  {len(self.projects)} portfolio projects discovered")

    # --------------------------------------------------------------- downloads
    def register(self, url: str, source: str, kind: str, alt: str, project: dict | None = None, order: int = 0):
        if not url or url.startswith("data:"):
            return
        url = urljoin(BASE, url)
        host = urlparse(url).netloc
        external = "issuu" in host or "isu.pub" in host  # monograph cover preview
        if "treoconstruction.com" not in host and not external:
            return
        if not IMG_RE.search(url.split("?")[0]) and not external:
            return
        if SKIP_RE.search(url):
            return
        key = original_url(url) if "treoconstruction.com" in host else url
        if key in self.assets:
            a = self.assets[key]
            if not a.alt and alt:
                a.alt = alt
            if project and not a.project_slug:
                self._attach(a, project, order)
            return
        a = Asset(original_url=key, source_page=source, kind=kind, alt=alt.strip(), order=order)
        a._fallbacks = [url]  # type: ignore[attr-defined]
        if project:
            self._attach(a, project, order)
        self.assets[key] = a

    @staticmethod
    def _attach(a: Asset, project: dict, order: int):
        a.project_slug = project["slug"]
        a.project_name = project["name"]
        a.location = project["location"]
        a.project_status = project["status"]
        a.order = order

    def collect(self):
        # Other projects' covers must never leak into a project gallery.
        cover_keys = {original_url(p["cover"]): s for s, p in self.projects.items() if p.get("cover")}
        for key, data in self.pages.items():
            if data.get("status") != "ok":
                continue
            for rec in data["images"]:
                link = rec.get("link") or ""
                project = None
                if "/portfolio-item/" in link:
                    slug = urlparse(link).path.rstrip("/").split("/")[-1]
                    project = self.projects.get(slug)
                for u in rec["urls"][:1]:
                    self.register(u, data["url"], "logo" if rec["chrome"] else rec["kind"], rec["alt"], project)
            if key == "monograph" and data.get("issuu", {}).get("cover"):
                self.register(data["issuu"]["cover"], data["issuu"]["document"], "monograph-cover",
                              "From Blueprints to Reality — TREO Construction monograph, 2nd Edition (2026)")

        for slug, project in self.projects.items():
            if project.get("cover"):
                self.register(project["cover"], BASE + "/portfolio/", "project-cover", project["cover_alt"], project, 0)
            data = project.get("page")
            if not data:
                continue
            count = 1
            for rec in data["images"]:
                if rec["chrome"] or rec["kind"] == "social":
                    continue
                link = rec.get("link") or ""
                if "/portfolio-item/" in link and slug not in link:
                    continue  # related-project thumbnail
                u = rec["urls"][0] if rec["urls"] else None
                if not u:
                    continue
                k = original_url(urljoin(BASE, u))
                if cover_keys.get(k, slug) != slug:
                    continue
                if (rec.get("w") or 9999) < 400 and rec["kind"] == "img":
                    continue
                if count >= self.max_per_project and k not in self.assets:
                    continue
                before = len(self.assets)
                self.register(u, data["url"], "project-gallery", rec["alt"], project, count)
                if len(self.assets) > before:
                    count += 1

    def classify(self, a: Asset) -> tuple[str, str]:
        name = Path(urlparse(a.original_url).path).stem
        hay = f"{name} {a.alt}".lower()
        a.tags = [f for f, rx in KEYWORD_FOLDERS if re.search(rx, hay)]
        if re.search(r"pool", hay):
            a.tags.append("pool")
        if a.kind == "logo" or "logo" in hay:
            return "logo", slugify(name)
        if a.kind == "monograph-cover":
            return "monograph", "from-blueprints-to-reality-2026-cover"
        if a.project_slug:
            p = self.projects[a.project_slug]
            loc = (p["location"] or "").lower()
            folder = LOCATION_FOLDERS.get(loc) or ("active-projects" if p["status"] == "Active" else "completed-homes")
            label = "cover" if a.order == 0 else f"{a.order:02d}"
            return folder, f"{slugify(p['name'])}-{slugify(p['location'] or '')}-{label}"
        src = a.source_page
        if "/our-team/" in src:
            return "team", f"treo-team-{slugify(a.alt or name)}"
        if "/testimonials/" in src:
            return "testimonials", f"testimonial-{slugify(a.alt or name)}"
        if "/monograph/" in src:
            return "monograph", slugify(name)
        if a.kind == "social":
            return "miscellaneous", f"social-{slugify(name)}"
        if src.rstrip("/") == BASE and a.kind == "background":
            return "hero", f"treo-home-{slugify(name)}"
        for folder in a.tags:
            if folder in {f for f, _ in KEYWORD_FOLDERS}:
                return folder, slugify(name)
        return "miscellaneous", slugify(name)

    def fetch(self, a: Asset) -> bytes | None:
        for url in [a.original_url, *getattr(a, "_fallbacks", [])]:
            try:
                r = self.session.get(url, timeout=60)
                if r.ok and r.headers.get("content-type", "").startswith("image"):
                    return r.content
                # Cloudflare may challenge plain HTTP clients; use the browser's request context.
                r2 = self.context_request.get(url, timeout=60000)
                if r2.ok and r2.headers.get("content-type", "").startswith("image"):
                    return r2.body()
            except Exception:  # noqa: BLE001
                continue
        return None

    @staticmethod
    def dhash(img: Image.Image) -> str:
        g = img.convert("L").resize((9, 8), Image.LANCZOS)
        px = list(g.getdata())
        bits = "".join("1" if px[r * 9 + c] > px[r * 9 + c + 1] else "0" for r in range(8) for c in range(8))
        return f"{int(bits, 2):016x}"

    def download_all(self, _context):
        self.collect()
        existing = {}
        manifest_path = OUT / "asset-manifest.json"
        if manifest_path.exists():
            for row in json.loads(manifest_path.read_text()).get("assets", []):
                existing[row["original_url"]] = row
        by_sha: dict[str, str] = {}
        by_dhash: dict[str, str] = {}
        used_names: set[str] = set()
        total = len(self.assets)
        print(f"Downloading {total} unique image references…")
        # Project covers first so they win duplicate resolution.
        ordered = sorted(self.assets.values(), key=lambda a: (a.project_slug is None, a.project_slug or "", a.order))
        for i, a in enumerate(ordered, 1):
            folder, stem = self.classify(a)
            base_stem, n = stem[:90], 2
            while f"{folder}/{stem}" in used_names:
                stem = f"{base_stem}-{n}"
                n += 1
            used_names.add(f"{folder}/{stem}")
            a.category = folder
            prev = existing.get(a.original_url)
            if prev and prev.get("local_file") and (ROOT / "public" / prev["local_file"].lstrip("/")).exists():
                for k in ("local_file", "width", "height", "format", "bytes", "sha256", "dhash", "download_status"):
                    setattr(a, k, prev.get(k))
                if a.sha256:
                    by_sha.setdefault(a.sha256, a.local_file)
                if a.dhash:
                    by_dhash.setdefault(a.dhash, a.local_file)
                continue
            raw = self.fetch(a)
            if not raw:
                a.download_status = "failed"
                print(f"  [{i}/{total}] failed {a.original_url}")
                continue
            sha = hashlib.sha256(raw).hexdigest()
            a.sha256 = sha
            if sha in by_sha:
                a.download_status, a.duplicate_of = "duplicate", by_sha[sha]
                continue
            try:
                img = Image.open(io.BytesIO(raw))
                img.load()
            except Exception:  # noqa: BLE001
                a.download_status = "failed"
                continue
            w, h = img.size
            is_treo_logo = folder == "logo" and "treo" in Path(urlparse(a.original_url).path).name.lower()
            if (min(w, h) < MIN_SIDE or max(w, h) / max(min(w, h), 1) > 6 or folder == "logo") and not is_treo_logo:
                a.download_status, a.width, a.height = "skipped", w, h
                continue
            dh = self.dhash(img)
            a.dhash = dh
            if dh in by_dhash and a.kind != "logo":
                a.download_status, a.duplicate_of = "duplicate", by_dhash[dh]
                continue
            dest_dir = OUT / folder
            dest_dir.mkdir(parents=True, exist_ok=True)
            if folder == "logo" or img.mode in ("P", "LA") and "transparency" in img.info:
                # Keep logos lossless (and transparent) as PNG.
                ext, out = "png", raw
                if img.format != "PNG":
                    buf = io.BytesIO()
                    img.save(buf, "PNG", optimize=True)
                    out = buf.getvalue()
            else:
                ext = "webp"
                im = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
                max_w = COVER_MAX_W if a.order == 0 or folder == "hero" else GALLERY_MAX_W
                if im.width > max_w:
                    im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
                buf = io.BytesIO()
                im.save(buf, "WEBP", quality=WEBP_QUALITY, method=6)
                out = buf.getvalue()
                img = im
            dest = dest_dir / f"{stem}.{ext}"
            dest.write_bytes(out)
            a.local_file = "/" + dest.relative_to(ROOT / "public").as_posix()
            a.width, a.height, a.format, a.bytes = img.width, img.height, ext, len(out)
            a.download_status = "downloaded"
            by_sha[sha] = a.local_file
            by_dhash[dh] = a.local_file
            if i % 25 == 0:
                print(f"  [{i}/{total}]")
        self.write_outputs()

    # ------------------------------------------------------------------ output
    def write_outputs(self):
        rows = []
        for a in sorted(self.assets.values(), key=lambda a: (a.category, a.local_file or "~")):
            row = asdict(a)
            if not row["alt"]:
                if a.project_name:
                    row["alt"] = f"{a.project_name}, {a.location} — luxury residence built by TREO Construction"
                elif a.category == "logo":
                    row["alt"] = "TREO Construction logo"
            rows.append(row)
        summary = {
            "generated": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "source": BASE,
            "counts": {
                s: sum(1 for r in rows if r["download_status"] == s)
                for s in ("downloaded", "duplicate", "skipped", "failed", "pending")
            },
            "assets": rows,
        }
        OUT.mkdir(parents=True, exist_ok=True)
        (OUT / "asset-manifest.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False))

        SOURCE_JSON.parent.mkdir(parents=True, exist_ok=True)
        pages = {k: {kk: v for kk, v in d.items() if kk not in ("images",)} for k, d in self.pages.items()}
        projects = {}
        for slug, p in self.projects.items():
            d = {k: v for k, v in p.items() if k != "page"}
            if p.get("page"):
                d["text"] = p["page"]["text"]
            d["images"] = [r["local_file"] for r in rows
                           if r["project_slug"] == slug and r["download_status"] == "downloaded"]
            projects[slug] = d
        SOURCE_JSON.write_text(json.dumps({"pages": pages, "projects": projects}, indent=1, ensure_ascii=False))
        print(json.dumps(summary["counts"]))


def optimise(max_per_project: int):
    """Post-process an existing download: prune galleries, resize/re-encode,
    drop icons/sprites, fetch the monograph cover and refresh project metadata."""
    manifest_path = OUT / "asset-manifest.json"
    data = json.loads(manifest_path.read_text())
    source = json.loads(SOURCE_JSON.read_text())
    for slug, p in source["projects"].items():
        p.update(parse_project_meta(p.get("text", "")))
    issuu = source["pages"].get("monograph", {}).get("issuu", {})
    rows = data["assets"]
    if issuu.get("cover") and not any(r["original_url"] == issuu["cover"] for r in rows):
        rows.append(asdict(Asset(original_url=issuu["cover"], source_page=issuu["document"], kind="monograph-cover",
                                 alt="From Blueprints to Reality — TREO Construction monograph, 2nd Edition (2026)")))
    for i, r in enumerate(rows):
        if i % 40 == 0:  # checkpoint so an interrupted pass can resume
            manifest_path.write_text(json.dumps(data, indent=2, ensure_ascii=False))
        file = ROOT / "public" / r["local_file"].lstrip("/") if r.get("local_file") else None
        slug = r.get("project_slug")
        if slug and slug in source["projects"]:
            p = source["projects"][slug]
            r["project_status"] = p.get("status")
            r["location"] = p.get("location")
        if r["kind"] == "monograph-cover" and r["download_status"] != "downloaded":
            res = requests.get(r["original_url"], headers={"User-Agent": UA}, timeout=60)
            if res.ok:
                img = Image.open(io.BytesIO(res.content)).convert("RGB")
                dest = OUT / "monograph" / "from-blueprints-to-reality-2026-cover.webp"
                dest.parent.mkdir(parents=True, exist_ok=True)
                img.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
                r.update(local_file="/" + dest.relative_to(ROOT / "public").as_posix(), category="monograph",
                         width=img.width, height=img.height, format="webp", bytes=dest.stat().st_size,
                         sha256=hashlib.sha256(res.content).hexdigest(), download_status="downloaded")
            continue
        if r["download_status"] != "downloaded" or not file:
            continue
        w, h = r["width"] or 0, r["height"] or 0
        junk = (min(w, h) < MIN_SIDE or max(w, h) / max(min(w, h), 1) > 6) and r["category"] != "logo"
        junk = junk or (r["category"] == "logo" and "treo" not in Path(urlparse(r["original_url"]).path).name.lower())
        pruned = slug and r.get("order", 0) > max_per_project
        if junk or pruned:
            file.unlink(missing_ok=True)
            r.update(download_status="skipped", local_file=None, duplicate_of=None,
                     note="icon/sprite" if junk else f"beyond {max_per_project}-image gallery limit")
            continue
        if not file.exists():
            r.update(download_status="failed", local_file=None)
            continue
        if r["format"] != "webp" or r.get("optimised"):
            continue
        r["optimised"] = True
        max_w = COVER_MAX_W if r.get("order", 0) == 0 or r["category"] == "hero" else GALLERY_MAX_W
        img = Image.open(file)
        if img.width > max_w:
            img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, "WEBP", quality=WEBP_QUALITY, method=4)
        if len(buf.getvalue()) < file.stat().st_size:
            file.write_bytes(buf.getvalue())
            r.update(width=img.width, height=img.height, bytes=len(buf.getvalue()))
    # Duplicates must point to a file that still exists.
    live = {r["local_file"] for r in rows if r["download_status"] == "downloaded"}
    for r in rows:
        if r["download_status"] == "duplicate" and r.get("duplicate_of") not in live:
            r["duplicate_of"] = None
            r["download_status"] = "skipped"
    data["counts"] = {s: sum(1 for r in rows if r["download_status"] == s)
                      for s in ("downloaded", "duplicate", "skipped", "failed", "pending")}
    data["optimised"] = time.strftime("%Y-%m-%dT%H:%M:%S")
    manifest_path.write_text(json.dumps(data, indent=2, ensure_ascii=False))
    for slug, p in source["projects"].items():
        p["images"] = [r["local_file"] for r in sorted(rows, key=lambda r: r.get("order", 0))
                       if r.get("project_slug") == slug and r["download_status"] == "downloaded"]
    SOURCE_JSON.write_text(json.dumps(source, indent=1, ensure_ascii=False))
    for d in OUT.iterdir():
        if d.is_dir() and not any(d.iterdir()):
            d.rmdir()
    print(json.dumps(data["counts"]))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--headless", action="store_true", help="run Chromium headless (may be blocked by the site's browser check)")
    ap.add_argument("--max-per-project", type=int, default=8, help="gallery images per project (default 8)")
    ap.add_argument("--optimise", action="store_true",
                    help="re-apply size/quality/junk rules to the existing manifest without crawling")
    args = ap.parse_args()
    if args.optimise:
        optimise(args.max_per_project)
    else:
        Scraper(args.headless, args.max_per_project).crawl()


if __name__ == "__main__":
    main()

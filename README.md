# TREO Construction — Website

Marketing website for **TREO Construction**, a luxury residential homebuilder headquartered in North Miami Beach, Florida. *Dream it. Build it. Live it.*

Built on the existing React/Vite experience (GSAP, ScrollTrigger, Lenis, Swiper, Lottie). Layouts, colours, typography and animation choreography are unchanged; content, imagery and data come from the official site, [treoconstruction.com](https://www.treoconstruction.com/).

## Run locally

```bash
npm install
npm run dev        # development server
npm run build      # production build in dist/
npm run preview    # preview the production build
npm test           # Playwright desktop + mobile checks (npx playwright install chromium first)
```

Node.js 22.12+ is recommended.

## Content and data

| Source | Purpose |
| --- | --- |
| `src/data/treo-projects.ts` | Portfolio: 51 projects with address, location, status, architect, interior designer and gallery. Generated, so don't edit it by hand. |
| `src/data/studio.js` | Company contact details, leadership and testimonials (original wording). |
| `public/assets/treo/` | Authentic TREO photography, team portraits, logo and monograph cover, organised by location or category. |
| `public/assets/treo/asset-manifest.json` | Original URL, source page, project, location, alt text, dimensions, format, SHA-256, perceptual hash and download/duplicate status for every asset. |
| `scripts/data/treo-source.json` | Text and project metadata captured from the official pages, used for verification. |

### Refreshing media and portfolio data

```bash
python3 -m venv .venv
.venv/bin/pip install playwright beautifulsoup4 requests pillow
.venv/bin/python -m playwright install chromium
npm run assets:treo                       # scrape + regenerate src/data/treo-projects.ts
.venv/bin/python scripts/scrape_treo_assets.py --optimise   # re-apply size/quality rules only
```

The official site sits behind a Cloudflare browser check. The scraper uses a normal (headed) Chromium session and stops rather than bypassing an interactive challenge. Re-runs reuse files that have already been downloaded.

## Enquiry form

The enquiry modal mirrors the official TREO form: first name, last name, email, phone, "how did you hear about TREO" and project description. To deliver enquiries:

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_CONTACT_ENDPOINT` to an API that accepts a JSON `POST`. It receives `first_name`, `last_name`, `name`, `email`, `phone`, `referral`, `message` and attribution fields.
3. Rebuild.

Without an endpoint, the form never claims a message was sent. It shows TREO's phone number and email instead.

## Deployment

Deploy `dist/` to a static host and rewrite all application routes to `index.html`. A Netlify-style `public/_redirects` is included. Deep links such as `/projects/255-ocean-blvd-golden-beach` and `/#process` are supported.

`index.html` declares the canonical URL, Open Graph URLs and structured data for `https://www.treoconstruction.com/`. Change them if the site is deployed on a different domain.

See `docs/treo-transformation-audit.md` for the component mapping and audit notes.

# TREO Construction transformation audit

## 1. Technical baseline (unchanged)

- **Stack:** React 19, Vite 7, React Router 7, npm. No framework migration.
- **Motion:** GSAP + ScrollTrigger, run by a single choreography engine (`src/animations/referenceEngine.js`). Lenis handles smooth scrolling, Swiper drives the sliders and Lottie the animations. The original brief mentions Framer Motion, but the project doesn't use it.
- **Styles:** `reference.css` (design tokens, type scale, breakpoints at 991/767/479px), `interactions.css`, `app.css` and `studio.css`. The colour palette and fonts (Maison Neue Extended plus the Adobe Typekit display and script fonts) are untouched.
- **Engine-driven behaviour:** Interactions come from data attributes (`data-slider`, `data-tabs`, `data-filter-*`, `data-sort-*`, `data-scroll-reveal`), so content could change without touching motion code.
- **Integration changes:** The only engine change exposes the Lenis instance (`window.__siteLenis`). This lets the new section anchors (`/#process`, `/#services` and others) scroll smoothly.

## 2. Component mapping

| Azure component | TREO content |
| --- | --- |
| `HomeHeader`, `HeaderLogo`, `BrandSeal` | Authentic TREO logo, drawn as a `currentColor` mask so it follows the existing themes. Seal text reads "TREO CONSTRUCTION · SOUTH FLORIDA". Nav: Our Portfolio, Start your project, Contact. |
| `Preloader`, route loader, 404 | TREO Construction lockup, "Dream it. Build it. Live it." |
| `Hero` | "TREO Construction / Miami". Day image: 1745 W 24 St. Night image: 9520 W Broadview Dr at dusk. Headline: "Exceptional homes · Built with purpose". |
| `ArchitecturalTooltips` (hero pins) | Built to the drawings · Context & place · Exquisite details |
| `CoastalIntroduction` | Circle text "Dream it. Build it. Live it." and the three-part descriptor |
| `ThreeReasons` slider | **Testimonials:** 5 authentic reviews, each shown with its own project photo |
| `CommunityQuote` | **Design philosophy:** the official "custodians of someone else's vision" statement |
| `ConceptAndLocation` | **Who we are** (`#about`), South Florida locations, and the process path with TREO stage labels |
| `CoastalPanorama` | Project locations across South Florida, with 5515 Pine Tree Dr as the image |
| `ResidenceTypes` slider | **Leadership** (`#team`): Ricardo Halfen, Eli Abadi and the project management team. Links to the official team page. |
| `ResidenceIntroduction` | Services introduction ("What we do") |
| `Amenities` tabs | **Services** (`#services`): Project Management, Development, Architect & Designer Collaboration, General Contracting. The fifth Azure tab was removed. |
| `LivingSpaces` | **Why clients choose TREO:** six differentiators plus a gallery of interior photos |
| `Architecture` | **Monograph** (`#monograph`): From Blueprints to Reality, 2nd Edition 2026. Links to the official online viewer; no download button. |
| `Development` accordion | **Our Process** (`#process`): the official four stages |
| `SeaViews` | "Let's discuss your project" call to action |
| `Footer` (×2), `MenuModal` (×3), `Navigation` | TREO contact details, office hours, site links, social links |
| `CallModal` + `useContactForm` | Fields match the official TREO form. The form never shows a fake success message. |
| `Portfolio`, `ProjectCard`, `ProjectFilter` | 51 projects. Filters: Status (Completed/Active) and Location; sort by Address or Location. |
| `ProjectPage` | Facts (location, status, architect, interiors), a gallery for that project only, and related projects |
| `ContactPage` | Official address, email, both phone numbers and project locations |

## 3. Content decisions

- **Process:** Uses the four stages on the official `/our-process/` page: Initial Consultation, Pre-Construction, Construction and Post-Construction. The site has no separate "Design" stage; design coordination is part of pre-construction. The 12-month warranty is described as published.
- **Project status:** Taken from each project page. "Permitting" (4355 Sabal Palm Road, 1141 N Venetian Drive) counts as **Active**.
- **Project descriptions:** The official project pages have no narrative text. Detail pages therefore show one factual sentence built only from verified fields. No budgets, square footage or invented stories.
- **About page:** The official About page contains placeholder (lorem ipsum) items. Those were ignored.
- **Testimonials:** Excerpts keep the original wording, trimmed only at sentence boundaries.

## 4. Media pipeline

- **Scraper:** `scripts/scrape_treo_assets.py` (Playwright, BeautifulSoup, Requests, Pillow) ran in one controlled crawl. It covered 10 core pages and 51 project pages.
- **Collection:** It gathered `src`, `srcset`, `data-*` attributes, lightbox links, CSS backgrounds and `og:image` tags. WordPress thumbnails were upgraded to the original files.
- **De-duplication:** SHA-256 hashes plus perceptual hashes (dHash).
- **Mixing guard:** Related-project thumbnails and other projects' covers are excluded, so a gallery never includes another home's photos.
- **Output:** 511 WebP/PNG files, about 105 MB. Covers are capped at 2400px, galleries at 1600px and 8 images per project, at WebP quality 80. Icons, sprites and third-party badges are skipped and recorded in the manifest.
- **Monograph:** Only the public Issuu cover preview was stored. The publication itself is read through the official viewer.

## 5. Removed after confirming nothing references them

- Azure stock photos (`public/assets/interiors`) and Azure process SVGs.
- Unreferenced legacy images and the third-party credit animation.
- 101 unreachable source files (old apartment pages and components) and the Azure rebranding scripts.
- Reachability was checked against an esbuild module graph starting from `src/main.jsx`.

## 6. Verification

- `npm run build` succeeds.
- Playwright: 11 pass, 1 skipped by design (day/night control on mobile).
- Widths checked: 1440, 1280, 1024, 768, 390 and 375. No horizontal overflow, no broken images, no console errors.
- Interactions checked: menu anchors, enquiry modal, filter deep links, `/#section` deep links, 404 page.

# Alireza Mohammadzade Farshchi — Personal Portfolio (`alirezafarshchi.ir`)

Bilingual (English LTR + Persian RTL) personal portfolio built with zero-build modular ES modules and hosted on **GitHub Pages**.

## Architecture
- **Foundations**: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/components.css`, `src/styles/sections.css`
- **Content**: `src/data/content-en.js`, `src/data/content-fa.js`, `src/data/projects.js`
- **Components**: `src/components/nav.js`, `src/components/footer.js`, `src/components/project-card.js`, `src/components/glyphs.js`
- **Pages**: `src/pages/home.js`, `src/pages/work.js`, `src/pages/project-overview.js`, `src/pages/case-study.js`, `src/pages/about.js`
- **Routes**:
  - `/` and `/en/` — English Homepage (8 sections)
  - `/fa/` — Persian RTL Homepage (8 sections)
  - `/en/work/`, `/fa/work/` — Project Archive with category filters
  - `/en/work/<slug>/`, `/fa/work/<slug>/` — Public Project Overview pages
  - `/en/case-study/<slug>/`, `/fa/case-study/<slug>/` — Protected Case Study pages
  - `/en/about/`, `/fa/about/` — Full About, Timeline, Skills, Education & Certifications

## Publishing Protected Case Studies
GitHub Pages is a static host without server-side sessions. Protected case studies use **Web Crypto API (PBKDF2-SHA256 + AES-256-GCM)** so no confidential text is exposed in public HTML, JS, or metadata:
1. Open `/tools/encrypt-case-study.html` locally in your browser.
2. Enter your project slug, a strong passphrase, and your case study JSON.
3. Save the encrypted output to `src/data/encrypted-case-studies/<slug>.json` and push to GitHub.

> Note: For maximum security against offline brute-force attacks on static ciphertext, always use a long random passphrase, or migrate the auth check to a serverless edge function (e.g. Cloudflare Workers) in the future.

## Updating & Deploying
```bash
git add .
git commit -m "Update portfolio"
git push
```

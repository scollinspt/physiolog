# Physiolog Roadmap

_Last updated: 2026-08-17_

Working plan for turning the LaTeX textbook source into the live site, in order.
Update this file as steps are completed or the plan changes.

## 1. Finish the full-book HTML pipeline — DONE

Converted all 12 real chapters in `book/book.tex` (not just the `cardiac_pump.tex`
prototype) to semantic HTML via LaTeXML, resolving cross-chapter references by
converting the whole book together rather than chapter-by-chapter.

- [x] Prototype LaTeXML conversion on one chapter (`cardiac_pump.tex`) — proven feasible.
- [x] Permanent LaTeXML-compatible preamble (`book/latexml-preamble.tex`): stand-ins
      for `svmono`-specific environments/commands (`svgraybox`, `warning`, `question`,
      `backgroundinformation`, `\minitoc`) and `biblatex` citation placeholders.
- [x] Whole-book wrapper (`book/latexml-book.tex`) that `\include`s all real chapters
      in the same order as `book.tex`, so cross-references resolve correctly.
- [x] Build script (`scripts/build-textbook-html.sh`, `npm run build:textbook-html`)
      that runs LaTeXML once across the whole book, splits output per chapter, and
      copies referenced figures + LaTeXML CSS.
- [x] Output lands in `content/textbook/<chapter-slug>/index.html` +
      `public/textbook/figure/` (both generated, gitignored, not committed).

## 2. Wire generated HTML into the site — DONE

Replaced the placeholder in `src/app/textbook/chapter/[chapter]/page.tsx` with real
chapter content loaded from the generated HTML. Replaced the placeholder 7-"chapter"
table of contents in `src/app/textbook/page.tsx` with the real 12-chapter/3-part
structure (`src/app/textbook/chapters.ts`), using slug-based routing (e.g.
`/textbook/chapter/cardiac_pump`). Verified with a full `next build`.

## 3. Site hosting — DECIDED: GitHub Pages + separate VPS for the AI assistant

Split architecture, decoupled from each other:

- **Static site** (textbook, PDF, simulations, research pages) → **GitHub Pages**.
  No variable cost — free hosting, matches the fixed-cost goal.
- **AI assistant backend** (self-hosted quantized model + RAG/guardrail logic, see
  step 5) → **a separate VPS**, reached via a subdomain (e.g. `api.physiolog.org`).
  The static site's AI assistant page calls it via `fetch()`.

**Outstanding work before this can go live:**
- [x] GitHub Pages requires Next.js static export. Added `output: "export"` +
      `images: { unoptimized: true }` to `next.config.ts`. Verified with a full
      build — `out/` contains all pages, the PDF, and figures correctly.
- [x] Added `public/.nojekyll` (GitHub Pages runs Jekyll by default, which ignores
      `_next/` since it starts with `_` — this bypasses that).
- [x] GitHub Actions workflow (`.github/workflows/deploy-pages.yml`): builds
      (`build:textbook-html` + `next build`) and publishes `out/` to GitHub Pages.
      Manually triggered (`workflow_dispatch`) only — matches the explicit,
      deliberate publishing preference already used for the PDF, nothing deploys
      automatically on push.
- [ ] Not yet done: enabling GitHub Pages in the repo's Settings (source: GitHub
      Actions), and running the workflow for the first time.

## 4. Point physiolog.org at GitHub Pages + api.physiolog.org at the VPS

DNS is managed through Cloudflare (domain registrar). No credentials need to be shared —
these are manual steps for the user to do in the Cloudflare/GitHub dashboards.

- [x] `public/CNAME` added (contains `physiolog.org`), so every deploy keeps the
      custom domain association — needed since GitHub Pages is deployed via Actions
      artifact, not a branch.
- [ ] Cloudflare DNS: add 4 `A` records for `physiolog.org` (apex/`@`) to GitHub
      Pages' IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
      `185.199.111.153`. Set them to **DNS only** (grey cloud, not proxied) at
      first — GitHub's automatic HTTPS certificate provisioning is more reliable
      unproxied; proxying can be re-enabled later once HTTPS is confirmed working.
- [ ] Optional: `www` → `CNAME` record pointing to `scollinspt.github.io` if `www`
      access is wanted too.
- [ ] GitHub repo Settings → Pages → Custom domain: enter `physiolog.org`, save.
      DNS propagation + GitHub's verification can take from minutes to ~24 hours.
      Once verified, enable "Enforce HTTPS".
- [ ] Once the custom domain is verified, re-run the `Deploy site to GitHub Pages`
      workflow so the deployed `out/CNAME` matches.
- [ ] Later: `api.physiolog.org`: 1 `A` record to the VPS's IP (once step 5's VPS
      exists), with Cloudflare's proxy enabled for free TLS + basic DDoS/bot
      protection in front of the VPS.

## 5. Build the self-hosted AI assistant backend

Decision made: self-hosted, fixed-cost approach (CPU VPS + quantized open model via
Ollama/llama.cpp, ~$20-40/mo) instead of per-token API billing, to avoid variable costs
scaling with traffic before there's a revenue mechanism in place.

- Chunk/embed book content for retrieval.
- Stand up VPS, run quantized 7-8B open model (Llama 3.1 8B / Mistral 7B / Qwen2.5 7B
  candidates).
- Build retrieval + guardrail orchestration layer (refuse or flag answers that aren't
  well-grounded in retrieved textbook passages — this is the fix for the current
  custom GPT wandering beyond the book's scope).
- Wire `src/app/ai-assistant/page.tsx` to call this backend.

## 6. Simulations, research page content, revenue/cost-control features

Lower priority, iterate after the core site + AI assistant are live. Revenue ideas
under consideration: paid print/eBook edition (ISBNs already reserved), freemium AI
assistant usage cap, institutional licensing, CEU content, donations, grants.

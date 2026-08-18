# Physiolog Roadmap

_Last updated: 2026-08-18_

Working plan for turning the LaTeX textbook source into the live site, in order.
Update this file as steps are completed or the plan changes.

**Current status:** the site is live at <https://physiolog.org> with the full textbook
(12 chapters, HTML + PDF download). Steps 1–4 are done. **Next session starts with
step 5, the licensing review** (repo is MIT, book is CC BY-NC-SA — needs reconciling).
Then step 6, the self-hosted AI assistant backend. See `EDITING.md` for how to make and
publish changes.

**Note:** deploying is publishing — the site is public, and a deploy is a manual step
(Actions tab → "Deploy site to GitHub Pages"). Iterate locally with `npm run dev` and
deploy when you reach a good stopping point. Pushed commits are backed up but not live
until that workflow is run.

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
- [x] Not yet done: enabling GitHub Pages in the repo's Settings (source: GitHub
      Actions), and running the workflow for the first time. — DONE, site is live.

## 3b. Content update workflow

Two independent update paths, but **nothing goes live until the "Deploy site to
GitHub Pages" workflow is run manually from the Actions tab** — a plain `git push`
alone never publishes anything, by design (same explicit-publish preference as the
PDF).

**A. Textbook content (LaTeX edits)**
1. Edit files under `book/chapter/`, `book/author/`, etc.
2. (Optional, for local preview only) `npm run build:textbook-html` regenerates
   `content/textbook/` + figures locally — not committed, CI regenerates its own copy.
3. (Optional) Recompile the PDF: `cd book && latexmk -pdf book.tex && cp book.pdf
   ../public/textbook/clinical-physiology.pdf` (see `book/README.md`) — the PDF *is*
   committed, since it's treated as a deliberate, versioned artifact like before.
4. Commit + push the changed `.tex` source files (and the recompiled PDF, if
   applicable). Do not commit `content/textbook/` or `public/textbook/figure/`.
5. Go to the **Actions** tab → "Deploy site to GitHub Pages" → **Run workflow**.
   This rebuilds the HTML from LaTeX source, builds the site, and publishes it.

**B. Website features (React/TSX/CSS under `src/app/`)**
1. Edit pages/components/styles under `src/app/`.
2. Preview locally with `npm run dev` (run `build:textbook-html` once first if
   previewing textbook pages and `content/textbook/` doesn't exist locally yet).
3. Commit + push.
4. Run the same "Deploy site to GitHub Pages" workflow to publish.

Both paths use the identical deploy step — the only difference is which source
files change.

See `EDITING.md` for the detailed, step-by-step version of this workflow.

## 4. Point physiolog.org at GitHub Pages + api.physiolog.org at the VPS — DONE

Site is live at https://physiolog.org, DNS verified, HTTPS enforced.

- [x] `public/CNAME` added (contains `physiolog.org`).
- [x] Cloudflare DNS: 4 `A` records for `physiolog.org` (apex) to GitHub Pages'
      IPs, plus `www` → `CNAME` → `scollinspt.github.io`, all DNS-only (unproxied).
- [x] GitHub repo Settings → Pages → Custom domain verified, HTTPS enforced.
- [x] Confirmed working end-to-end: home page, textbook table of contents,
      chapter pages (real content), and PDF download all load correctly at
      the custom domain.
- [ ] Later: `api.physiolog.org`: 1 `A` record to the VPS's IP (once step 5's VPS
      exists), with Cloudflare's proxy enabled for free TLS + basic DDoS/bot
      protection in front of the VPS.

## 5. Licensing review — START HERE NEXT SESSION

The repository and the book currently carry **different, potentially conflicting
licenses**, and the book source now lives in this repo:

- `LICENSE` (repo root): **MIT**, Copyright (c) 2026 Sean Collins — permissive,
  allows commercial use, applies to the whole repository by default.
- Book copyright page (`book/book.tex`): **CC BY-NC-SA 4.0**, Copyright 2025 Sean
  Collins — non-commercial, share-alike. Also notes that BioRender-created figures
  carry separate restrictions beyond the CC license.

Since the `.tex` sources are in the repo, a blanket MIT license nominally covers
content the author has separately declared non-commercial — these need reconciling.

Not yet decided. Options to think through (author wants time to consider):
- Dual licensing: MIT (or similar) for code/tooling, CC BY-NC-SA for book content,
  with a clear statement of which files fall under which.
- Change the repo license to match the book.
- Change the book license (note: ISBNs are already registered and the current license
  is printed in the published PDF, so changing this has downstream implications).
- Separately: confirm how the BioRender figure restrictions should be represented,
  since those images are committed to the repo.

Also worth revisiting alongside the revenue ideas in step 7, since license choice
constrains some of them (e.g. paid print edition, institutional licensing).

## 6. Build the self-hosted AI assistant backend

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

## 7. Simulations, research page content, revenue/cost-control features

Lower priority, iterate after the core site + AI assistant are live. Revenue ideas
under consideration: paid print/eBook edition (ISBNs already reserved), freemium AI
assistant usage cap, institutional licensing, CEU content, donations, grants.

---

# Future Fixes

Known gaps to address eventually. Not blocking, not scheduled — parked here so they
aren't forgotten.

## Citations/references missing in the HTML build

The web version has **no working citations or bibliography**. `biblatex` uses expl3
code LaTeXML's TeX parser rejects, so `book/latexml-preamble.tex` stubs citation
commands out:

```latex
\newcommand{\cite}[1]{[#1]}
\newcommand{\printbibliography}{}
```

So `\cite{hall_guyton_2020}` renders on the site as the literal text
`[hall_guyton_2020]`, and there is no reference list on chapter pages. **The PDF build
is unaffected** and renders citations correctly — this is a web-only gap.

Options to evaluate (pick one):
1. **Parse `references.bib` into structured data** (JSON) at build time, then render
   citations as links to a per-chapter or site-wide references section built by a
   React component. Most control, keeps LaTeX source untouched.
2. **Pre-resolve citations into the LaTeX before conversion** — e.g. generate a
   LaTeXML-safe `.bbl`-like set of definitions from Biber output so `\cite` expands
   to real formatted citation text.
3. **Switch the HTML build's citation handling to natbib/BibTeX**, which LaTeXML
   supports natively (the PDF build would keep using biblatex).

Requirements regardless of approach:
- Citation markers in the text should link to the matching reference entry.
- Each chapter (or the site) needs a rendered reference list.
- Must not require editing the `.tex` chapter sources, so the LaTeX stays the single
  source of truth for both PDF and web.

## Draft chapters not yet in the build

`book/chapter/Drafts_In_Progress/` and `book/chapter/OLD_CHP_DRAFTS/` are excluded from
both the PDF and HTML builds. Some in-build chapters contain `\ref`s to them
(`chp:fick_equation`, `chp:digestion_absorption_metabolism`), which currently resolve
to undefined-reference warnings.

## Missing bibliography entries

A few `\cite` keys have no matching entry in `references.bib` (e.g.
`collins_heart_2015`, `schiaffino_molecular_1996`), producing warnings in the PDF build.

## Surface the AI use disclosure on the site

`AI-USE.md` currently lives in the repository only. Since its purpose is reader
transparency, it should also be reachable from the site itself — e.g. a footer link,
an About page, and/or a section on the AI Assistant page. Decide placement and wording
before the AI assistant goes live.

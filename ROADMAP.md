# Physiolog Roadmap

_Last updated: 2026-08-17_

Working plan for turning the LaTeX textbook source into the live site, in order.
Update this file as steps are completed or the plan changes.

## 1. Finish the full-book HTML pipeline (in progress)

Convert all chapters in `book/book.tex` (not just the `cardiac_pump.tex` prototype) to
semantic HTML via LaTeXML, resolving cross-chapter references by converting the whole
book together rather than chapter-by-chapter.

- [x] Prototype LaTeXML conversion on one chapter (`cardiac_pump.tex`) — proven feasible.
- [ ] Permanent LaTeXML-compatible preamble (stand-ins for `svmono`-specific
      environments/commands: `svgraybox`, `warning`, `question`,
      `backgroundinformation`, `\minitoc`, citation placeholders).
- [ ] Wrapper document that `\include`s all real chapters in the same order as
      `book.tex`, so cross-references between chapters resolve correctly.
- [ ] Build script that runs LaTeXML once across the whole book, splits output
      per chapter, and copies only the figures actually referenced.
- [ ] Output landing spot decided (e.g. `content/textbook/<chapter-slug>/index.html`
      + `public/textbook/figures/`).

## 2. Wire generated HTML into the site

Replace the placeholder in `src/app/textbook/chapter/[chapter]/page.tsx` with real
chapter content loaded from the generated HTML. Reconcile the current placeholder
7-"chapter" table of contents in `src/app/textbook/page.tsx` with the actual 12 LaTeX
chapter files (introduction, fundamentals, tension, excitation, regulation, energetics,
microcirculation, renal_clearance, circulation, cardiac_pump, respiration, ventilation).

## 3. Decide + lock in site hosting (Vercel vs GitHub Pages)

Now decoupled from the AI assistant decision (see step 5) since that backend will be
hosted separately either way. Pick whichever is simpler to maintain for the static site.

## 4. Point physiolog.org at the chosen host

DNS is managed through Cloudflare (domain registrar). No credentials need to be shared —
once step 3 is decided, exact DNS records to add in the Cloudflare dashboard will be
provided.

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

# Editing Guide

How to make changes to the book and the website, and how to get those changes live.

There are two independent kinds of edits — **book content** (LaTeX) and **website
features** (React/TSX) — but they share the same publish step at the end.

> **Nothing goes live automatically.** A `git push` only saves and backs up your work.
> The site updates only when you manually run the deploy workflow (see
> [Publishing](#publishing)). This is intentional, so you can commit work in progress
> without publishing it.

---

## Where things live

| What | Where | Committed to git? |
|---|---|---|
| Book source (LaTeX) | `book/chapter/`, `book/author/`, `book/figure/` | Yes |
| Compiled PDF | `public/textbook/clinical-physiology.pdf` | Yes |
| Generated chapter HTML | `content/textbook/<slug>/index.html` | No — regenerated |
| Generated figures/CSS for web | `public/textbook/figure/`, `public/textbook/*.css` | No — regenerated |
| Website pages/features | `src/app/` | Yes |
| Chapter page *shell* | `src/app/textbook/chapter/[chapter]/page.tsx` | Yes |
| Chapter/part structure | `src/app/textbook/chapters.ts` | Yes |

The generated files are build output. They're rebuilt from the LaTeX source every time
the site is published, so they're deliberately not committed.

---

## A. Editing the book (LaTeX)

The LaTeX source in `book/` is the single source of truth. Both the PDF and the web
version are generated from it, so you only ever edit the `.tex` files — never the
generated HTML.

### 1. Edit the source

Chapter files are in `book/chapter/` (e.g. `cardiac_pump.tex`), front/back matter in
`book/author/`, images in `book/figure/`, citations in `book/references.bib`.

If you **add or remove a chapter**, you must update three places to keep them in sync:
1. `book/book.tex` — the `\include` list (controls the PDF)
2. `book/latexml-book.tex` — the same `\include` list (controls the web version)
3. `src/app/textbook/chapters.ts` — chapter slug, number, title, and which part it's in

### 2. Rebuild the PDF

```bash
cd book
latexmk -pdf book.tex
cp book.pdf ../public/textbook/clinical-physiology.pdf
```

The PDF is committed, so this step is required if you want the downloadable PDF on the
site to reflect your edits.

### 3. Preview the web version locally (optional)

```bash
npm run build:textbook-html   # regenerates content/textbook/ + figures
npm run dev                   # open http://localhost:3000
```

This is only for checking your work locally. You don't need to commit anything it
produces — the deploy workflow runs this same command itself.

### 4. Commit and push

```bash
git add book/ public/textbook/clinical-physiology.pdf
git commit -m "Describe the content change"
git push origin main
```

Then see [Publishing](#publishing).

---

## B. Editing the website

This covers everything that isn't book content: the home page, navigation, footer,
the textbook table of contents, the simulations/research/AI assistant pages, styling,
and the layout that chapter content is displayed inside.

You are **not** editing chapter HTML here. Chapter body content is generated from
LaTeX (section A). What you *can* edit is the page "shell" around it —
`src/app/textbook/chapter/[chapter]/page.tsx` — which controls the back-link, the
prev/next navigation, the fallback message, and how the generated content is framed.

### 1. Edit files under `src/app/`

| To change… | Edit |
|---|---|
| Header nav, footer, site metadata | `src/app/layout.tsx` |
| Home page | `src/app/page.tsx` |
| Textbook table of contents | `src/app/textbook/page.tsx` |
| Chapter list/numbering/parts | `src/app/textbook/chapters.ts` |
| Chapter page layout & navigation | `src/app/textbook/chapter/[chapter]/page.tsx` |
| Simulations / Research / AI Assistant pages | `src/app/<section>/page.tsx` |
| Global styles | `src/app/globals.css` |

### 2. Preview locally

```bash
npm run dev   # open http://localhost:3000
```

If you haven't generated the textbook HTML on this machine yet, run
`npm run build:textbook-html` once first, or chapter pages will show a
"not built yet" placeholder.

### 3. Commit and push

```bash
git add src/
git commit -m "Describe the site change"
git push origin main
```

---

## Publishing

Both kinds of edits publish the same way:

1. Go to the repository on GitHub → **Actions** tab.
2. Select **"Deploy site to GitHub Pages"** in the left sidebar.
3. Click **Run workflow** → leave the branch as `main` → **Run workflow**.

The workflow installs LaTeXML, regenerates the chapter HTML from the LaTeX source,
builds the site, and publishes it to <https://physiolog.org>. It takes several minutes
(most of it installing TeX packages).

---

## First-time / new machine setup

```bash
npm install                       # site dependencies
brew install latexml              # LaTeX → HTML converter
# plus a TeX distribution (MacTeX) for latexmk/pdflatex to build the PDF
```

---

## Known limitations

- **Citations aren't rendered in the web version yet.** `biblatex` uses code LaTeXML
  can't parse, so `\cite{...}` currently renders as a plain bracketed key (e.g.
  `[hall_guyton_2020]`) and there's no bibliography section on chapter pages. The PDF
  is unaffected and shows citations normally. See the roadmap for the planned fix.
- Chapters still in `book/chapter/Drafts_In_Progress/` and
  `book/chapter/OLD_CHP_DRAFTS/` are not included in either build.

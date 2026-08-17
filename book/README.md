# Clinical-Physiology-A-muscle-centered-approach

Book in progress for physical therapy students and physical therapists about clinical physiology that looks directly at the muscle fiber (cell) and considers what it needs to do its required tasks. It turns out that this is the fundamental step in considering movement since the tension developed by muscles are fundamental to the task of moving, which is required for movement.

## Compiling locally

```bash
cd book
latexmk -pdf book.tex
cp book.pdf ../public/textbook/clinical-physiology.pdf
```

Requires a TeX distribution with `latexmk`/`pdflatex` (e.g. TeX Live, MacTeX). `book.tex` is the
root file; `chapter/Drafts_In_Progress/` and `chapter/OLD_CHP_DRAFTS/` are not yet included in the
build.

## Generating the web version (HTML)

`latexml-book.tex` and `latexml-preamble.tex` are a separate wrapper used only for HTML
conversion via [LaTeXML](https://math.nist.gov/~BMiller/LaTeXML/) (`brew install latexml`) —
they stand in for `svmono`-specific commands/environments and `biblatex` (both of which
LaTeXML can't parse directly), so the actual chapter content converts cleanly. They are not
used for the PDF build.

```bash
npm run build:textbook-html
```

This converts the whole book at once (so cross-chapter references resolve) and splits the
result per chapter into `content/textbook/<chapter-slug>/index.html`, copying referenced
figures to `public/textbook/figure/`. Both are generated output and gitignored, not committed.


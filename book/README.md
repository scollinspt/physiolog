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


#!/usr/bin/env bash
# Converts the whole LaTeX textbook (book/book.tex chapter order) to per-chapter
# HTML via LaTeXML, and copies figures into public/ for the Next.js site.
#
# Requires: latexmlc (brew install latexml)
#
# Output (generated, gitignored — not committed):
#   content/textbook/<chapter-slug>/index.html
#   public/textbook/figure/

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BOOK_DIR="$REPO_ROOT/book"
CONTENT_DIR="$REPO_ROOT/content/textbook"
FIGURE_DIR="$REPO_ROOT/public/textbook/figure"

# Must match the \include order of chapter/*.tex in book/book.tex.
CHAPTERS=(
  introduction
  fundamentals
  tension
  excitation
  regulation
  energetics
  microcirculation
  renal_clearance
  circulation
  cardiac_pump
  respiration
  ventilation
)

cd "$BOOK_DIR"
rm -rf latexml_build
mkdir -p latexml_build

latexmlc --path=. --format=html5 --splitat=chapter \
  --dest=latexml_build/book.html latexml-book.tex

rm -rf "$CONTENT_DIR" "$FIGURE_DIR"
mkdir -p "$CONTENT_DIR" "$FIGURE_DIR"

cp -R latexml_build/figure/. "$FIGURE_DIR/"

for i in "${!CHAPTERS[@]}"; do
  n=$((i + 1))
  slug="${CHAPTERS[$i]}"
  mkdir -p "$CONTENT_DIR/$slug"
  sed 's#src="figure/#src="/textbook/figure/#g' \
    "latexml_build/Ch${n}.html" > "$CONTENT_DIR/$slug/index.html"
done

echo "Wrote ${#CHAPTERS[@]} chapters to $CONTENT_DIR"
echo "Wrote figures to $FIGURE_DIR"

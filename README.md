# Physiolog

**physiolog.org** — An integrative clinical physiology resource.

## Overview

Physiolog is a multi-purpose site serving as:

1. **Clinical Physiology Textbook** — The textbook is authored in LaTeX (see `book/`). The web version hosts it chapter-by-chapter with embedded video explanations and interactive figures. A compiled PDF is available for download.

2. **Interactive Simulations** — Dynamic, browser-based physiology simulations that allow hands-on exploration of cardiovascular, respiratory, renal, and other physiological models.

3. **AI Learning Assistant** — A domain-specific NLP/LLM agent grounded in the textbook content and a curated research library, using retrieval-augmented generation (RAG) to support deep mechanistic understanding.

4. **Integrative Research** — Ongoing research into clinical physiology as the mechanistic foundation for clinical reasoning, including the *Clinical Inference Engine* and *models4PT* projects.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- Deployed to [physiolog.org](https://physiolog.org)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

See [EDITING.md](EDITING.md) for how to edit the book and the site, and how to publish
changes to [physiolog.org](https://physiolog.org).

## Project Structure

```
book/                     # LaTeX source for the textbook (single source of truth)
  book.tex                # Root file for the PDF build
  latexml-book.tex        # Root file for the HTML build
  chapter/                # Chapter sources
scripts/
  build-textbook-html.sh  # LaTeX -> per-chapter HTML (npm run build:textbook-html)
src/
  app/
    page.tsx              # Landing page
    layout.tsx            # Root layout with navigation
    textbook/             # Textbook pages
      page.tsx            # Table of contents
      chapters.ts         # Chapter/part structure
      chapter/[chapter]/  # Individual chapters
    simulations/          # Interactive simulations
    ai-assistant/         # AI assistant interface
    research/             # Research page
```

## Contributing

This is a personal academic project. If you are interested in collaborating, please open an issue or contact via the site.

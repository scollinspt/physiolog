# Use of AI in This Project

_Last updated: 2026-08-18_

This project takes an explicit position on where AI has and has not been used, because
the textbook is an academic work and readers deserve to know the provenance of what
they're reading.

## Textbook content: written by the author, not AI

**No part of the textbook has been written or edited by AI.** All chapters, figures,
explanations, and the underlying reasoning in *Clinical Physiology: A Muscle Centered
Approach* are the author's own scholarly work.

Going forward, AI may be used for **copyediting** — grammar, clarity, consistency,
and typographical corrections. If and when that happens, it will be in a supporting
editorial role on already-authored text. AI is not used to generate physiological
explanations, draft chapters, or make substantive claims about content.

## Software: built with AI assistance

The website and supporting software **were** built with substantial AI assistance —
specifically GitHub Copilot running in the VS Code IDE. This includes:

- The Next.js website (pages, layout, styling, routing)
- The LaTeX → HTML build pipeline (`scripts/build-textbook-html.sh`, the LaTeXML
  wrapper and preamble in `book/`)
- Deployment workflows and hosting configuration (GitHub Actions, GitHub Pages,
  static export setup)
- Project documentation (`EDITING.md`, `ROADMAP.md`, and this file)
- The AI learning assistant (planned)
- Interactive simulations (planned)

All AI-assisted code was directed, reviewed, and accepted by the author.

## The AI learning assistant

The planned AI learning assistant is a **reader-facing tool**, distinct from both
categories above. It is designed to answer questions using retrieval grounded in the
textbook's content, with guardrails intended to keep it from straying beyond what the
book actually says. It does not modify the textbook.

When it is live, its behavior and limitations will be documented here and on the
assistant's page.

## Why this distinction matters

The scholarly claims in this textbook should be attributable to a human author who is
accountable for them. Software tooling is a different matter — it is infrastructure,
not scholarship, and AI assistance there does not affect the integrity of the content.

Questions about any of this are welcome via the project repository.

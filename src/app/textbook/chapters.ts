// Single source of truth for the textbook's chapter/part structure, matching
// the \include order in book/book.tex and the slugs produced by
// scripts/build-textbook-html.sh.

export interface Chapter {
  slug: string;
  number: number;
  title: string;
}

export interface Part {
  title: string;
  chapters: Chapter[];
}

export const textbookParts: Part[] = [
  {
    title: "Part I: Preliminaries",
    chapters: [
      { slug: "introduction", number: 1, title: "Introduction" },
      { slug: "fundamentals", number: 2, title: "Fundamentals" },
    ],
  },
  {
    title: "Part II: Muscle Function",
    chapters: [
      { slug: "tension", number: 3, title: "Tension" },
      { slug: "excitation", number: 4, title: "Excitation" },
      { slug: "regulation", number: 5, title: "Regulation" },
      { slug: "energetics", number: 6, title: "Energetics" },
    ],
  },
  {
    title: "Part III: Muscle Support",
    chapters: [
      { slug: "microcirculation", number: 7, title: "Micro-Circulation" },
      { slug: "renal_clearance", number: 8, title: "Renal Clearance" },
      { slug: "circulation", number: 9, title: "Circulation" },
      { slug: "cardiac_pump", number: 10, title: "Cardiac Pump" },
      { slug: "respiration", number: 11, title: "Respiration" },
      { slug: "ventilation", number: 12, title: "Ventilation" },
    ],
  },
];

export const allChapters: Chapter[] = textbookParts.flatMap((part) => part.chapters);

export function getChapter(slug: string): Chapter | undefined {
  return allChapters.find((c) => c.slug === slug);
}

export function getAdjacentChapters(slug: string): { prev?: Chapter; next?: Chapter } {
  const index = allChapters.findIndex((c) => c.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? allChapters[index - 1] : undefined,
    next: index < allChapters.length - 1 ? allChapters[index + 1] : undefined,
  };
}

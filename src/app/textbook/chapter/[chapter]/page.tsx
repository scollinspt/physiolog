interface PageProps {
  params: Promise<{ chapter: string }>;
}

export default async function ChapterPage({ params }: PageProps) {
  const { chapter } = await params;
  const chapterNum = parseInt(chapter, 10);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mb-4">
        ← <a href="/textbook" className="hover:underline">Back to Table of Contents</a>
      </p>
      <h1 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">
        Chapter {chapterNum}
      </h1>

      <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-6 mb-8">
        <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
          🚧 Chapter content is coming soon. The textbook is being actively authored and will be
          published here as chapters are completed.
        </p>
      </div>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        Each chapter will include written content, embedded video explanations, and links to
        relevant interactive simulations. Check back soon or{" "}
        <a href="/textbook" className="text-blue-700 dark:text-blue-400 hover:underline">
          download the latest PDF
        </a>
        {" "}for the most current version.
      </p>
    </div>
  );
}

export async function generateStaticParams() {
  return Array.from({ length: 7 }, (_, i) => ({ chapter: String(i + 1) }));
}

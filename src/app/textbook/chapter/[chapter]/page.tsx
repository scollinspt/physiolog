import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allChapters, getChapter, getAdjacentChapters } from "../../chapters";

interface PageProps {
  params: Promise<{ chapter: string }>;
}

// The generated file is a full HTML document (see scripts/build-textbook-html.sh);
// pull out just the body so it can be embedded in this page's own layout.
function extractBody(html: string): string | null {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : null;
}

export default async function ChapterPage({ params }: PageProps) {
  const { chapter: slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const { prev, next } = getAdjacentChapters(slug);

  let body: string | null = null;
  try {
    const html = await readFile(
      path.join(process.cwd(), "content", "textbook", slug, "index.html"),
      "utf-8"
    );
    body = extractBody(html);
  } catch {
    body = null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <link rel="stylesheet" href="/textbook/LaTeXML.css" />
      <link rel="stylesheet" href="/textbook/ltx-book.css" />

      <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mb-4">
        ← <Link href="/textbook" className="hover:underline">Back to Table of Contents</Link>
      </p>

      {body ? (
        <div dangerouslySetInnerHTML={{ __html: body }} />
      ) : (
        <>
          <h1 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Chapter {chapter.number}: {chapter.title}
          </h1>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-6 mb-8">
            <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
              🚧 This chapter hasn&apos;t been built yet. Run <code>npm run build:textbook-html</code> to
              generate it from the LaTeX source.
            </p>
          </div>
        </>
      )}

      <div className="mt-12 flex justify-between text-sm">
        {prev ? (
          <Link href={`/textbook/chapter/${prev.slug}`} className="text-blue-700 dark:text-blue-400 hover:underline">
            ← Chapter {prev.number}: {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/textbook/chapter/${next.slug}`} className="text-blue-700 dark:text-blue-400 hover:underline">
            Chapter {next.number}: {next.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allChapters.map((c) => ({ chapter: c.slug }));
}


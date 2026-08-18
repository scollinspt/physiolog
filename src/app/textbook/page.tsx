import Link from "next/link";
import { textbookParts } from "./chapters";

export default function TextbookPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white">Clinical Physiology Textbook</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
          A comprehensive textbook grounded in mechanistic reasoning, designed to bridge basic physiology
          and clinical practice. Available to read chapter-by-chapter online, with embedded video
          explanations and interactive figures.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="/textbook/clinical-physiology.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors text-sm"
          >
            ⬇ Download PDF
          </a>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Table of Contents</h2>
        {textbookParts.map((part) => (
          <div key={part.title} className="mb-10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
              {part.title}
            </h3>
            <ol className="space-y-4">
              {part.chapters.map((ch) => (
                <li key={ch.slug}>
                  <Link
                    href={`/textbook/chapter/${ch.slug}`}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                  >
                    <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-sm">
                      {ch.number}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                        {ch.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      <section className="mt-14 p-6 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-bold mb-2 text-blue-900 dark:text-blue-200">About This Textbook</h2>
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
          This textbook is written in LaTeX and maintained in this project&apos;s{" "}
          <a
            href="https://github.com/scollinspt/physiolog"
            className="underline hover:text-blue-900 dark:hover:text-blue-200"
          >
            GitHub repository
          </a>
          . The web version is generated from the same source, allowing embedded video
          explanations and interactive physiology simulations alongside the written content.
        </p>
      </section>
    </div>
  );
}


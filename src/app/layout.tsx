import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Physiolog | Clinical Physiology",
  description:
    "An integrative resource for clinical physiology: textbook, interactive simulations, AI-assisted learning, and ongoing research.",
};

const navLinks = [
  { href: "/textbook", label: "Textbook" },
  { href: "/simulations", label: "Simulations" },
  { href: "/ai-assistant", label: "AI Assistant" },
  { href: "/research", label: "Research" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-400">
              Physiolog
            </Link>
            <ul className="flex gap-6 text-sm font-medium">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Sean Collins, Professor of Clinical Inquiry, Doctor of Physical Therapy Program,
            Plymouth State University
          </p>
          <p className="mt-1 flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/sean-collins-868b3a391/"
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/scollinspt"
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              GitHub Profile
            </a>
            <a
              href="https://github.com/scollinspt/physiolog"
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Project Repository
            </a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Physiolog &mdash; physiolog.org</p>
        </footer>
      </body>
    </html>
  );
}

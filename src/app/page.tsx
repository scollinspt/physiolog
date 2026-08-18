import Link from "next/link";

const features = [
  {
    title: "Clinical Physiology Textbook",
    description:
      "The full Clinical Physiology: A Muscle Centered Approach — read online with interactive figures, or download the PDF. Written for DPT programs and practicing clinicians.",
    href: "/textbook",
    icon: "📖",
  },
  {
    title: "Interactive Simulations",
    description:
      "Explore cardiovascular, respiratory, and renal models hands-on — see how support systems respond to the demands of movement and exercise.",
    href: "/simulations",
    icon: "⚗️",
  },
  {
    title: "AI Learning Assistant",
    description:
      "Ask questions and get explanations grounded in the textbook itself — built to develop mechanistic reasoning, not surface recall.",
    href: "/ai-assistant",
    icon: "🤖",
  },
  {
    title: "Integrative Research",
    description:
      "Ongoing work on clinical physiology as the mechanistic foundation for clinical reasoning, including the Clinical Inference Engine and models4PT projects.",
    href: "/research",
    icon: "🔬",
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
          Clinical Physiology, <span className="text-blue-700 dark:text-blue-400">Muscle Centered</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
          An open textbook and learning resource for physical therapy students and clinicians. It
          starts with a simple premise: begin at the muscle fiber, ask what it needs to generate
          tension, and every other system — circulation, respiration, renal — comes into focus as
          support for movement.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Also useful for exercise science, athletic training, and anyone studying human movement.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/textbook"
            className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Read the Textbook
          </Link>
          <Link
            href="/simulations"
            className="px-6 py-3 border border-blue-700 text-blue-700 dark:text-blue-400 dark:border-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-900 transition-colors"
          >
            Explore Simulations
          </Link>
        </div>
      </section>

      {/* Feature grid */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
          A Complete Learning Resource
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group block p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{f.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

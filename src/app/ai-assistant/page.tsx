const capabilities = [
  {
    title: "Answer Questions",
    description:
      "Ask conceptual or clinical physiology questions grounded in the textbook and curated research library.",
    icon: "💬",
  },
  {
    title: "Explain Concepts",
    description:
      "Get clear, mechanistic explanations of physiological principles tied to specific textbook sections.",
    icon: "🧠",
  },
  {
    title: "Guided Study",
    description:
      "Work through case-based scenarios with guided reasoning to strengthen clinical inference skills.",
    icon: "📚",
  },
  {
    title: "Research Synthesis",
    description:
      "Query a curated library of primary research on clinical physiology for evidence-based answers.",
    icon: "🔍",
  },
];

export default function AiAssistantPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white">
          AI Learning Assistant
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
          A domain-specific AI agent trained on the Clinical Physiology textbook and a curated
          library of research papers — designed to support mechanistic understanding rather than
          surface-level recall.
        </p>
      </div>

      <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-6 mb-10">
        <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
          🚧 The AI assistant is currently in development. It will be available once the textbook
          content and research corpus are ready for model fine-tuning and retrieval-augmented
          generation (RAG) integration.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <span className="text-3xl">{cap.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{cap.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-bold mb-2 text-blue-900 dark:text-blue-200">Technical Approach</h2>
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
          The assistant uses retrieval-augmented generation (RAG) over the textbook and curated
          research library, combined with a domain-tuned language model. This grounds every
          response in authoritative sources and minimises hallucination while still enabling
          natural, conversational interaction.
        </p>
      </section>
    </div>
  );
}

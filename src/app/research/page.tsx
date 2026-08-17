const researchAreas = [
  {
    title: "Clinical Inference Engine",
    description:
      "Developing a formal model of clinical reasoning that uses physiology as the mechanistic backbone for diagnosis and treatment inference.",
    tags: ["Clinical Reasoning", "Physiology", "Inference"],
  },
  {
    title: "models4PT",
    description:
      "Physiological and computational models supporting Physical Therapy practice — bridging basic science and clinical decision-making.",
    tags: ["Physical Therapy", "Models", "Clinical Application"],
  },
  {
    title: "Integrative Physiology",
    description:
      "Systems-level approaches to physiology that integrate organ and cellular function to explain whole-body responses in health and disease.",
    tags: ["Systems Physiology", "Integrative", "Health & Disease"],
  },
];

const principles = [
  "Physiology is the fundamental science underlying all clinical reasoning.",
  "Mechanistic models enable principled inference from signs, symptoms, and measurements.",
  "Integration across organ systems is required to explain complex clinical presentations.",
  "Quantitative and qualitative models complement each other in clinical practice.",
];

export default function ResearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white">
          Integrative Research
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
          Physiolog supports ongoing research into clinical physiology as the mechanistic
          foundation for clinical reasoning. This work spans model development, educational
          frameworks, and applied clinical inference.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Research Areas</h2>
        <div className="space-y-5">
          {researchAreas.map((area) => (
            <div
              key={area.title}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{area.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Core Principles</h2>
        <ul className="space-y-3">
          {principles.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xs font-bold">
                ✓
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-bold mb-2 text-blue-900 dark:text-blue-200">Collaborate</h2>
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
          If you are interested in collaborating on research related to clinical physiology, clinical
          inference, or educational model development, please reach out via the contact information
          provided on this site.
        </p>
      </section>
    </div>
  );
}

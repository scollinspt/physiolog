import Link from "next/link";

const simulations = [
  {
    id: "cardiac-output",
    title: "Cardiac Output & Frank-Starling",
    description:
      "Interactively adjust preload, afterload, and contractility to observe changes in cardiac output and ventricular function curves.",
    status: "live" as const,
    tags: ["Cardiovascular", "Mechanics"],
    href: "/simulations/cardiac-output",
  },
  {
    id: "poiseuille",
    title: "Poiseuille's Law: Why Radius Matters",
    description:
      "Change vessel radius, pressure, viscosity, and length to see why small changes in arteriolar radius have large effects on flow.",
    status: "live" as const,
    tags: ["Cardiovascular", "Hemodynamics"],
    href: "/simulations/poiseuille",
  },
  {
    id: "ventilation-perfusion",
    title: "Ventilation-Perfusion Matching",
    description:
      "Explore how V/Q ratios affect oxygenation and CO₂ elimination across the lung.",
    status: "coming-soon" as const,
    tags: ["Respiratory", "Gas Exchange"],
    href: "#",
  },
  {
    id: "tubuloglomerular-feedback",
    title: "Tubuloglomerular Feedback",
    description:
      "Simulate renal autoregulation of GFR and renal blood flow in response to perturbations.",
    status: "coming-soon" as const,
    tags: ["Renal", "Autoregulation"],
    href: "#",
  },
  {
    id: "acid-base-map",
    title: "Acid-Base Status Map",
    description:
      "Plot arterial blood gas values on an interactive Stewart acid-base diagram and identify disturbances.",
    status: "coming-soon" as const,
    tags: ["Acid-Base", "Renal", "Respiratory"],
    href: "#",
  },
];

export default function SimulationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white">
          Interactive Simulations
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
          Dynamic physiology models that let you manipulate variables and observe real-time
          physiological responses. Each simulation links to relevant textbook chapters and
          explanatory videos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {simulations.map((sim) => (
          <div
            key={sim.id}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="font-bold text-gray-900 dark:text-white">{sim.title}</h2>
              {sim.status === "coming-soon" && (
                <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                  Coming Soon
                </span>
              )}
              {sim.status === "live" && (
                <Link
                  href={sim.href}
                  className="shrink-0 text-xs font-bold uppercase tracking-wide text-rose-700 hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-100"
                >
                  Open simulation
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {sim.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {sim.tags.map((tag) => (
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

      <div className="mt-10 p-6 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-bold mb-2 text-blue-900 dark:text-blue-200">About the Simulations</h2>
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
          Simulations are built using web-native technologies so they run directly in your browser
          with no installation required. They are designed to complement the textbook by providing
          interactive, hands-on exploration of physiological models.
        </p>
      </div>
    </div>
  );
}

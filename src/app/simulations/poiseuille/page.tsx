import Link from "next/link";
import PoiseuilleSimulation from "../PoiseuilleSimulation";

export default function PoiseuillePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/simulations"
        className="text-sm font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
      >
        ← All simulations
      </Link>
      <div className="mt-6 rounded-lg border border-teal-200 bg-teal-50 px-5 py-4 dark:border-teal-950 dark:bg-teal-950/30">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Circulation and resistance
        </p>
        <p className="mt-2 text-sm leading-relaxed text-teal-950 dark:text-teal-100">
          This model turns the circulation chapter&apos;s Poiseuille equation into a visual experiment.
          Start near baseline, move the radius slightly, and compare that change with viscosity or
          vessel length.
        </p>
        <Link
          href="/textbook/chapter/circulation"
          className="mt-3 inline-block text-sm font-bold text-teal-800 underline decoration-teal-300 underline-offset-4 hover:text-teal-950 dark:text-teal-200 dark:hover:text-white"
        >
          Read the Circulation chapter
        </Link>
      </div>
      <PoiseuilleSimulation />
    </div>
  );
}
import Link from "next/link";
import BloodPressureSimulation from "../BloodPressureSimulation";

export default function BloodPressurePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/simulations"
        className="text-sm font-semibold text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
      >
        ← All simulations
      </Link>
      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-950 dark:bg-amber-950/30">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
          Circulation and blood pressure
        </p>
        <p className="mt-2 text-sm leading-relaxed text-amber-950 dark:text-amber-100">
          This model follows the circulation chapter&apos;s blood pressure equations: cardiac output
          supplies the beat, while total peripheral resistance determines how much pressure remains
          between beats. Compare resting and exercise conditions, then change one variable at a time.
        </p>
        <Link
          href="/textbook/chapter/circulation"
          className="mt-3 inline-block text-sm font-bold text-amber-800 underline decoration-amber-300 underline-offset-4 hover:text-amber-950 dark:text-amber-200 dark:hover:text-white"
        >
          Read the Circulation chapter
        </Link>
      </div>
      <BloodPressureSimulation />
    </div>
  );
}
import Link from "next/link";
import CardiacOutputSimulation from "../CardiacOutputSimulation";

export default function CardiacOutputPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/simulations"
        className="text-sm font-semibold text-rose-700 hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-100"
      >
        ← All simulations
      </Link>
      <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 dark:border-rose-950 dark:bg-rose-950/30">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
          Cardiovascular mechanics
        </p>
        <p className="mt-2 text-sm leading-relaxed text-rose-950 dark:text-rose-100">
          This model isolates how preload, afterload, and contractility shape one ventricular beat.
          Read the circulation chapter&apos;s discussion of cardiac output, then use the controls to
          test the relationships rather than memorizing them.
        </p>
        <Link
          href="/textbook/chapter/cardiac_pump"
          className="mt-3 inline-block text-sm font-bold text-rose-800 underline decoration-rose-300 underline-offset-4 hover:text-rose-950 dark:text-rose-200 dark:hover:text-white"
        >
          Read the Cardiac Pump chapter
        </Link>
      </div>
      <CardiacOutputSimulation />
    </div>
  );
}
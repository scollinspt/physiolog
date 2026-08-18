"use client";

import { useState } from "react";

const defaults = {
  radius: 1,
  pressure: 100,
  viscosity: 1,
  length: 1,
};

export default function PoiseuilleSimulation() {
  const [inputs, setInputs] = useState(defaults);
  const resistance = (inputs.viscosity * inputs.length) / inputs.radius ** 4;
  const flow = 5 * (inputs.pressure / 100) / resistance;
  const pressureForBaselineFlow = 100 * resistance;
  const flowChange = flow / 5;
  const radiusChange = inputs.radius ** 4;

  function updateInput(name: keyof typeof inputs, value: string) {
    setInputs((current) => ({ ...current, [name]: Number(value) }));
  }

  return (
    <section id="poiseuille" className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-800">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            Live model
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Poiseuille&apos;s Law: Why Radius Matters
          </h2>
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
            Change the vessel and the driving conditions. The radius has an outsized effect because
            flow changes with the fourth power of radius.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setInputs(defaults)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-gray-700 dark:text-gray-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
        >
          Reset model
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <Control
            label="Vessel radius"
            value={inputs.radius}
            min={0.5}
            max={1.5}
            step={0.05}
            suffix="× baseline"
            description="The most powerful adjustable variable"
            onChange={(value) => updateInput("radius", value)}
          />
          <Control
            label="Pressure gradient"
            value={inputs.pressure}
            min={40}
            max={160}
            step={1}
            suffix="mmHg"
            description="The force driving blood through the vessel"
            onChange={(value) => updateInput("pressure", value)}
          />
          <Control
            label="Blood viscosity"
            value={inputs.viscosity}
            min={0.7}
            max={1.5}
            step={0.05}
            suffix="× baseline"
            description="Resistance from the fluid itself"
            onChange={(value) => updateInput("viscosity", value)}
          />
          <Control
            label="Vessel length"
            value={inputs.length}
            min={0.5}
            max={2}
            step={0.05}
            suffix="× baseline"
            description="Longer vessels create more resistance"
            onChange={(value) => updateInput("length", value)}
          />
          <p className="border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-400">
            Values are normalized to a baseline vessel. This keeps the relationship visible without
            implying that a single vessel represents whole-body blood flow.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Relative flow" value={`${flow.toFixed(1)} L/min`} accent />
            <Metric label="Relative resistance" value={`${resistance.toFixed(2)}×`} />
            <Metric label="Radius effect" value={`${radiusChange.toFixed(2)}×`} />
            <Metric label="Flow vs baseline" value={`${flowChange.toFixed(1)}×`} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-950">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Vessel cross-section</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Relative radius, shown at scale</p>
              </div>
              <span className="font-mono text-sm font-bold text-teal-700 dark:text-teal-300">
                r = {inputs.radius.toFixed(2)}×
              </span>
            </div>
            <div className="flex h-40 items-center justify-center overflow-hidden rounded-md bg-slate-900 px-8 dark:bg-slate-950">
              <div
                className="w-full rounded-full border-4 border-teal-300 bg-teal-400/30 shadow-[0_0_30px_rgba(45,212,191,0.35)] transition-[height] duration-150"
                style={{ height: `${Math.max(12, inputs.radius * 100)}px` }}
              >
                <div className="flex h-full items-center justify-center gap-2 overflow-hidden px-3">
                  {[0, 1, 2, 3, 4].map((cell) => (
                    <span key={cell} className="h-3 w-5 shrink-0 rounded-full bg-rose-400/80" />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Resistance rises as radius narrows</span>
              <span>Flow follows r⁴</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Metric
              label="Pressure to preserve 5 L/min"
              value={`${pressureForBaselineFlow.toFixed(0)} mmHg`}
            />
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-950 dark:bg-teal-950/30">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-800 dark:text-teal-200">Read the change</p>
              <p className="mt-2 text-sm leading-relaxed text-teal-950 dark:text-teal-100">
                {inputs.radius < 0.9
                  ? "A modest narrowing creates a large resistance increase because radius is raised to the fourth power."
                  : inputs.radius > 1.1
                    ? "A modest dilation sharply lowers resistance and can redirect flow toward this vascular bed."
                    : inputs.viscosity > 1.15
                      ? "Thicker blood raises resistance directly, but its effect is linear rather than fourth-power."
                      : "Radius is near baseline. Move it slightly and watch resistance change faster than the vessel drawing."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-md border-l-4 border-teal-600 bg-teal-50 px-5 py-4 text-sm leading-relaxed text-teal-950 dark:bg-teal-950/30 dark:text-teal-100">
        <strong>Poiseuille&apos;s Law:</strong> flow is proportional to pressure gradient and radius⁴,
        and inversely proportional to viscosity and vessel length.
      </div>
      <p className="mt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        Teaching model, not a clinical calculator. Real vascular networks include branching vessels,
        pulsatile flow, elastic walls, and active regulation that this idealized model does not represent.
      </p>
    </section>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  suffix,
  description,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  description: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
        <span className="font-mono text-sm text-teal-700 dark:text-teal-300">
          {value.toFixed(step < 1 ? 2 : 0)} {suffix}
        </span>
      </span>
      <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{description}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 w-full accent-teal-600"
      />
    </label>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ? "border-teal-300 bg-teal-50 dark:border-teal-900 dark:bg-teal-950/40" : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"}`}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`mt-2 text-lg font-bold ${accent ? "text-teal-700 dark:text-teal-300" : "text-gray-900 dark:text-white"}`}>{value}</p>
    </div>
  );
}
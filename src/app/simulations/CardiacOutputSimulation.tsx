"use client";

import { useState } from "react";

const defaults = {
  preload: 100,
  afterload: 100,
  contractility: 100,
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export default function CardiacOutputSimulation() {
  const [inputs, setInputs] = useState(defaults);

  const endDiastolicVolume = 80 + inputs.preload * 0.8;
  const endSystolicVolume = clamp(
    55 + (inputs.afterload - 100) * 0.25 - (inputs.contractility - 100) * 0.2,
    20,
    110,
  );
  const strokeVolume = endDiastolicVolume - endSystolicVolume;
  const ejectionFraction = (strokeVolume / endDiastolicVolume) * 100;
  const cardiacOutput = (strokeVolume * 70) / 1000;
  const meanArterialPressure = 80 + (inputs.afterload - 100) * 0.3 + (cardiacOutput - 5) * 3;
  const oxygenDelivery = cardiacOutput * 200;

  function updateInput(name: keyof typeof inputs, value: string) {
    setInputs((current) => ({ ...current, [name]: Number(value) }));
  }

  return (
    <section id="cardiac-output" className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
            Live model
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Cardiac Output &amp; Frank-Starling
          </h2>
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
            Change one ventricular condition and watch the pump respond. Start with preload,
            then compare what happens when the ventricle faces more afterload or contracts more strongly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setInputs(defaults)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-rose-500 hover:text-rose-700 dark:border-gray-700 dark:text-gray-200 dark:hover:border-rose-400 dark:hover:text-rose-300"
        >
          Reset model
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <Control
            label="Preload"
            value={inputs.preload}
            min={40}
            max={160}
            description="Venous return / end-diastolic filling"
            onChange={(value) => updateInput("preload", value)}
          />
          <Control
            label="Afterload"
            value={inputs.afterload}
            min={50}
            max={160}
            description="The pressure the ventricle ejects against"
            onChange={(value) => updateInput("afterload", value)}
          />
          <Control
            label="Contractility"
            value={inputs.contractility}
            min={50}
            max={160}
            description="Force generated at a given fiber length"
            onChange={(value) => updateInput("contractility", value)}
          />
          <p className="border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-400">
            Each control is relative to a baseline of 100%. Heart rate is held at 70 beats/min so
            the effect of ventricular mechanics stays visible.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Stroke volume" value={`${strokeVolume.toFixed(0)} mL`} />
            <Metric label="Cardiac output" value={`${cardiacOutput.toFixed(1)} L/min`} accent />
            <Metric label="Ejection fraction" value={`${ejectionFraction.toFixed(0)}%`} />
            <Metric label="MAP" value={`${meanArterialPressure.toFixed(0)} mmHg`} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-950">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">One-beat volume loop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Simplified ventricular volumes</p>
              </div>
              <span className="text-sm font-bold text-rose-700 dark:text-rose-300">70 bpm</span>
            </div>
            <div className="flex h-40 items-end gap-2 border-b border-l border-gray-300 px-3 pb-0 dark:border-gray-700">
              {[endSystolicVolume, endDiastolicVolume, endDiastolicVolume, endSystolicVolume].map(
                (volume, index) => (
                  <div key={`${volume}-${index}`} className="flex h-full flex-1 items-end">
                    <div
                      className={`w-full rounded-t-sm ${index === 1 || index === 2 ? "bg-rose-600" : "bg-rose-300 dark:bg-rose-800"}`}
                      style={{ height: `${clamp((volume / 220) * 100, 8, 100)}%` }}
                    />
                  </div>
                ),
              )}
            </div>
            <div className="mt-2 grid grid-cols-4 text-center text-[11px] text-gray-500 dark:text-gray-400">
              <span>eject</span>
              <span>fill</span>
              <span>filled</span>
              <span>eject</span>
            </div>
            <div className="mt-5 flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <span>ESV {endSystolicVolume.toFixed(0)} mL</span>
              <span>EDV {endDiastolicVolume.toFixed(0)} mL</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Estimated oxygen delivery" value={`${oxygenDelivery.toFixed(0)} mL/min`} />
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-950 dark:bg-rose-950/30">
              <p className="text-xs font-bold uppercase tracking-wide text-rose-800 dark:text-rose-200">Read the change</p>
              <p className="mt-2 text-sm leading-relaxed text-rose-950 dark:text-rose-100">
                {inputs.preload >= 120
                  ? "More filling gives the ventricle more volume to eject."
                  : inputs.afterload >= 125
                    ? "A higher ejection pressure leaves more blood behind after systole."
                    : inputs.contractility >= 125
                      ? "Stronger contraction lowers end-systolic volume and raises stroke volume."
                      : "Move a control to see which part of the beat changes first."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        Teaching model, not a clinical calculator. The relationships are intentionally simplified
        to make the mechanics visible: cardiac output = stroke volume × heart rate.
      </p>
    </section>
  );
}

function Control({
  label,
  value,
  min,
  max,
  description,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  description: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
        <span className="font-mono text-sm text-rose-700 dark:text-rose-300">{value}%</span>
      </span>
      <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{description}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 w-full accent-rose-600"
      />
    </label>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ? "border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40" : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"}`}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`mt-2 text-lg font-bold ${accent ? "text-rose-700 dark:text-rose-300" : "text-gray-900 dark:text-white"}`}>{value}</p>
    </div>
  );
}
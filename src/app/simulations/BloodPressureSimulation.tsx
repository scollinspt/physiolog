"use client";

import { useState } from "react";

type Inputs = {
  heartRate: number;
  strokeVolume: number;
  resistance: number;
  compliance: number;
};

const resting: Inputs = {
  heartRate: 70,
  strokeVolume: 70,
  resistance: 1,
  compliance: 1,
};

const exercise: Inputs = {
  heartRate: 120,
  strokeVolume: 95,
  resistance: 0.25,
  compliance: 1,
};

const baselinePressure = 40;
const baselineTimeConstant = 1.4;
const systolicDuration = 0.3;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function calculatePressures(inputs: Inputs) {
  const cycleLength = 60 / inputs.heartRate;
  const diastolicDuration = Math.max(cycleLength - systolicDuration, 0.12);
  const timeConstant = baselineTimeConstant * inputs.resistance * inputs.compliance;
  const runoff = Math.exp(-diastolicDuration / timeConstant);
  const pulsePressure = baselinePressure * (inputs.strokeVolume / 70) / inputs.compliance;
  const diastolicPressure = (pulsePressure * runoff) / (1 - runoff);
  const systolicPressure = diastolicPressure + pulsePressure;
  const meanPressure = diastolicPressure + pulsePressure / 3;
  const cardiacOutput = (inputs.heartRate * inputs.strokeVolume) / 1000;

  return {
    cycleLength,
    diastolicDuration,
    runoff,
    pulsePressure,
    diastolicPressure,
    systolicPressure,
    meanPressure,
    cardiacOutput,
    pressureDrop: systolicPressure - diastolicPressure,
  };
}

export default function BloodPressureSimulation() {
  const [inputs, setInputs] = useState(resting);
  const pressures = calculatePressures(inputs);

  function updateInput(name: keyof Inputs, value: string) {
    setInputs((current) => ({ ...current, [name]: Number(value) }));
  }

  function loadPreset(preset: Inputs) {
    setInputs(preset);
  }

  return (
    <section id="blood-pressure" className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            Live model
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Blood Pressure Equation Explorer
          </h2>
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
            Follow one pressure wave between heartbeats. During diastole, pressure runs off through
            the resistance network. During systole, stroke volume adds a new pressure pulse.
          </p>
        </div>
        <button
          type="button"
          onClick={() => loadPreset(resting)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-amber-600 hover:text-amber-700 dark:border-gray-700 dark:text-gray-200 dark:hover:border-amber-400 dark:hover:text-amber-300"
        >
          Reset model
        </button>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-950 dark:bg-amber-950/30">
        <span className="text-sm font-semibold text-amber-950 dark:text-amber-100">Try a comparison:</span>
        <button
          type="button"
          onClick={() => loadPreset(resting)}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-amber-800 shadow-sm ring-1 ring-amber-200 hover:bg-amber-100 dark:bg-gray-900 dark:text-amber-200 dark:ring-amber-900 dark:hover:bg-amber-950"
        >
          Resting
        </button>
        <button
          type="button"
          onClick={() => loadPreset(exercise)}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-amber-800 shadow-sm ring-1 ring-amber-200 hover:bg-amber-100 dark:bg-gray-900 dark:text-amber-200 dark:ring-amber-900 dark:hover:bg-amber-950"
        >
          Exercise
        </button>
        <span className="text-xs text-amber-800 dark:text-amber-200">
          Compare higher HR and SV with lower TPR.
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <Control
            label="Heart rate"
            value={inputs.heartRate}
            min={40}
            max={160}
            step={1}
            suffix="bpm"
            description="More beats means less time for diastolic runoff"
            onChange={(value) => updateInput("heartRate", value)}
          />
          <Control
            label="Stroke volume"
            value={inputs.strokeVolume}
            min={40}
            max={130}
            step={1}
            suffix="mL"
            description="The volume added to the arterial pulse each beat"
            onChange={(value) => updateInput("strokeVolume", value)}
          />
          <Control
            label="Total peripheral resistance"
            value={inputs.resistance}
            min={0.2}
            max={1.8}
            step={0.05}
            suffix="× baseline"
            description="Higher resistance slows pressure runoff"
            onChange={(value) => updateInput("resistance", value)}
          />
          <Control
            label="Arterial compliance"
            value={inputs.compliance}
            min={0.6}
            max={1.6}
            step={0.05}
            suffix="× baseline"
            description="How much pressure changes for a given volume"
            onChange={(value) => updateInput("compliance", value)}
          />
          <p className="border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-400">
            The equation is normalized to a resting pressure wave near 120/80 mmHg. The model uses
            arterial resistance and compliance to determine runoff between beats.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Blood pressure" value={`${pressures.systolicPressure.toFixed(0)}/${pressures.diastolicPressure.toFixed(0)}`} accent />
            <Metric label="Pulse pressure" value={`${pressures.pulsePressure.toFixed(0)} mmHg`} />
            <Metric label="Mean pressure" value={`${pressures.meanPressure.toFixed(0)} mmHg`} />
            <Metric label="Cardiac output" value={`${pressures.cardiacOutput.toFixed(1)} L/min`} />
          </div>

          <Waveform pressures={pressures} />

          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Diastolic runoff" value={`${(pressures.pressureDrop).toFixed(0)} mmHg`} />
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-950 dark:bg-amber-950/30">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200">Read the change</p>
              <p className="mt-2 text-sm leading-relaxed text-amber-950 dark:text-amber-100">
                {inputs.heartRate >= 105 && inputs.resistance < 0.85
                  ? "The faster rate shortens runoff time, while lower TPR speeds runoff. Here those effects partly offset, so pulse pressure carries the main rise."
                  : inputs.resistance >= 1.25
                    ? "Higher TPR slows diastolic runoff, sustaining diastolic pressure between beats."
                    : inputs.strokeVolume >= 90
                      ? "More stroke volume makes the systolic pressure jump larger, widening pulse pressure."
                      : "Adjust HR, stroke volume, or TPR to see whether runoff or the systolic pulse dominates."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <FormulaCard
          title="During diastole"
          formula="Pressure runs off through TPR"
          explanation="Higher resistance leaves more pressure in the arteries before the next beat. Lower resistance lets pressure fall faster."
        />
        <FormulaCard
          title="During systole"
          formula="SBP = DBP + pulse pressure"
          explanation="The next stroke volume creates the pressure jump. A larger stroke volume generally widens pulse pressure."
        />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        Teaching model, not a clinical calculator. Real arterial pressure depends on distributed vascular
        beds, wave reflections, contractility, and changing vessel properties that are simplified here.
      </p>
    </section>
  );
}

function Waveform({ pressures }: { pressures: ReturnType<typeof calculatePressures> }) {
  const waveform = Array.from({ length: 28 }, (_, index) => {
    const phase = index / 27;
    const pressure = phase < 0.16
      ? pressures.diastolicPressure + (pressures.pulsePressure * phase) / 0.16
      : pressures.systolicPressure - pressures.pulsePressure * ((phase - 0.16) / 0.84) * (1 - pressures.runoff);
    return clamp(pressure, 0, 200);
  });

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-950">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">One cardiac cycle</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Pressure rises with ejection, then runs off during diastole</p>
        </div>
        <span className="text-sm font-bold text-amber-700 dark:text-amber-300">{pressures.cycleLength.toFixed(2)} s</span>
      </div>
      <div className="flex h-44 items-end gap-1 border-b border-l border-gray-300 px-3 dark:border-gray-700">
        {waveform.map((pressure, index) => (
          <div key={index} className="flex h-full flex-1 items-end">
            <div
              className={`w-full rounded-t-sm ${index < 5 ? "bg-amber-600" : "bg-amber-300 dark:bg-amber-800"}`}
              style={{ height: `${Math.max(8, (pressure / 180) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-gray-500 dark:text-gray-400">
        <span>systole: pressure jump</span>
        <span>diastole: runoff</span>
      </div>
    </div>
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
        <span className="font-mono text-sm text-amber-700 dark:text-amber-300">
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
        className="mt-4 w-full accent-amber-600"
      />
    </label>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ? "border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40" : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"}`}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`mt-2 text-lg font-bold ${accent ? "text-amber-700 dark:text-amber-300" : "text-gray-900 dark:text-white"}`}>{value}</p>
    </div>
  );
}

function FormulaCard({ title, formula, explanation }: { title: string; formula: string; explanation: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">{title}</p>
      <p className="mt-2 font-semibold text-gray-900 dark:text-white">{formula}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{explanation}</p>
    </div>
  );
}
# Simulation TODO

Working backlog for interactive physiology simulations. Each simulation should
have its own route, explanation, textbook links, controls, and scenario presets.
The models are teaching tools, not clinical calculators. Prefer visible causal
relationships over adding many controls.

## Current Work

### Blood Pressure Equation Explorer

The current simulation is a useful first pass, but the pressure-wave graphic
needs a physiology-focused revision. Do not fix this as part of the backlog
setup; keep the issue parked here for the next simulation pass.

- [ ] Rework the default resting and exercise pressure waves so diastolic runoff
      reaches the actual DBP level before the next systolic event.
- [ ] Ensure each new cardiac cycle begins at the previous cycle's DBP rather
      than starting from an artificially elevated pressure.
- [ ] Replace the current bar-style graphic with a waveform whose shape more
      closely resembles a normal arterial pressure waveform: rapid systolic
      upstroke, systolic peak, brief transition, and gradual diastolic decay.
- [ ] Make the runoff slope respond visibly and consistently to TPR, heart rate,
      and arterial compliance.
- [ ] Check the model's definitions and labels for DBP, SBP, pulse pressure,
      runoff, and mean arterial pressure while revising the graphic.
- [ ] Preserve the teaching point: stroke volume primarily widens pulse
      pressure, while TPR and the time between beats influence diastolic
      pressure.
- [ ] Recheck the resting and exercise presets against the intended comparison:
      higher HR and SV during exercise, lower TPR, higher PP, and DBP that does
      not rise simply because HR is higher.

## Physiome model families for the current simulation backlog

This section identifies the closest public model families in the Physiome repository
and is intended as a reference layer for the teaching simulations below. The goal is
not to copy the full research model into the site, but to anchor each interactive
teaching model in an established physiology model family and then simplify it for
student-friendly use.

### Best first candidates for the site

These are the highest-value starting points because they match the current backlog and
have strong public model analogues in the Physiome repository.

| Priority | Simulation from this backlog | Closest Physiome model family | Why this is a good fit | Example model link |
|---|---|---|---|---|
| 1 | Blood Pressure Equation Explorer | Cardiovascular circulation / haemodynamic lumped-parameter models | Strong match for arterial pressure, compliance, TPR, and heart-rate-dependent waveform behavior. | [Smith et al. 2004 minimal haemodynamic model](https://models.physiomeproject.org/exposure/9d046663ba5cac5c8a61ac146183614b/smith_chase_nokes_shaw_wake_2004.cellml/view) |
| 2 | Orthostatic baroreflex | Cardiovascular circulation + autonomic control models | Good conceptual anchor for venous pooling, baroreceptor compensation, and pressure recovery. | [Heldt et al. 2002 cardiovascular response to orthostatic stress](https://models.physiomeproject.org/exposure/ff8be5f140e68612284488cf9879eb5f/lpc.cellml/view) |
| 3 | Cardiac Pump pressure-volume loop | Cardiac electromechanical and ventricular mechanics models | Directly relevant to preload, afterload, stroke volume, and pressure-volume loop behavior. | [Hunter, McCulloch, ter Keurs 1998 modelling the mechanical properties of cardiac muscle](https://models.physiomeproject.org/exposure/81b442d5d866cde17186144e0d848021/hunter_mcculloch_terkeurs_1998.cellml/view) |
| 4 | Tension length-tension relationship | Myofilament mechanics and muscle mechanics models | Good fit for active tension, passive tension, and overlap-dependent force behavior. | [Campbell & Chandra 2006 functions of stretch activation in heart muscle](https://models.physiomeproject.org/exposure/62183706711e435ff002b46088540850/campbell_chandra_2006.cellml/view) |
| 5 | Cardiac cycle pressure sequence | Cardiac electromechanical models | Useful for connecting ECG, valve events, and ventricular/arterial pressure sequence. | [Nash & Panfilov 2004 electromechanical model of excitable tissue](https://models.physiomeproject.org/exposure/d96a64b94d824692955e06ec878a2d09/nash_panfilov_2004.cellml/view) |

### Additional Physiome references by chapter

| Chapter / simulation theme | Closest Physiome family | Suggested model(s) |
|---|---|---|
| Circulation / blood pressure / hemodynamics | Cardiovascular circulation | [Guyton full cardiovascular circulation model](https://models.physiomeproject.org/exposure/cd10322c000e6ff64441464f8773ed83/Guyton_Model_1-0.cellml/view), [Smith et al. 2004](https://models.physiomeproject.org/exposure/9d046663ba5cac5c8a61ac146183614b/smith_chase_nokes_shaw_wake_2004.cellml/view) |
| Orthostatic stress and autonomic compensation | Cardiovascular circulation | [Heldt et al. 2002](https://models.physiomeproject.org/exposure/ff8be5f140e68612284488cf9879eb5f/lpc.cellml/view), [Guyton autonomics module](https://models.physiomeproject.org/exposure/827af05888f8e152f448d9cd8c6a8d09/guyton_autonomics_2008.cellml/view) |
| Cardiac pump and pressure-volume behavior | Cardiac electromechanics / ventricular mechanics | [Hunter et al. 1998](https://models.physiomeproject.org/exposure/81b442d5d866cde17186144e0d848021/hunter_mcculloch_terkeurs_1998.cellml/view), [Nash & Panfilov 2004](https://models.physiomeproject.org/exposure/d96a64b94d824692955e06ec878a2d09/nash_panfilov_2004.cellml/view) |
| Action potential / rhythm / AP sequence | Electrophysiology | [Luo & Rudy 1991 ventricular action potential model](https://models.physiomeproject.org/exposure/2d2ce7737b42a4f72d6bf8b67f6eb5a2/luo_rudy_1991.cellml/view), [Grandi et al. 2009 human ventricle model](https://models.physiomeproject.org/e/96/grandi_pasqualini_bers_2010.cellml/view) |
| Muscle tension and sarcomere mechanics | Myofilament mechanics | [Campbell & Chandra 2006](https://models.physiomeproject.org/exposure/62183706711e435ff002b46088540850/campbell_chandra_2006.cellml/view), [Hunter et al. 1998](https://models.physiomeproject.org/exposure/81b442d5d866cde17186144e0d848021/hunter_mcculloch_terkeurs_1998.cellml/view) |
| Motor unit recruitment / twitch summation | Neurobiology / electrophysiology | [Morris & Lecar 1981](https://models.physiomeproject.org/e/3c/morris_1981_reduced.cellml/view) for a simple excitability model; this is a useful educational reference rather than a direct motor-unit model |
| Ventilation control / respiratory rhythm | Electrophysiology / respiratory rhythm models | [Butera, Rinzel, Smith 1999](https://models.physiomeproject.org/e/427/butera_rinzel_smith_1999.cellml/view) is a relevant respiratory rhythm-generation reference, but there is not a single obvious unified ventilation model in the curated Physiome categories |
| Renal clearance | Cardiovascular circulation / kidney modules | [Guyton kidney module](https://models.physiomeproject.org/exposure/b897ad1b96031d40293b2e2e10684ffe/guyton_kidney_2008.cellml/view) is the best nearby model family, but the site should still favor a simplified teaching tool over a full renal physiology model |

### Recommended build order using Physiome as the reference layer

1. Blood Pressure Equation Explorer — use the haemodynamic models as the conceptual anchor.
2. Orthostatic Baroreflex — use the orthostatic stress and autonomic circulation models.
3. Cardiac Pump pressure-volume loop — use the ventricular mechanics/electromechanical models.
4. Tension length-tension relationship — use myofilament mechanics as the reference model.
5. Cardiac cycle pressure sequence / ECG rhythm analysis — use electrophysiology cell models and electromechanical ventricular models.
6. Ventilation and renal simulations — use textbook equations first unless a stronger Physiome model is identified later.

### Practical design guidance

- Use Physiome models as a reference for physiological structure and parameter realism.
- Reduce the model to a teaching model with only the variables that matter to the learning goal.
- Keep the public-source model citations visible in the simulation page metadata where helpful.
- Prefer a small set of causal variables over a large high-fidelity parameter set.
- For the early site rollout, start with cardiovascular and muscle models; they are the most directly supported by the Physiome repository and best align with the current backlog.

## Chapter-by-Chapter Ideas

### Chapter 1: Introduction

- [ ] **Causal model explorer:** connect a change in muscle demand to changes in
      extracellular fluid, circulation, respiration, and renal support. Let the
      learner toggle one causal link and observe where the chain breaks.
- [ ] **Homeostasis feedback loop:** choose a regulated variable, disturbance,
      sensor, controller, and effector, then watch negative feedback restore the
      variable toward a set point.
- [ ] **Flow down gradients:** manipulate a pressure or concentration gradient
      and resistance, with a visual flow response.

### Chapter 2: Fundamentals

- [ ] **Muscle structure builder:** assemble muscle fiber, fascicle, muscle, and
      connective-tissue layers, with each layer's mechanical role highlighted.
- [ ] **Muscle tension overview:** compare active tension, passive tension, and
      total tension as muscle length changes.
- [ ] **Pennation and force transmission:** change pennation angle and fiber
      length to see the tradeoff between force and excursion.

### Chapter 3: Tension

- [ ] **Length-tension relationship:** move sarcomere length through the overlap
      range and plot active, passive, and total tension.
- [ ] **Force-velocity relationship:** change load and contraction mode to show
      concentric, isometric, and eccentric behavior.
- [ ] **Sliding filament model:** animate actin-myosin overlap as sarcomere
      length changes.

### Chapter 4: Excitation

- [ ] **Action potential explorer:** move sodium and potassium conductances
      through resting potential, threshold, depolarization, repolarization, and
      refractory periods.
- [ ] **Neuromuscular junction:** follow motor neuron excitation through the end
      plate, excitation-activation coupling, and calcium release.
- [ ] **Membrane gradients:** alter extracellular sodium or potassium and observe
      the effect on resting membrane potential and action-potential behavior.

### Chapter 5: Regulation

- [ ] **Motor-unit recruitment:** increase force demand and show orderly
      recruitment from low-threshold to high-threshold motor units.
- [ ] **Twitch summation and tetany:** vary stimulation frequency and display
      individual twitches, summation, and fused tetanus.
- [ ] **Proprioceptive feedback:** combine muscle spindle and Golgi tendon organ
      inputs in a stretch/load feedback loop.

### Chapter 6: Energetics

- [ ] **ATP regeneration timeline:** compare phosphocreatine, glycolytic, and
      oxidative pathways by rate, capacity, and duration.
- [ ] **Exercise energy contribution:** set exercise intensity and duration to
      show the changing contribution of each ATP pathway.
- [ ] **Fatigue model:** vary demand, substrate availability, and metabolite
      accumulation to explore why force and power decline.
- [ ] **Fiber-type comparison:** compare motor-unit/fiber types by force,
      velocity, fatigue resistance, and metabolic strategy.

### Chapter 7: Micro-Circulation

- [ ] **Starling filtration model:** adjust capillary hydrostatic pressure,
      plasma oncotic pressure, and permeability to show filtration and
      reabsorption.
- [ ] **Edema formation:** create venous obstruction, low plasma protein, or
      increased permeability and track extracellular fluid accumulation.
- [ ] **Oxygen diffusion:** change diffusion distance, gradient, and tissue
      demand to show delivery from capillary to muscle fiber.
- [ ] **Smooth-muscle microvascular control:** connect local metabolic signals to
      arteriole radius and regional flow.

### Chapter 8: Renal Clearance

- [ ] **Clearance and GFR explorer:** change plasma concentration, renal plasma
      flow, filtration, reabsorption, and secretion to calculate excretion.
- [ ] **Mass-balance kidney model:** follow water, sodium, potassium, calcium,
      and acid-base inputs through filtration, reabsorption, secretion, and
      excretion.
- [ ] **Volume and osmolarity disturbances:** compare diarrhea, sweating,
      adrenal insufficiency, saline infusion, high sodium intake, and SIADH.
- [ ] **Renal response over time:** show how changes in renal handling alter
      blood volume and osmolarity over hours rather than seconds.

### Chapter 9: Circulation

- [x] **Poiseuille's Law: Why Radius Matters:** initial version implemented.
- [x] **Blood Pressure Equation Explorer:** initial version implemented; graphic
      revision is listed under Current Work.
- [ ] **Orthostatic baroreflex:** stand from supine and show venous pooling,
      reduced venous return, baroreceptor response, sympathetic compensation,
      and pressure recovery.
- [ ] **Vasovagal syncope scenario:** trigger widespread vasodilation and show
      falling TPR, blood pressure, cerebral perfusion, and recovery after lying
      down.
- [ ] **Cardiac output distribution:** compare total cardiac output with the
      changing fraction delivered to active skeletal muscle, kidney, gut, skin,
      and brain.
- [ ] **Blood pressure measurement:** model cuff pressure and Korotkoff sounds,
      including systolic and diastolic detection.

### Chapter 10: Cardiac Pump

- [ ] **Pressure-volume loop:** connect preload, afterload, contractility, EDV,
      ESV, stroke volume, and ejection fraction in a true ventricular loop.
- [ ] **Cardiac cycle pressure sequence:** animate atrial pressure, ventricular
      pressure, aortic pressure, valve opening, and valve closure.
- [ ] **ECG rhythm analyzer:** generate normal sinus rhythm and selected rhythm
      disturbances, then connect ECG intervals to mechanical events.
- [ ] **Coronary perfusion:** show why left ventricular coronary flow changes
      during systole and diastole, and how pressure or heart rate alters supply.

### Chapter 11: Respiration

- [ ] **Oxygen diffusion and transport:** move partial-pressure gradients and
      diffusion conditions from alveolus to blood to tissue.
- [ ] **Oxygen-hemoglobin dissociation:** shift the curve with temperature, pH,
      CO2, and exercise-related conditions.
- [ ] **CO2 transport and RER:** change substrate use and metabolic rate to show
      CO2 production, transport, and respiratory exchange ratio.
- [ ] **Acid-base map:** place arterial blood gas values on a map and identify
      respiratory and metabolic disturbances with compensation.

### Chapter 12: Ventilation

- [ ] **Ventilation volumes and capacities:** combine tidal volume, respiratory
      rate, dead space, vital capacity, and functional residual capacity.
- [ ] **Dead-space ventilation:** compare minute ventilation with alveolar
      ventilation as dead space changes.
- [ ] **Ventilatory pump mechanics:** show thoracic volume, pleural pressure,
      alveolar pressure, and airflow during inspiration and expiration.
- [ ] **Lung compliance and work of breathing:** compare stiff and compliant
      lungs and display the pressure-volume relationship.
- [ ] **Ventilation-perfusion matching:** explore dead space, shunt, and A-a
      gradient across different regions of the lung.
- [ ] **Ventilatory control:** change CO2, O2, metabolic demand, and voluntary
      control to show the resulting ventilation response.

## Suggested Build Order

1. Revise the Blood Pressure Equation Explorer waveform.
2. Build the Orthostatic Baroreflex from the circulation model.
3. Build the Cardiac Pump pressure-volume loop.
4. Build the Tension length-tension relationship.
5. Build the Ventilation volumes/dead-space model.
6. Build the Micro-Circulation Starling filtration and edema model.
7. Add the remaining chapter simulations as the underlying models mature.

## Shared Design Requirements

- [ ] Keep each simulation on its own route under `/simulations/`.
- [ ] Link every simulation to one or more relevant textbook chapters.
- [ ] Include a baseline state and named scenario presets where comparison is
      part of the learning goal.
- [ ] Show the governing relationship in plain language and, when useful, the
      equation itself.
- [ ] Distinguish normalized teaching models from clinical measurements.
- [ ] Keep controls limited to variables that have a clear physiological role.
- [ ] Test every model at baseline, at both control extremes, and on a mobile
      viewport before deployment.
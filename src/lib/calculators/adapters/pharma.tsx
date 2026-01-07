import React from "react";
import { CalculationResult } from "@/components/calculators/CalculatorModal";
import antibiotics from "@/data/antibiotics.json";

// Types reflecting JSON (kept minimal)
type AntibioticDef = {
  id: string;
  name: string;
  vialStrengthMg: number;
  defaultReconstitutionMl: number;
  cautionMaxStockConcMgPerMl: number;
  recommendedInfusion?: { volumeMl: number; timeMin: number; note?: string };
};

const OK: CalculationResult["severity"] = "green";
const WARN: CalculationResult["severity"] = "yellow";

export function computeDoseByWeight(values: Record<string, unknown>, mode: "weight" | "bsa"): CalculationResult {
  const unit = String(values.unit || (mode === "weight" ? "mg/kg" : "mg/m²"));
  const per = Number(values.dosePer);
  const freq = (values.frequency ?? "") as string;
  const drug = (values.drug ?? "") as string;

  const base = mode === "weight" ? Number(values.weight) : Number(values.bsa);
  if (!per || !base) {
    return { value: NaN, interpretation: "Ingrese parámetros válidos", severity: WARN };
  }

  const total = per * base; // per could be mg/kg or µg/kg etc.
  const outUnit: "mg" | "µg" = unit.startsWith("mg") ? "mg" : "µg";

  // Reasonableness check
  const totalMg = outUnit === "mg" ? total : total / 1000;
  let warn: string | undefined;
  if (totalMg > 10000) warn = "Atención: dosis total supera 10,000 mg; verifique parámetros y unidades.";

  const who = mode === "weight" ? `${base} kg` : `${base} m²`;
  const text = `Para un paciente de ${who}, la dosis total de ${drug || "el fármaco"} (${per} ${unit}) es de ${total.toFixed(2)} ${outUnit}${freq ? ` ${freq}` : ""}.`;

  const details = (
    <div className="space-y-2 text-sm">
      <div>Modo: {mode === "weight" ? "por peso (kg)" : "por SC (m²)"}</div>
      {warn && <div className="text-amber-700">{warn}</div>}
    </div>
  );

  return { value: Number(total.toFixed(2)), unit: outUnit, interpretation: text, detailsHtml: details, severity: warn ? WARN : OK };
}

export function computeReconstitution(values: Record<string, unknown>): CalculationResult {
  const abId = String(values.abId || "");
  const ab = (antibiotics as AntibioticDef[]).find(a => a.id === abId) || (antibiotics as AntibioticDef[])[0];

  const reconstMl = Number(values.reconstMl) || ab?.defaultReconstitutionMl || 0;
  const desiredConc = Number(values.desiredConc) || 0; // mg/mL
  const dose = Number(values.dose) || 0;
  const doseUnit = String(values.doseUnit || "mg");
  const finalVolume = Number(values.finalVolume) || 0;
  const addDiluent = !!values.addDiluent;
  const weight = Number(values.weight) || 0;

  const doseMg = doseUnit === "g" ? dose * 1000 : dose;
  const stockConc = reconstMl > 0 ? (ab?.vialStrengthMg ?? 0) / reconstMl : 0; // mg/mL
  const volForDose = stockConc > 0 ? doseMg / stockConc : 0; // mL to withdraw

  // Planned final volume
  let finalVol = 0;
  if (addDiluent && finalVolume > 0) finalVol = finalVolume;
  else if (desiredConc > 0) finalVol = doseMg / desiredConc;
  else finalVol = ab?.recommendedInfusion?.volumeMl ?? Math.max(50, volForDose);

  const addDiluentMl = Math.max(0, finalVol - volForDose);
  const finalConc = finalVol > 0 ? doseMg / finalVol : 0;

  const msgs: string[] = [];
  if (stockConc && ab && stockConc > ab.cautionMaxStockConcMgPerMl) {
    msgs.push(`Advertencia: concentración tras reconstitución (${stockConc.toFixed(1)} mg/mL) supera el límite recomendado (${ab.cautionMaxStockConcMgPerMl} mg/mL).`);
  }
  if (finalVol > 0 && finalVol < 10) {
    msgs.push("Precaución: volumen final de administración muy bajo para infusión IV.");
  }
  if (finalConc > (ab?.cautionMaxStockConcMgPerMl ?? 100)) {
    msgs.push("Precaución: concentración final elevada; verifique compatibilidad y vía de administración.");
  }

  const perKgText = weight > 0 ? ` (~${(doseMg / weight).toFixed(1)} mg/kg)` : "";
  const recommendation = ab?.recommendedInfusion
    ? `Sugerencia: administrar en ~${ab.recommendedInfusion.volumeMl} mL en ${ab.recommendedInfusion.timeMin} min. ${ab.recommendedInfusion.note ?? ""}`
    : "Sugerencia: diluir en volumen adecuado y administrar según protocolo local.";

  const interpretation = `Con una reconstitución a ${reconstMl} mL, la concentración del vial es ${stockConc.toFixed(1)} mg/mL. Para una dosis de ${doseMg.toFixed(0)} mg${perKgText}, extraiga ${volForDose.toFixed(1)} mL y diluya hasta ${finalVol.toFixed(0)} mL (añadir ${addDiluentMl.toFixed(0)} mL). Concentración final: ${finalConc.toFixed(1)} mg/mL.`;

  const details = (
    <div className="text-sm space-y-2">
      <div className="font-medium">Antibiótico: {ab?.name}</div>
      <ul className="list-disc pl-5 space-y-1">
        <li>Concentración tras reconstitución: {stockConc > 0 ? `${stockConc.toFixed(1)} mg/mL` : "—"}</li>
        <li>Volumen a extraer para la dosis: {volForDose > 0 ? `${volForDose.toFixed(1)} mL` : "—"}</li>
        <li>Volumen final de administración: {finalVol > 0 ? `${finalVol.toFixed(0)} mL` : "—"}</li>
        <li>{recommendation}</li>
      </ul>
      {msgs.length > 0 && (
        <div className="mt-2 space-y-1 text-amber-700">
          {msgs.map((m, i) => (<div key={i}>{m}</div>))}
        </div>
      )}
    </div>
  );

  const severity: CalculationResult["severity"] = msgs.length > 0 ? WARN : OK;
  return { value: Number(doseMg.toFixed(0)), unit: "mg", interpretation, detailsHtml: details, severity };
}

// Dosis de Carga y Mantenimiento
export function computeLoadingDose(values: Record<string, unknown>): CalculationResult {
  const weight = Number(values.weight);
  const vdPerKg = Number(values.vd);
  const cp = Number(values.cp);
  const F = Number(values.F);

  if (!Number.isFinite(weight) || !Number.isFinite(vdPerKg) || !Number.isFinite(cp) || !Number.isFinite(F) || F <= 0) {
    return { value: NaN, interpretation: "Ingrese parámetros válidos (peso, Vd, Cp y F)", severity: WARN };
  }
  const vdTotal = vdPerKg * weight; // L
  const dose = (cp * vdTotal) / F; // mg
  const interpretation = `Con Cp objetivo ${cp.toFixed(2)} mg/L, Vd ${vdPerKg.toFixed(2)} L/kg y peso ${weight.toFixed(1)} kg, la dosis de carga estimada es ${(dose).toFixed(1)} mg (F=${F}).`;
  return { value: Number(dose.toFixed(1)), unit: "mg", interpretation, severity: OK };
}

export function computeMaintenanceDose(values: Record<string, unknown>): CalculationResult {
  const cp = Number(values.cp);
  const F = Number(values.F);
  const tau = Number(values.tau);
  const cl = Number(values.cl); // L/h requerido

  if (!Number.isFinite(cp) || !Number.isFinite(F) || F <= 0 || !Number.isFinite(tau) || !Number.isFinite(cl)) {
    return { value: NaN, interpretation: "Ingrese Cp, Cl (L/h), F (>0) e intervalo (h)", severity: WARN };
  }
  const dose = (cp * cl * tau) / F; // mg
  const interpretation = `Con Cp objetivo ${cp.toFixed(2)} mg/L, Cl ${cl.toFixed(2)} L/h, intervalo ${tau.toFixed(1)} h y F=${F}, la dosis de mantenimiento es ${(dose).toFixed(1)} mg.`;
  return { value: Number(dose.toFixed(1)), unit: "mg", interpretation, severity: OK };
}

// Velocidad de infusión
export function computeInfusionRateByVolume(values: Record<string, unknown>): CalculationResult {
  const V = Number(values.volume);
  const T = Number(values.time);
  if (!Number.isFinite(V) || !Number.isFinite(T) || T <= 0) {
    return { value: NaN, interpretation: "Ingrese volumen (mL) y tiempo (h) válidos", severity: WARN };
  }
  const rate = V / T; // mL/h
  return { value: Number(rate.toFixed(2)), unit: "mL/h", interpretation: `Velocidad estándar: ${rate.toFixed(2)} mL/h para ${V} mL en ${T} h.`, severity: OK };
}

export function computeInfusionRateByDose(values: Record<string, unknown>): CalculationResult {
  const dose = Number(values.dose);
  const conc = Number(values.conc);
  const T = Number(values.time);
  const doseUnit = String(values.doseUnit || "mg"); // mg o µg
  const concUnit = String(values.concUnit || "mg/mL");
  if (!Number.isFinite(dose) || !Number.isFinite(conc) || !Number.isFinite(T) || conc <= 0 || T <= 0) {
    return { value: NaN, interpretation: "Ingrese dosis, concentración (>0) y tiempo (h)", severity: WARN };
  }
  // Convertir a mg y mg/mL si fuera necesario
  const doseMg = doseUnit.startsWith("µg") ? dose / 1000 : dose;
  const concMgPerMl = concUnit.startsWith("µg") ? conc / 1000 : conc;
  const volumeNeeded = doseMg / concMgPerMl; // mL
  const rate = volumeNeeded / T; // mL/h
  const interpretation = `Para ${dose} ${doseUnit} con ${conc} ${concUnit} en ${T} h: volumen ${volumeNeeded.toFixed(2)} mL → ${rate.toFixed(2)} mL/h.`;
  return { value: Number(rate.toFixed(2)), unit: "mL/h", interpretation, severity: OK };
}

export function computeDropsPerMin(values: Record<string, unknown>): CalculationResult {
  const V = Number(values.volume);
  const T = Number(values.time);
  const factor = Number(values.dropFactor) || 20; // gotas/mL
  if (!Number.isFinite(V) || !Number.isFinite(T) || T <= 0 || !Number.isFinite(factor) || factor <= 0) {
    return { value: NaN, interpretation: "Ingrese volumen, tiempo y factor de goteo válidos", severity: WARN };
  }
  const gpm = (V * factor) / (T * 60);
  return { value: Number(gpm.toFixed(1)), unit: "gotas/min", interpretation: `Con factor ${factor} gotas/mL: ${gpm.toFixed(1)} gotas/min.`, severity: OK };
}

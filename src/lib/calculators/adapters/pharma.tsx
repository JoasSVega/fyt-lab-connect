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

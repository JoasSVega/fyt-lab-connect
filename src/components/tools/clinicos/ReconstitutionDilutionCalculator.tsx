import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import antibiotics from "@/data/antibiotics.json";

// Types inferred from JSON shape
interface AntibioticDef {
  id: string;
  name: string;
  vialStrengthMg: number; // total drug amount per vial in mg
  defaultReconstitutionMl: number; // typical diluent volume used to reconstitute the vial
  cautionMaxStockConcMgPerMl: number; // warn if stock concentration exceeds this
  recommendedInfusion: { volumeMl: number; timeMin: number; note?: string };
}

const WARN = "#f59e0b";
const BAD = "#ef4444";
const OK = "#10b981";

type DoseUnit = "mg" | "g";

const ReconstitutionDilutionCalculator: React.FC<{ embedded?: boolean }> = ({ embedded = false }) => {
  const options = React.useMemo<AntibioticDef[]>(() => (antibiotics as AntibioticDef[]) ?? [], []);
  const [abId, setAbId] = React.useState<string>(options[0]?.id ?? "");
  const ab = React.useMemo(() => options.find(o => o.id === abId) ?? options[0], [options, abId]);

  // Inputs
  const [reconstMl, setReconstMl] = React.useState<number | "">(ab?.defaultReconstitutionMl ?? 10);
  const [desiredConc, setDesiredConc] = React.useState<number | "">(0); // mg/mL (optional)
  const [dose, setDose] = React.useState<number | "">(1000);
  const [doseUnit, setDoseUnit] = React.useState<DoseUnit>("mg");
  const [finalVolume, setFinalVolume] = React.useState<number | "">(0); // final admin volume (optional)
  const [addDiluent, setAddDiluent] = React.useState<boolean>(false);
  const [weight, setWeight] = React.useState<number | "">("");

  // Messages
  const [warnings, setWarnings] = React.useState<string[]>([]);

  // Reset defaults when antibiotic changes
  React.useEffect(() => {
    setReconstMl(ab?.defaultReconstitutionMl ?? 10);
    setWarnings([]);
  }, [ab]);

  // Derived calculations performed on each change
  const values = React.useMemo(() => {
    const msgs: string[] = [];
    const vStrength = ab?.vialStrengthMg ?? 0;

    const reconst = Number(reconstMl) > 0 ? Number(reconstMl) : 0;
    const stockConc = reconst > 0 ? vStrength / reconst : 0; // mg/mL

    if (stockConc && ab && stockConc > ab.cautionMaxStockConcMgPerMl) {
      msgs.push(`Advertencia: concentración tras reconstitución (${stockConc.toFixed(1)} mg/mL) supera el límite recomendado (${ab.cautionMaxStockConcMgPerMl} mg/mL).`);
    }

    const doseMg = (() => {
      const d = Number(dose) > 0 ? Number(dose) : 0;
      return doseUnit === "g" ? d * 1000 : d;
    })();

    const volForDose = stockConc > 0 ? doseMg / stockConc : 0; // mL to withdraw from vial

    // Compute planned final volume
    let finalVol = 0;
    // Priority: user-specified finalVolume if addDiluent enabled
    if (addDiluent && Number(finalVolume) > 0) {
      finalVol = Number(finalVolume);
    } else if (Number(desiredConc) > 0) {
      finalVol = doseMg / Number(desiredConc);
    } else {
      finalVol = ab?.recommendedInfusion?.volumeMl ?? Math.max(50, volForDose);
    }

    const addDiluentMl = Math.max(0, finalVol - volForDose);
    const finalConc = finalVol > 0 ? doseMg / finalVol : 0; // mg/mL in bag

    // Generic warnings
    if (finalVol > 0 && finalVol < 10) {
      msgs.push("Precaución: volumen final de administración muy bajo para infusión IV.");
    }
    if (finalConc > (ab?.cautionMaxStockConcMgPerMl ?? 100)) {
      msgs.push("Precaución: concentración final elevada; verifique compatibilidad y vía de administración.");
    }

    const perKgText = Number(weight) > 0 ? ` (~${(doseMg / Number(weight)).toFixed(1)} mg/kg)` : "";

    const recommendation = ab?.recommendedInfusion
      ? `Sugerencia: administrar en ~${ab.recommendedInfusion.volumeMl} mL en ${ab.recommendedInfusion.timeMin} min. ${ab.recommendedInfusion.note ?? ""}`
      : "Sugerencia: diluir en volumen adecuado y administrar según protocolo local.";

    const text = `Con una reconstitución a ${reconst} mL, la concentración del vial es ${stockConc.toFixed(1)} mg/mL. Para una dosis de ${doseMg.toFixed(0)} mg${perKgText}, extraiga ${volForDose.toFixed(1)} mL y diluya hasta ${finalVol.toFixed(0)} mL (añadir ${addDiluentMl.toFixed(0)} mL). Concentración final aproximada: ${finalConc.toFixed(1)} mg/mL.`;

    return { stockConc, volForDose, finalVol, addDiluentMl, finalConc, recommendation, text, msgs };
  }, [ab, reconstMl, desiredConc, dose, doseUnit, finalVolume, addDiluent, weight]);

  React.useEffect(() => {
    setWarnings(values.msgs);
  }, [values]);

  const clearAll = () => {
    setReconstMl(ab?.defaultReconstitutionMl ?? 10);
    setDesiredConc(0);
    setDose(1000);
    setDoseUnit("mg");
    setFinalVolume(0);
    setAddDiluent(false);
    setWeight("");
    setWarnings([]);
  };

  const header = (
    <div className="flex items-start justify-between gap-3">
      <div>
        <CardTitle className="text-2xl">Reconstitución y Dilución de Antibióticos</CardTitle>
        <CardDescription>Calcula concentraciones, volúmenes y diluciones de forma segura y rápida.</CardDescription>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger aria-label="Ayuda">
            <Info className="w-5 h-5 text-slate-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-xs leading-snug">
            <p>Seleccione el antibiótico, reconstituya el vial con un volumen, y calcule el volumen a extraer para la dosis. Opcionalmente, ajuste a una concentración/volumen final.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const form = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="ab">Antibiótico</Label>
        <Select value={abId} onValueChange={setAbId}>
          <SelectTrigger id="ab" aria-label="Antibiótico">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(o => (
              <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="reconst">Volumen de diluyente para reconstitución (mL)</Label>
        <Input id="reconst" type="number" min={0} step={0.1}
          value={reconstMl}
          onChange={(e)=>setReconstMl(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dose">Dosis a administrar</Label>
          <div className="flex items-center gap-2">
            <Select value={doseUnit} onValueChange={(v)=>setDoseUnit(v as DoseUnit)}>
              <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mg">mg</SelectItem>
                <SelectItem value="g">g</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Input id="dose" type="number" min={0} step={0.1}
          value={dose}
          onChange={(e)=>setDose(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="weight">Peso del paciente (kg, opcional)</Label>
        <Input id="weight" type="number" min={0} step={0.1}
          value={weight}
          onChange={(e)=>setWeight(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="desired">Concentración final deseada (mg/mL, opcional)</Label>
        <Input id="desired" type="number" min={0} step={0.1}
          value={desiredConc}
          onChange={(e)=>setDesiredConc(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="final">Volumen final de administración (mL, opcional)</Label>
          <div className="flex items-center gap-2">
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" checked={addDiluent} onChange={(e)=>setAddDiluent(e.target.checked)} />
              Agregar diluyente adicional
            </label>
          </div>
        </div>
        <Input id="final" type="number" min={0} step={1}
          value={finalVolume}
          onChange={(e)=>setFinalVolume(e.target.value === "" ? "" : Number(e.target.value))}
          disabled={!addDiluent}
        />
      </div>
    </div>
  );

  const results = (
    <Card className="mt-4 border bg-muted/5">
      <CardHeader>
        <CardTitle className="text-lg">Resultados</CardTitle>
        <CardDescription>Actualización en tiempo real según los datos ingresados.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Concentración tras reconstitución</div>
            <div className="text-xl font-bold">{values.stockConc > 0 ? `${values.stockConc.toFixed(1)} mg/mL` : "—"}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Volumen a extraer para la dosis</div>
            <div className="text-xl font-bold">{values.volForDose > 0 ? `${values.volForDose.toFixed(1)} mL` : "—"}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Volumen final de administración</div>
            <div className="text-xl font-bold">{values.finalVol > 0 ? `${values.finalVol.toFixed(0)} mL` : "—"}</div>
          </div>
        </div>
        <div className="mt-3 text-sm">{values.text}</div>
        <div className="mt-2 text-sm text-slate-600">{values.recommendation}</div>
        {warnings.length > 0 && (
          <div className="mt-3 space-y-2">
            {warnings.map((w, i) => (
              <div key={i} className="text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">{w}</div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const main = (
    <>
      <div className="grid grid-cols-1 gap-4 mb-4">{form}</div>
      <div className="mt-4 flex items-center justify-between">
        <Button type="button" variant="secondary" onClick={clearAll} className="transition-transform duration-150 hover:scale-105">Limpiar</Button>
        <Button type="button" disabled className="opacity-70 cursor-not-allowed">Cálculo en tiempo real</Button>
      </div>
      {results}
    </>
  );

  if (embedded) {
    return <div>{header}{main}</div>;
  }

  return (
    <section aria-label="Reconstitución y dilución de antibióticos" className="w-full flex justify-center px-3 sm:px-0">
      <Card className="w-full max-w-2xl">
        <CardHeader>{header}</CardHeader>
        <CardContent>{main}</CardContent>
      </Card>
    </section>
  );
};

export default ReconstitutionDilutionCalculator;

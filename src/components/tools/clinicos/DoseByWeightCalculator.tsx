import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

// Modes and units
type Mode = "weight" | "bsa";
type UnitWeight = "mg/kg" | "µg/kg";
type UnitBSA = "mg/m²" | "µg/m²";

type Result = {
  value: number;
  unit: "mg" | "µg";
  text: string;
  color: string;
};

const OK = "#0ea5e9"; // cyan/blue for neutral OK
const WARN = "#f59e0b"; // amber
const DANGER = "#ef4444"; // red

const DoseByWeightCalculator: React.FC<{ embedded?: boolean }> = ({ embedded = false }) => {
  const [mode, setMode] = React.useState<Mode>("weight");
  const [unitW, setUnitW] = React.useState<UnitWeight>("mg/kg");
  const [unitB, setUnitB] = React.useState<UnitBSA>("mg/m²");

  const [weight, setWeight] = React.useState<number | "">(70);
  const [bsa, setBsa] = React.useState<number | "">(1.8);
  const [dosePer, setDosePer] = React.useState<number | "">(15);
  const [frequency, setFrequency] = React.useState<string>("cada 24 horas");
  const [drug, setDrug] = React.useState<string>("");

  const [warning, setWarning] = React.useState<string>("");
  const [result, setResult] = React.useState<Result | null>(null);

  React.useEffect(() => {
    setResult(null);
    setWarning("");
  }, [mode, unitW, unitB]);

  const clearAll = () => {
    setMode("weight");
    setUnitW("mg/kg");
    setUnitB("mg/m²");
    setWeight(70);
    setBsa(1.8);
    setDosePer(15);
    setFrequency("cada 24 horas");
    setDrug("");
    setResult(null);
    setWarning("");
  };

  const validate = (): string | null => {
    if (dosePer === "" || Number(dosePer) <= 0) return "Ingrese una dosis recomendada válida.";
    if (mode === "weight") {
      if (weight === "" || Number(weight) <= 0) return "Ingrese un peso válido en kg.";
      if (Number(weight) < 30 || Number(weight) > 200) return "Advertencia: peso fuera de rango clínico típico (<30 kg o >200 kg).";
    } else {
      if (bsa === "" || Number(bsa) <= 0) return "Ingrese una superficie corporal válida en m².";
      if (Number(bsa) < 0.5 || Number(bsa) > 3) return "Advertencia: superficie corporal fuera de rango clínico típico.";
    }
    return null;
  };

  const onCalculate = () => {
    setWarning("");
    setResult(null);
    const msg = validate();
    if (msg) {
      // If it starts with "Advertencia", allow calculation but show warning; if it's an error ask for correction
      if (msg.startsWith("Advertencia")) {
        setWarning(msg);
      } else {
        setWarning(msg);
        return;
      }
    }

    const per = Number(dosePer);
    let total = 0;
    let outUnit: "mg" | "µg" = "mg";

    if (mode === "weight") {
      const kg = Number(weight);
      total = per * kg; // per could be mg/kg or µg/kg
      outUnit = unitW.startsWith("mg") ? "mg" : "µg";
    } else {
      const m2 = Number(bsa);
      total = per * m2; // per could be mg/m2 or µg/m2
      outUnit = unitB.startsWith("mg") ? "mg" : "µg";
    }

    // Reasonableness check: > 10,000 mg
    const totalMg = outUnit === "mg" ? total : total / 1000;
    let warn = warning;
    if (totalMg > 10000) {
      warn = "Atención: la dosis total calculada supera 10,000 mg; verifique parámetros y unidades.";
    }

    const who = mode === "weight" ? `${weight} kg` : `${bsa} m²`;
    const unitPer = mode === "weight" ? unitW : unitB;
    const med = drug?.trim() || "el medicamento";
    const freq = frequency?.trim() ? ` ${frequency.trim()}` : "";

    const text = `Para un paciente de ${who}, la dosis total de ${med} (${per} ${unitPer}) es de ${total.toFixed(2)} ${outUnit}${freq ? ` ${freq}` : ""}.`;

    setResult({ value: total, unit: outUnit, text, color: warn ? WARN : OK });
    if (warn) setWarning(warn);
  };

  const header = (
    <div className="flex items-start justify-between gap-3">
      <div>
        <CardTitle className="text-2xl">Calculadora de Dosis por Peso y Superficie Corporal</CardTitle>
        <CardDescription>
          Determina dosis totales basadas en el peso o la superficie corporal del paciente.
        </CardDescription>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger aria-label="Ayuda">
            <Info className="w-5 h-5 text-slate-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-xs leading-snug">
            <p>Ingrese la dosis recomendada por kg o m² y el sistema calculará la dosis total según el modo seleccionado.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const selectors = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="mode">Modo de cálculo</Label>
        <Select value={mode} onValueChange={(v)=>setMode(v as Mode)}>
          <SelectTrigger id="mode" aria-label="Modo de cálculo">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weight">Por peso corporal (mg/kg o µg/kg)</SelectItem>
            <SelectItem value="bsa">Por superficie corporal (mg/m² o µg/m²)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="unit">Unidad</Label>
        {mode === "weight" ? (
          <Select value={unitW} onValueChange={(v)=>setUnitW(v as UnitWeight)}>
            <SelectTrigger id="unit" aria-label="Unidad por peso">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mg/kg">mg/kg</SelectItem>
              <SelectItem value="µg/kg">µg/kg</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Select value={unitB} onValueChange={(v)=>setUnitB(v as UnitBSA)}>
            <SelectTrigger id="unit" aria-label="Unidad por superficie corporal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mg/m²">mg/m²</SelectItem>
              <SelectItem value="µg/m²">µg/m²</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );

  const inputs = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mode === "weight" ? (
        <div>
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input id="weight" type="number" min={0} step={0.1} placeholder="p. ej., 70"
            value={weight}
            onChange={(e)=>setWeight(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
      ) : (
        <div>
          <Label htmlFor="bsa">Superficie corporal (m²)</Label>
          <Input id="bsa" type="number" min={0} step={0.01} placeholder="p. ej., 1.8"
            value={bsa}
            onChange={(e)=>setBsa(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dosePer">Dosis recomendada ({mode === "weight" ? unitW : unitB})</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger aria-label="Información sobre dosis" className="ml-2">
                <Info className="w-4 h-4 text-slate-500" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs leading-snug">
                Indique la dosis por kg o por m² según el modo; por ejemplo, 15 mg/kg o 100 µg/m².
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input id="dosePer" type="number" min={0} step={0.01} placeholder="p. ej., 15"
          value={dosePer}
          onChange={(e)=>setDosePer(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="freq">Frecuencia / intervalo (opcional)</Label>
        <Input id="freq" placeholder="cada 8 horas, cada 24 horas, etc."
          value={frequency}
          onChange={(e)=>setFrequency(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="drug">Nombre del fármaco (opcional)</Label>
        <Input id="drug" placeholder="p. ej., amikacina"
          value={drug}
          onChange={(e)=>setDrug(e.target.value)}
        />
      </div>
    </div>
  );

  const resultPanel = result && (
    <div className="mt-4 rounded-xl border p-4" style={{ backgroundColor: `${result.color}11` }}>
      <div className="text-sm text-muted-foreground">Resultado</div>
      <div className="text-xl font-bold text-center" style={{ color: result.color }}>
        {result.value.toFixed(2)} {result.unit}
      </div>
      <div className="text-sm mt-2 text-center" style={{ color: result.color }}>{result.text}</div>
    </div>
  );

  const warningPanel = warning && (
    <div className="mt-3 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
      {warning}
    </div>
  );

  const main = (
    <>
      <div className="grid grid-cols-1 gap-4 mb-4">{selectors}</div>
      {inputs}
      <div className="mt-4 flex items-center justify-between">
        <Button type="button" variant="secondary" onClick={clearAll}>Limpiar</Button>
        <Button type="button" onClick={onCalculate}>Calcular Dosis</Button>
      </div>
      {warningPanel}
      {resultPanel}
    </>
  );

  if (embedded) {
    return <div>{header}{main}</div>;
  }

  return (
    <section aria-label="Calculadora de dosis por peso y superficie corporal" className="w-full flex justify-center px-3 sm:px-0">
      <Card className="w-full max-w-2xl">
        <CardHeader>{header}</CardHeader>
        <CardContent>{main}</CardContent>
      </Card>
    </section>
  );
};

export default DoseByWeightCalculator;

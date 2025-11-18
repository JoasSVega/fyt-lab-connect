import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

// Color helpers
const OK = "#10b981"; // verde
const MID = "#f59e0b"; // amarillo
const BAD = "#ef4444"; // rojo

// Bilirrubina conversion (mg/dL <-> µmol/L)
const mgdlToUmolBili = (x: number) => x * 17.1;
const umolToMgdlBili = (x: number) => x / 17.1;

type Formula = "child" | "meld" | "apri" | "fib4";

type Ascites = "none" | "mild" | "moderate" | "severe";

type HepaticResult = { value: number; unit?: string; text: string; color: string };

// Child‑Pugh helpers
function childPughPointsBilirubin(mgdl: number): 1 | 2 | 3 {
  if (mgdl < 2) return 1;
  if (mgdl <= 3) return 2;
  return 3;
}
function childPughPointsAlbumin(gdl: number): 1 | 2 | 3 {
  if (gdl > 3.5) return 1;
  if (gdl >= 2.8) return 2;
  return 3;
}
function childPughPointsINR(inr: number): 1 | 2 | 3 {
  if (inr < 1.7) return 1;
  if (inr <= 2.3) return 2;
  return 3;
}
function childPughPointsAscites(a: Ascites): 1 | 2 | 3 {
  if (a === "none") return 1;
  if (a === "mild") return 2;
  return 3; // moderate or severe
}
function childPughPointsEnceph(a: Ascites): 1 | 2 | 3 {
  if (a === "none") return 1;
  if (a === "mild") return 2;
  return 3;
}
function childPughClass(total: number): { cls: "A" | "B" | "C"; color: string } {
  if (total <= 6) return { cls: "A", color: OK };
  if (total <= 9) return { cls: "B", color: MID };
  return { cls: "C", color: BAD };
}

// MELD (sin Na). Usamos límites estándar: min lab 1.0; creatinina máxima 4.0
function calcMELD(biliMgdl: number, inr: number, creatMgdl: number): number {
  const b = Math.max(biliMgdl, 1);
  const i = Math.max(inr, 1);
  const c = Math.min(Math.max(creatMgdl, 1), 4);
  // 10 * (0.957*ln(creat) + 0.378*ln(bili) + 1.12*ln(INR)) + 6.43
  return 10 * (0.957 * Math.log(c) + 0.378 * Math.log(b) + 1.12 * Math.log(i)) + 6.43;
}
// MELD-Na
function calcMELDNa(meld: number, sodium: number): number {
  const Na = Math.min(Math.max(sodium, 125), 137);
  return meld + 1.32 * (137 - Na) - (0.033 * meld * (137 - Na));
}
function meldMortalityText(meldScore: number): string {
  if (meldScore < 10) return "Mortalidad 3 meses ~1–2%";
  if (meldScore < 20) return "Mortalidad 3 meses ~6–20%";
  if (meldScore < 30) return "Mortalidad 3 meses ~19–76%";
  return "Mortalidad 3 meses alta (>76%)";
}

// APRI
function calcAPRI(ast: number, astULN: number, platelets: number): HepaticResult {
  if (!ast || !astULN || !platelets) return { value: NaN, text: "—", color: MID };
  const val = (ast / astULN) / platelets * 100;
  if (val < 0.5) return { value: val, text: "Sin fibrosis significativa", color: OK };
  if (val < 1.0) return { value: val, text: "Indeterminado / leve", color: MID };
  if (val < 2.0) return { value: val, text: "Fibrosis significativa", color: MID };
  return { value: val, text: "Cirrosis probable", color: BAD };
}

// FIB-4
function calcFIB4(age: number, ast: number, alt: number, platelets: number): HepaticResult {
  if (!age || !ast || !alt || !platelets) return { value: NaN, text: "—", color: MID };
  const val = (age * ast) / (platelets * Math.sqrt(alt));
  if (val < 1.3) return { value: val, text: "Bajo riesgo de fibrosis avanzada", color: OK };
  if (val <= 2.67) return { value: val, text: "Riesgo intermedio", color: MID };
  return { value: val, text: "Alto riesgo de fibrosis avanzada", color: BAD };
}

const SUBTITLE: Record<Formula, string> = {
  child: "Basada en el modelo Child‑Pugh",
  meld: "Basada en puntaje MELD / MELD‑Na",
  apri: "Basada en índice APRI",
  fib4: "Basada en índice FIB‑4",
};

const HepaticFunctionCalculator: React.FC<{ embedded?: boolean }> = ({ embedded = false }) => {
  const [formula, setFormula] = React.useState<Formula>("child");

  // Common fields
  const [bili, setBili] = React.useState<number | "">(2);
  const [biliUnit, setBiliUnit] = React.useState<"mgdl" | "umol">("mgdl");
  const [albumin, setAlbumin] = React.useState<number | "">(3.2);
  const [inr, setINR] = React.useState<number | "">(1.2);
  const [ascites, setAscites] = React.useState<Ascites>("none");
  const [enceph, setEnceph] = React.useState<Ascites>("none");

  // MELD specific
  const [creat, setCreat] = React.useState<number | "">(1);
  const [sodium, setSodium] = React.useState<number | "">(135);

  // APRI / FIB-4 specific
  const [ast, setAST] = React.useState<number | "">(40);
  const [alt, setALT] = React.useState<number | "">(40);
  const [astULN, setASTULN] = React.useState<number | "">(40);
  const [platelets, setPlatelets] = React.useState<number | "">(250);
  const [age, setAge] = React.useState<number | "">(50);

  const [result, setResult] = React.useState<HepaticResult | null>(null);

  // Reset on formula change
  React.useEffect(() => {
    setResult(null);
  }, [formula]);

  const handleBiliUnitChange = (next: "mgdl" | "umol") => {
    if (bili === "") { setBiliUnit(next); return; }
    const val = Number(bili);
    const converted = next === "mgdl" ? umolToMgdlBili(val) : mgdlToUmolBili(val);
    setBili(Number(converted.toFixed(2)));
    setBiliUnit(next);
  };

  const onCalculate = () => {
    if (formula === "child") {
      const bMgdl = biliUnit === "umol" ? umolToMgdlBili(Number(bili)) : Number(bili);
      const total =
        childPughPointsBilirubin(bMgdl) +
        childPughPointsAlbumin(Number(albumin)) +
        childPughPointsINR(Number(inr)) +
        childPughPointsAscites(ascites) +
        childPughPointsEnceph(enceph);
      const cls = childPughClass(total);
      setResult({ value: total, text: `Clase ${cls.cls}`, color: cls.color });
      return;
    }
    if (formula === "meld") {
      const meld = calcMELD(Number(bili), Number(inr), Number(creat));
      const meldNa = sodium ? calcMELDNa(meld, Number(sodium)) : meld;
      const text = `${meldNa.toFixed(1)} puntos · ${meldMortalityText(meldNa)}`;
      setResult({ value: meldNa, text, color: meldNa < 10 ? OK : meldNa < 20 ? MID : BAD });
      return;
    }
    if (formula === "apri") {
      const r = calcAPRI(Number(ast), Number(astULN), Number(platelets));
      setResult(r);
      return;
    }
    if (formula === "fib4") {
      const r = calcFIB4(Number(age), Number(ast), Number(alt), Number(platelets));
      setResult(r);
      return;
    }
  };

  const header = (
    <div className="flex items-start justify-between gap-3">
      <div>
        <CardTitle className="text-2xl">Calculadora de Función Hepática</CardTitle>
        <CardDescription>{SUBTITLE[formula]}</CardDescription>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger aria-label="Información de fórmula">
            <Info className="w-5 h-5 text-slate-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-xs leading-snug">
            <p>
              {formula === "child" && "Child‑Pugh: 5 parámetros con puntaje 1–3; total 5–15 clasifica A (≤6), B (7–9), C (≥10)."}
              {formula === "meld" && "MELD: 10*(0.957*ln(Cr)+0.378*ln(Bili)+1.12*ln(INR))+6.43; MELD‑Na ajusta por sodio."}
              {formula === "apri" && "APRI = (AST/LSN_AST)/Plaquetas * 100."}
              {formula === "fib4" && "FIB‑4 = (Edad*AST)/(Plaquetas*√ALT)."}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const formulaSelector = (
    <div>
      <Label htmlFor="fml">Fórmula</Label>
      <Select value={formula} onValueChange={(v)=>setFormula(v as Formula)}>
        <SelectTrigger id="fml" aria-label="Fórmula hepática">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="child">Child‑Pugh</SelectItem>
          <SelectItem value="meld">MELD / MELD‑Na</SelectItem>
          <SelectItem value="apri">APRI</SelectItem>
          <SelectItem value="fib4">FIB‑4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const childInputs = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="bili">Bilirrubina total</Label>
        <div className="grid grid-cols-3 gap-2">
          <Input id="bili" className="col-span-2" type="number" step="0.1" min={0} placeholder="p. ej., 1.2"
            value={bili} onChange={(e)=>setBili(e.target.value===""?"":Number(e.target.value))} aria-label="Bilirrubina" />
          <Select value={biliUnit} onValueChange={(v)=>handleBiliUnitChange(v as "mgdl" | "umol")}>
            <SelectTrigger aria-label="Unidad de bilirrubina"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mgdl">mg/dL</SelectItem>
              <SelectItem value="umol">µmol/L</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="alb">Albúmina (g/dL)</Label>
        <Input id="alb" type="number" step="0.1" min={0} placeholder="p. ej., 3.8"
          value={albumin} onChange={(e)=>setAlbumin(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="inr">INR</Label>
        <Input id="inr" type="number" step="0.1" min={0} placeholder="p. ej., 1.2"
          value={inr} onChange={(e)=>setINR(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="asc">Ascitis</Label>
        <Select value={ascites} onValueChange={(v)=>setAscites(v as Ascites)}>
          <SelectTrigger id="asc"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Ausente</SelectItem>
            <SelectItem value="mild">Leve o controlada</SelectItem>
            <SelectItem value="moderate">Moderada</SelectItem>
            <SelectItem value="severe">Severa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="enc">Encefalopatía</Label>
        <Select value={enceph} onValueChange={(v)=>setEnceph(v as Ascites)}>
          <SelectTrigger id="enc"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Ausente</SelectItem>
            <SelectItem value="mild">Grado I–II</SelectItem>
            <SelectItem value="moderate">Grado III</SelectItem>
            <SelectItem value="severe">Grado IV</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const meldInputs = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="bili2">Bilirrubina total (mg/dL)</Label>
        <Input id="bili2" type="number" step="0.1" min={0} placeholder="p. ej., 1.2"
          value={bili} onChange={(e)=>setBili(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="creat">Creatinina (mg/dL)</Label>
        <Input id="creat" type="number" step="0.01" min={0} placeholder="p. ej., 1.0"
          value={creat} onChange={(e)=>setCreat(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="inr2">INR</Label>
        <Input id="inr2" type="number" step="0.01" min={0} placeholder="p. ej., 1.2"
          value={inr} onChange={(e)=>setINR(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="na">Sodio sérico (mmol/L, opcional)</Label>
        <Input id="na" type="number" step="1" min={110} max={170} placeholder="p. ej., 135"
          value={sodium} onChange={(e)=>setSodium(e.target.value===""?"":Number(e.target.value))} />
      </div>
    </div>
  );

  const apriInputs = (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="ast">AST (UI/L)</Label>
        <Input id="ast" type="number" min={0} placeholder="p. ej., 35"
          value={ast} onChange={(e)=>setAST(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="uln">LSN AST (UI/L)</Label>
        <Input id="uln" type="number" min={1} placeholder="p. ej., 40"
          value={astULN} onChange={(e)=>setASTULN(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="plt">Plaquetas (10^9/L)</Label>
        <Input id="plt" type="number" min={1} placeholder="p. ej., 250"
          value={platelets} onChange={(e)=>setPlatelets(e.target.value===""?"":Number(e.target.value))} />
      </div>
    </div>
  );

  const fib4Inputs = (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div>
        <Label htmlFor="age">Edad (años)</Label>
        <Input id="age" type="number" min={1} placeholder="p. ej., 50"
          value={age} onChange={(e)=>setAge(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="ast2">AST (UI/L)</Label>
        <Input id="ast2" type="number" min={0}
          value={ast} onChange={(e)=>setAST(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="alt">ALT (UI/L)</Label>
        <Input id="alt" type="number" min={0}
          value={alt} onChange={(e)=>setALT(e.target.value===""?"":Number(e.target.value))} />
      </div>
      <div>
        <Label htmlFor="plt2">Plaquetas (10^9/L)</Label>
        <Input id="plt2" type="number" min={1}
          value={platelets} onChange={(e)=>setPlatelets(e.target.value===""?"":Number(e.target.value))} />
      </div>
    </div>
  );

  const renderInputs = () => {
    switch (formula) {
      case "child":
        return childInputs;
      case "meld":
        return meldInputs;
      case "apri":
        return apriInputs;
      case "fib4":
        return fib4Inputs;
      default:
        return null;
    }
  };

  const resultPanel = result && (
    <div className="mt-4 rounded-xl border p-4" style={{ backgroundColor: `${result.color}11` }}>
      <div className="text-sm text-muted-foreground">Resultado</div>
      <div className="text-2xl font-bold" style={{ color: result.color }}>
        {isFinite(result.value) ? result.value.toFixed(2) : "—"} {result.unit ?? ""}
      </div>
      <div className="text-sm mt-1" style={{ color: result.color }}>{result.text}</div>
    </div>
  );

  const main = (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">{formulaSelector}</div>
      {renderInputs()}
      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={onCalculate}>Calcular</Button>
      </div>
      {resultPanel}
    </>
  );

  if (embedded) {
    return <div>{header}{main}</div>;
  }

  return (
    <section aria-label="Calculadora de función hepática" className="w-full flex justify-center px-3 sm:px-0">
      <Card className="w-full max-w-2xl">
        <CardHeader>{header}</CardHeader>
        <CardContent>{main}</CardContent>
      </Card>
    </section>
  );
};

export default HepaticFunctionCalculator;

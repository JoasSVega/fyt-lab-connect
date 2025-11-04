import * as React from "react";
import Seo from "@/components/Seo";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cockcroftGault, mdrd4, ckdEpi2009, ckdEpi2021, mgdlToUmol, umolToMgdl } from "@/utils/renal";

// Tipos
type Sex = "male" | "female";

type Unit = "mgdl" | "umol"; // mg/dL | µmol/L

type Formula = "cg" | "mdrd" | "ckd2009" | "ckd2021";

// Texto de fórmulas para tooltip (forma resumida y legible)
const FORMULA_INFO: Record<Formula, string> = {
  cg: "Cockcroft–Gault: CrCl = ((140 − edad) × peso × (0.85 si mujer)) / (72 × SCr[mg/dL])",
  mdrd: "MDRD-4: TFG = 175 × (SCr[mg/dL])^(−1.154) × (edad)^(−0.203) × (0.742 si mujer) × (1.212 si raza negra)",
  ckd2009: "CKD‑EPI 2009: 141 × min(SCr/k,1)^a × max(SCr/k,1)^(−1.209) × 0.993^edad × (1.018 si mujer) × (1.159 si raza negra)",
  ckd2021: "CKD‑EPI 2021: 142 × min(SCr/k,1)^a × max(SCr/k,1)^(−1.200) × 0.9938^edad × (1.012 si mujer)",
};

// Interpretación de TFG (ml/min o ml/min/1.73m²)
function interpretGFR(gfr: number): string {
  if (!isFinite(gfr)) return "—";
  if (gfr >= 90) return "Normal (≥90)";
  if (gfr >= 60) return "Leve (60–89)";
  if (gfr >= 30) return "Moderada (30–59)";
  if (gfr >= 15) return "Severa (15–29)";
  return "Falla renal (<15)";
}

// Calculadora principal
const FuncionRenalCalculator: React.FC = () => {
  // Estado del formulario
  const [age, setAge] = React.useState<number | "">(65);
  const [weight, setWeight] = React.useState<number | "">(70);
  const [scr, setScr] = React.useState<number | "">(1);
  const [unit, setUnit] = React.useState<Unit>("mgdl");
  const [sex, setSex] = React.useState<Sex>("male");
  const [formula, setFormula] = React.useState<Formula>("cg");
  // Para MDRD/CKD-EPI podríamos incluir raza y albúmina/BUN; se omiten para mantener la UI simple.
  // Resultado calculado
  const [gfr, setGfr] = React.useState<number>(NaN);

  // Recalcular en tiempo real
  React.useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age, weight, scr, unit, sex, formula]);

  // Conversión automática al cambiar unidad
  const handleUnitChange = (next: Unit) => {
    if (scr === "" || scr === undefined || scr === null) {
      setUnit(next);
      return;
    }
    const val = Number(scr);
    const converted = next === "mgdl" ? umolToMgdl(val) : mgdlToUmol(val);
    setScr(Number(converted.toFixed(2)));
    setUnit(next);
  };

  // Cálculo por fórmula
  const calculate = () => {
    const a = Number(age);
    const w = Number(weight);
    const s = Number(scr);
    if (!a || !w || !s) {
      setGfr(NaN);
      return;
    }
    let value = NaN;
    switch (formula) {
      case "cg":
        value = cockcroftGault(a, w, s, sex, unit); // ml/min
        break;
      case "mdrd":
        value = mdrd4(a, s, sex, false, unit); // ml/min/1.73m²
        break;
      case "ckd2009":
        value = ckdEpi2009(a, s, sex, false, unit);
        break;
      case "ckd2021":
        value = ckdEpi2021(a, s, sex, unit);
        break;
    }
    setGfr(value);
  };

  // Etiqueta de unidad de salida
  const outputUnit = formula === "cg" ? "ml/min" : "ml/min/1.73m²";

  return (
    <section className="w-full flex justify-center px-3 sm:px-0" aria-label="Calculadora de función renal">
      {/* SEO opcional para esta sección (no imprescindible si la página ya define SEO) */}
      <Seo
        title="Calculadora de Función Renal (TFG Estimada)"
        description="Estima la TFG/aclaramiento renal con fórmulas Cockcroft–Gault, MDRD y CKD–EPI (2009/2021). Conversión automática de unidades y resultado interpretado."
      />
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-2xl">Calculadora de Función Renal (TFG Estimada)</CardTitle>
              <CardDescription>
                Estima la función renal mediante diferentes fórmulas (Cockcroft–Gault, MDRD y CKD–EPI)
              </CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger aria-label="Información de fórmula">
                  <Info className="w-5 h-5 text-slate-500" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs leading-snug">
                  <p>{FORMULA_INFO[formula]}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Fila 1: edad y sexo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Edad (años)</Label>
              <Input id="age" type="number" min={1} inputMode="numeric" value={age}
                onChange={(e)=>setAge(e.target.value === "" ? "" : Number(e.target.value))}
                aria-label="Edad en años" />
            </div>
            <div>
              <Label htmlFor="sex">Sexo</Label>
              <Select value={sex} onValueChange={(v)=>setSex(v as Sex)}>
                <SelectTrigger id="sex" aria-label="Sexo">
                  <SelectValue placeholder="Sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input id="weight" type="number" min={1} inputMode="decimal" value={weight}
                onChange={(e)=>setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                aria-label="Peso en kilogramos" />
            </div>
          </div>

          {/* Fila 2: creatinina + unidad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="scr">Creatinina sérica</Label>
              <Input id="scr" type="number" min={0} step="0.01" inputMode="decimal" value={scr}
                onChange={(e)=>setScr(e.target.value === "" ? "" : Number(e.target.value))}
                aria-label="Creatinina sérica" />
            </div>
            <div>
              <Label htmlFor="unit">Unidad</Label>
              <Select value={unit} onValueChange={(v)=>handleUnitChange(v as Unit)}>
                <SelectTrigger id="unit" aria-label="Unidad de creatinina">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mgdl">mg/dL</SelectItem>
                  <SelectItem value="umol">µmol/L</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fila 3: fórmula */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="formula">Fórmula</Label>
              <Select value={formula} onValueChange={(v)=>setFormula(v as Formula)}>
                <SelectTrigger id="formula" aria-label="Fórmula de cálculo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cg">Cockcroft–Gault</SelectItem>
                  <SelectItem value="mdrd">MDRD (4 variables)</SelectItem>
                  <SelectItem value="ckd2009">CKD‑EPI 2009</SelectItem>
                  <SelectItem value="ckd2021">CKD‑EPI 2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button type="button" onClick={calculate} className="w-full">Calcular</Button>
            </div>
          </div>

          {/* Resultado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="rounded-xl border p-4 bg-white/60">
              <p className="text-sm text-muted-foreground">Resultado</p>
              <p className="text-2xl font-bold">
                {isFinite(gfr) ? `${gfr.toFixed(1)} ${outputUnit}` : "—"}
              </p>
            </div>
            <div className="rounded-xl border p-4 bg-white/60">
              <p className="text-sm text-muted-foreground">Interpretación</p>
              <p className="text-lg font-semibold">{interpretGFR(gfr)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="block">
          <p className="text-center font-bold mt-6 text-sm text-gray-800 dark:text-gray-200">
            Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default FuncionRenalCalculator;

import React, { useState } from "react";
import UnitSystemToggle, { UnitSystem } from "../components/units/UnitSystemToggle";
import NumberField from "../components/inputs/NumberField";
import CalculatorCard from "../components/panels/CalculatorCard";
import {
  mgdlToUmolL,
  umolLToMgdl,
  cockcroftGault,
  cockcroftGaultBSA,
  mdrd4,
  mdrd6,
  ckdEpi2009,
  ckdEpi2021,
} from "../utils/renal";

export const pathRenal = "/herramientas/funcion-renal";

type Sex = "male" | "female";

const defaultState = {
  age: "",
  weight: "",
  height: "",
  scr: "",
  bun: "",
  alb: "",
  sex: "male" as Sex,
  black: false,
};

const validate = (state: typeof defaultState, unit: UnitSystem) => {
  const age = Number(state.age);
  const weight = Number(state.weight);
  const height = Number(state.height);
  const scr = Number(state.scr);
  const bun = Number(state.bun);
  const alb = Number(state.alb);
  const scrMin = unit === "mgdl" ? 0.2 : 18;
  const scrMax = unit === "mgdl" ? 20 : 1768;
  return {
    age: age >= 14 && age <= 120,
    weight: weight >= 25 && weight <= 300,
    height: height >= 120 && height <= 220,
    scr: scr >= scrMin && scr <= scrMax,
    bun: bun === 0 || (bun >= 5 && bun <= 200),
    alb: alb === 0 || (alb >= 1 && alb <= 6),
  };
};

const RenalFunctionPage: React.FC = () => {
  const [unit, setUnit] = useState<UnitSystem>("mgdl");
  const [tab, setTab] = useState<"cg" | "mdrd" | "ckdepi">("cg");
  const [state, setState] = useState(defaultState);
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Conversiones
  const scrValue = unit === "mgdl" ? Number(state.scr) : umolLToMgdl(Number(state.scr));
  const scrDisplay = unit === "mgdl" ? Number(state.scr) : Number(state.scr);

  // Validaciones
  const v = validate(state, unit);
  const canCalcCG = v.age && v.weight && v.scr;
  const canCalcMDRD = v.age && v.scr;
  const canCalcCKDEPI = v.age && v.scr;

  // Handlers
  const handleChange = (field: keyof typeof defaultState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(s => ({ ...s, [field]: e.target.value }));
  };
  const handleSex = (e: React.ChangeEvent<HTMLSelectElement>) => setState(s => ({ ...s, sex: e.target.value as Sex }));
  const handleBlack = (e: React.ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, black: e.target.checked }));
  const handleUnit = (val: UnitSystem) => {
    // Convierte creatinina automáticamente
    setState(s => ({
      ...s,
      scr:
        val === "mgdl"
          ? s.scr
            ? (umolLToMgdl(Number(s.scr))).toFixed(2)
            : ""
          : s.scr
          ? (mgdlToUmolL(Number(s.scr))).toFixed(0)
          : "",
    }));
    setUnit(val);
  };
  const handleReset = () => {
    setState(defaultState);
    setResult("");
    setCopied(false);
  };
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Cockcroft-Gault
  const calcCG = () => {
    const age = Number(state.age);
    const weight = Number(state.weight);
    const height = Number(state.height);
    const scr = scrValue;
    const sex = state.sex;
    if (!canCalcCG) return;
    const cg = cockcroftGault(age, weight, scr, sex);
    const cgBSA = height ? cockcroftGaultBSA(cg, weight, height) : undefined;
    let res = `Cockcroft-Gault: ${cg.toFixed(2)} ml/min`;
    if (cgBSA) res += ` (ajustado BSA: ${cgBSA.toFixed(2)} ml/min/1.73m²)`;
    setResult(res);
  };

  // MDRD
  const calcMDRD = () => {
    const age = Number(state.age);
    const scr = scrValue;
    const sex = state.sex;
    const black = state.black;
    const bun = Number(state.bun);
    const alb = Number(state.alb);
    let res = "";
    if (bun && alb) {
      const gfr6 = mdrd6(age, scr, bun, alb, sex, black);
      res = `MDRD (6 variables): ${gfr6.toFixed(2)} ml/min/1.73m²\n`;
    }
    const gfr4 = mdrd4(age, scr, sex, black);
    res += `MDRD (4 variables): ${gfr4.toFixed(2)} ml/min/1.73m²`;
    setResult(res);
  };

  // CKD-EPI
  const calcCKDEPI = () => {
    const age = Number(state.age);
    const scr = scrValue;
    const sex = state.sex;
    const black = state.black;
    const gfr2009 = ckdEpi2009(age, scr, sex, black);
    const gfr2021 = ckdEpi2021(age, scr, sex);
    const res = `CKD-EPI 2009: ${gfr2009.toFixed(2)} ml/min/1.73m²\nCKD-EPI 2021: ${gfr2021.toFixed(2)} ml/min/1.73m²`;
    setResult(res);
  };

  // Tabs
  const tabClass = (t: string) =>
    `px-4 py-2 rounded-t-lg font-semibold cursor-pointer transition-colors ${
      tab === t ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
    }`;

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-16">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Calculadoras de Función Renal</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <UnitSystemToggle value={unit} onChange={handleUnit} />
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button className={tabClass("cg")} onClick={() => { setTab("cg"); setResult(""); }}>
            Cockcroft-Gault
          </button>
          <button className={tabClass("mdrd")} onClick={() => { setTab("mdrd"); setResult(""); }}>
            MDRD
          </button>
          <button className={tabClass("ckdepi")} onClick={() => { setTab("ckdepi"); setResult(""); }}>
            CKD-EPI
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tab === "cg" && (
          <CalculatorCard
            title="Cockcroft-Gault"
            onCalculate={calcCG}
            onReset={handleReset}
            canCalculate={canCalcCG}
            result={result}
            onCopy={handleCopy}
          >
            <NumberField
              id="age"
              label="Edad"
              value={state.age}
              onChange={handleChange("age")}
              min={14}
              max={120}
              required
              unit="años"
              error={state.age && !v.age ? "Edad 14–120" : undefined}
            />
            <NumberField
              id="weight"
              label="Peso"
              value={state.weight}
              onChange={handleChange("weight")}
              min={25}
              max={300}
              required
              unit="kg"
              error={state.weight && !v.weight ? "Peso 25–300 kg" : undefined}
            />
            <NumberField
              id="height"
              label="Talla"
              value={state.height}
              onChange={handleChange("height")}
              min={120}
              max={220}
              unit="cm"
              error={state.height && !v.height ? "Talla 120–220 cm" : undefined}
              help="Opcional para ajuste por superficie corporal"
            />
            <NumberField
              id="scr"
              label="Creatinina sérica"
              value={state.scr}
              onChange={handleChange("scr")}
              min={unit === "mgdl" ? 0.2 : 18}
              max={unit === "mgdl" ? 20 : 1768}
              required
              unit={unit === "mgdl" ? "mg/dL" : "µmol/L"}
              error={state.scr && !v.scr ? (unit === "mgdl" ? "0.2–20 mg/dL" : "18–1768 µmol/L") : undefined}
            />
            <div className="flex items-center gap-2">
              <label htmlFor="sex" className="font-medium">Sexo:</label>
              <select
                id="sex"
                value={state.sex}
                onChange={handleSex}
                className="border rounded px-2 py-1"
              >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>
          </CalculatorCard>
        )}
        {tab === "mdrd" && (
          <CalculatorCard
            title="MDRD"
            onCalculate={calcMDRD}
            onReset={handleReset}
            canCalculate={canCalcMDRD}
            result={result}
            onCopy={handleCopy}
          >
            <NumberField
              id="age"
              label="Edad"
              value={state.age}
              onChange={handleChange("age")}
              min={14}
              max={120}
              required
              unit="años"
              error={state.age && !v.age ? "Edad 14–120" : undefined}
            />
            <NumberField
              id="scr"
              label="Creatinina sérica"
              value={state.scr}
              onChange={handleChange("scr")}
              min={unit === "mgdl" ? 0.2 : 18}
              max={unit === "mgdl" ? 20 : 1768}
              required
              unit={unit === "mgdl" ? "mg/dL" : "µmol/L"}
              error={state.scr && !v.scr ? (unit === "mgdl" ? "0.2–20 mg/dL" : "18–1768 µmol/L") : undefined}
            />
            <NumberField
              id="bun"
              label="Urea (opcional)"
              value={state.bun}
              onChange={handleChange("bun")}
              min={0}
              max={200}
              unit="mg/dL"
              help="Solo para MDRD 6 variables"
              error={state.bun && !v.bun ? "Urea 5–200 mg/dL" : undefined}
            />
            <NumberField
              id="alb"
              label="Albúmina (opcional)"
              value={state.alb}
              onChange={handleChange("alb")}
              min={0}
              max={6}
              unit="g/dL"
              help="Solo para MDRD 6 variables"
              error={state.alb && !v.alb ? "Albúmina 1–6 g/dL" : undefined}
            />
            <div className="flex items-center gap-2">
              <label htmlFor="sex" className="font-medium">Sexo:</label>
              <select
                id="sex"
                value={state.sex}
                onChange={handleSex}
                className="border rounded px-2 py-1"
              >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
              <label htmlFor="black" className="ml-4 font-medium">Raza negra:</label>
              <input
                id="black"
                type="checkbox"
                checked={state.black}
                onChange={handleBlack}
                className="accent-blue-600"
              />
            </div>
          </CalculatorCard>
        )}
        {tab === "ckdepi" && (
          <CalculatorCard
            title="CKD-EPI"
            onCalculate={calcCKDEPI}
            onReset={handleReset}
            canCalculate={canCalcCKDEPI}
            result={result}
            onCopy={handleCopy}
          >
            <NumberField
              id="age"
              label="Edad"
              value={state.age}
              onChange={handleChange("age")}
              min={14}
              max={120}
              required
              unit="años"
              error={state.age && !v.age ? "Edad 14–120" : undefined}
            />
            <NumberField
              id="scr"
              label="Creatinina sérica"
              value={state.scr}
              onChange={handleChange("scr")}
              min={unit === "mgdl" ? 0.2 : 18}
              max={unit === "mgdl" ? 20 : 1768}
              required
              unit={unit === "mgdl" ? "mg/dL" : "µmol/L"}
              error={state.scr && !v.scr ? (unit === "mgdl" ? "0.2–20 mg/dL" : "18–1768 µmol/L") : undefined}
            />
            <div className="flex items-center gap-2">
              <label htmlFor="sex" className="font-medium">Sexo:</label>
              <select
                id="sex"
                value={state.sex}
                onChange={handleSex}
                className="border rounded px-2 py-1"
              >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
              <label htmlFor="black" className="ml-4 font-medium">Raza negra:</label>
              <input
                id="black"
                type="checkbox"
                checked={state.black}
                onChange={handleBlack}
                className="accent-blue-600"
              />
            </div>
          </CalculatorCard>
        )}
      </div>
      <div className="mt-8 text-xs text-gray-500 text-center">
        Estas ecuaciones son de uso clínico educativo y no reemplazan el juicio profesional.
      </div>
      {copied && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          ¡Resultado copiado!
        </div>
      )}
    </div>
  );
};

export default RenalFunctionPage;

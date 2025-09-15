import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import UnitSystemToggle, { UnitSystem } from "../components/units/UnitSystemToggle";
import NumberField from "../components/inputs/NumberField";
import CalculatorCard from "../components/panels/CalculatorCard";
import {
  cockcroftGault,
  cockcroftGaultBSA,
  mdrd4,
  mdrd6,
  ckdEpi2009,
  ckdEpi2021,
  mgdlToUmol,
  umolToMgdl,
} from "../utils/renal";

export const pathRenal = "/herramientas/funcion-renal";

const TABS = [
  { key: "cg", label: "Cockcroft-Gault" },
  { key: "mdrd", label: "MDRD" },
  { key: "ckd", label: "CKD-EPI" },
];

const SEX_OPTIONS = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Femenino" },
];

const RenalFunctionPage: React.FC = () => {
  const navigate = useNavigate();
  const [unit, setUnit] = useState<UnitSystem>("mgdl");
  const [tab, setTab] = useState("cg");

  // Cockcroft-Gault state
  const [cg, setCg] = useState({
    age: "",
    weight: "",
    sex: "male",
    scr: "",
    adjust: false,
    height: "",
  });
  const [cgResult, setCgResult] = useState<{ crcl: number; crclAdj?: number } | null>(null);
  const [cgError, setCgError] = useState<string>("");

  // MDRD state
  const [mdrd, setMdrd] = useState({
    age: "",
    sex: "male",
    scr: "",
    method: "4v",
    bun: "",
    alb: "",
    black: false,
  });
  const [mdrdResult, setMdrdResult] = useState<number | null>(null);
  const [mdrdError, setMdrdError] = useState<string>("");

  // CKD-EPI state
  const [ckd, setCkd] = useState({
    age: "",
    sex: "male",
    scr: "",
    version: "2021",
    black: false,
  });
  const [ckdResult, setCkdResult] = useState<number | null>(null);
  const [ckdError, setCkdError] = useState<string>("");

  // Handlers
  const handleCgChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target instanceof HTMLInputElement && type === "checkbox") ? e.target.checked : undefined;
    setCg(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  const handleCgReset = () => {
    setCg({ age: "", weight: "", sex: "male", scr: "", adjust: false, height: "" });
    setCgResult(null);
    setCgError("");
  };
  const handleCgCalc = () => {
    setCgError("");
    const age = Number(cg.age), weight = Number(cg.weight), scr = Number(cg.scr), height = Number(cg.height);
    if (!age || age < 18 || age > 120) return setCgError("Edad válida: 18-120 años");
    if (!weight || weight < 20 || weight > 300) return setCgError("Peso válido: 20-300 kg");
    if (!scr || scr <= 0) return setCgError("Creatinina válida > 0");
    if (cg.adjust && (!height || height < 100 || height > 250)) return setCgError("Talla válida: 100-250 cm");
    const crcl = cockcroftGault(age, weight, scr, cg.sex as 'male' | 'female', unit);
    let crclAdj: number | undefined = undefined;
    if (cg.adjust && height) crclAdj = cockcroftGaultBSA(crcl, weight, height);
    setCgResult({ crcl, crclAdj });
  };

  // MDRD
  const handleMdrdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target instanceof HTMLInputElement && type === "checkbox") ? e.target.checked : undefined;
    setMdrd(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  const handleMdrdReset = () => {
    setMdrd({ age: "", sex: "male", scr: "", method: "4v", bun: "", alb: "", black: false });
    setMdrdResult(null);
    setMdrdError("");
  };
  const handleMdrdCalc = () => {
    setMdrdError("");
    const age = Number(mdrd.age), scr = Number(mdrd.scr), bun = Number(mdrd.bun), alb = Number(mdrd.alb);
    if (!age || age < 18 || age > 120) return setMdrdError("Edad válida: 18-120 años");
    if (!scr || scr <= 0) return setMdrdError("Creatinina válida > 0");
    if (mdrd.method === "6v") {
      if (!bun || bun <= 0) return setMdrdError("Urea válida > 0");
      if (!alb || alb <= 0) return setMdrdError("Albúmina válida > 0");
      setMdrdResult(mdrd6(age, scr, bun, alb, mdrd.sex as 'male' | 'female', mdrd.black, unit));
    } else {
      setMdrdResult(mdrd4(age, scr, mdrd.sex as 'male' | 'female', mdrd.black, unit));
    }
  };

  // CKD-EPI
  const handleCkdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target instanceof HTMLInputElement && type === "checkbox") ? e.target.checked : undefined;
    setCkd(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  const handleCkdReset = () => {
    setCkd({ age: "", sex: "male", scr: "", version: "2021", black: false });
    setCkdResult(null);
    setCkdError("");
  };
  const handleCkdCalc = () => {
    setCkdError("");
    const age = Number(ckd.age), scr = Number(ckd.scr);
    if (!age || age < 18 || age > 120) return setCkdError("Edad válida: 18-120 años");
    if (!scr || scr <= 0) return setCkdError("Creatinina válida > 0");
    if (ckd.version === "2009") {
      setCkdResult(ckdEpi2009(age, scr, ckd.sex as 'male' | 'female', ckd.black, unit));
    } else {
      setCkdResult(ckdEpi2021(age, scr, ckd.sex as 'male' | 'female', unit));
    }
  };

  // Render
  return (
    <div className="max-w-3xl mx-auto px-2 py-8">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2 text-blue-700 hover:bg-blue-50"
        onClick={() => navigate("/herramientas")}
      >
        <ArrowLeft className="w-5 h-5" /> Volver a Herramientas
      </Button>
      <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-800 mb-4 text-center">
        Calculadoras de Función Renal
      </h1>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <UnitSystemToggle value={unit} onChange={setUnit} />
        <div className="flex space-x-2 mt-2 md:mt-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${
                tab === t.key
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setTab(t.key)}
              aria-current={tab === t.key ? "page" : undefined}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cockcroft-Gault */}
      {tab === "cg" && (
        <div>
          <CalculatorCard
            title="Cockcroft-Gault"
            onCalculate={handleCgCalc}
            onReset={handleCgReset}
            result={cgResult && (
              <div>
                <div>ClCr: <b>{cgResult.crcl.toFixed(2)}</b> ml/min</div>
                {cg.adjust && cgResult.crclAdj !== undefined && (
                  <div>ClCr ajustada: <b>{cgResult.crclAdj.toFixed(2)}</b> ml/min/1.73m²</div>
                )}
              </div>
            )}
            onCopy={cgResult ? () => {
              let txt = `ClCr: ${cgResult.crcl.toFixed(2)} ml/min`;
              if (cg.adjust && cgResult.crclAdj !== undefined) txt += `\nClCr ajustada: ${cgResult.crclAdj.toFixed(2)} ml/min/1.73m²`;
              navigator.clipboard.writeText(txt);
            } : undefined}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                id="cg-age"
                label="Edad"
                value={cg.age}
                onChange={handleCgChange}
                name="age"
                min={18}
                max={120}
                required
                error={cgError && !cg.age ? cgError : undefined}
              />
              <NumberField
                id="cg-weight"
                label="Peso"
                value={cg.weight}
                onChange={handleCgChange}
                name="weight"
                min={20}
                max={300}
                required
                error={cgError && !cg.weight ? cgError : undefined}
                unit="kg"
              />
              <div>
                <label className="block font-medium mb-1">Sexo</label>
                <select
                  name="sex"
                  value={cg.sex}
                  onChange={handleCgChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Sexo"
                >
                  {SEX_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <NumberField
                id="cg-scr"
                label="Creatinina sérica"
                value={cg.scr}
                onChange={handleCgChange}
                name="scr"
                min={0.1}
                required
                error={cgError && !cg.scr ? cgError : undefined}
                unit={unit === "mgdl" ? "mg/dL" : "µmol/L"}
              />
              <div className="md:col-span-2 flex items-center mt-2">
                <input
                  id="cg-adjust"
                  name="adjust"
                  type="checkbox"
                  checked={cg.adjust}
                  onChange={handleCgChange}
                  className="mr-2"
                />
                <label htmlFor="cg-adjust" className="text-sm">Ajustar a 1.73m² (requiere talla)</label>
              </div>
              {cg.adjust && (
                <NumberField
                  id="cg-height"
                  label="Talla"
                  value={cg.height}
                  onChange={handleCgChange}
                  name="height"
                  min={100}
                  max={250}
                  required
                  error={cgError && !cg.height ? cgError : undefined}
                  unit="cm"
                />
              )}
            </div>
            {cgError && <div className="text-red-600 text-sm mt-2">{cgError}</div>}
          </CalculatorCard>
        </div>
      )}

      {/* MDRD */}
      {tab === "mdrd" && (
        <div>
          <CalculatorCard
            title="MDRD"
            onCalculate={handleMdrdCalc}
            onReset={handleMdrdReset}
            result={mdrdResult !== null && (
              <div>TFG: <b>{mdrdResult.toFixed(2)}</b> ml/min/1.73 m²</div>
            )}
            onCopy={mdrdResult !== null ? () => {
              navigator.clipboard.writeText(`TFG: ${mdrdResult.toFixed(2)} ml/min/1.73 m²`);
            } : undefined}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                id="mdrd-age"
                label="Edad"
                value={mdrd.age}
                onChange={handleMdrdChange}
                name="age"
                min={18}
                max={120}
                required
                error={mdrdError && !mdrd.age ? mdrdError : undefined}
              />
              <div>
                <label className="block font-medium mb-1">Sexo</label>
                <select
                  name="sex"
                  value={mdrd.sex}
                  onChange={handleMdrdChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Sexo"
                >
                  {SEX_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <NumberField
                id="mdrd-scr"
                label="Creatinina sérica"
                value={mdrd.scr}
                onChange={handleMdrdChange}
                name="scr"
                min={0.1}
                required
                error={mdrdError && !mdrd.scr ? mdrdError : undefined}
                unit={unit === "mgdl" ? "mg/dL" : "µmol/L"}
              />
              <div>
                <label className="block font-medium mb-1">Metodología</label>
                <select
                  name="method"
                  value={mdrd.method}
                  onChange={handleMdrdChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Metodología"
                >
                  <option value="4v">4 variables</option>
                  <option value="6v">6 variables</option>
                </select>
              </div>
              {mdrd.method === "6v" && (
                <>
                  <NumberField
                    id="mdrd-bun"
                    label="Urea"
                    value={mdrd.bun}
                    onChange={handleMdrdChange}
                    name="bun"
                    min={1}
                    required
                    error={mdrdError && !mdrd.bun ? mdrdError : undefined}
                    unit="mg/dL"
                  />
                  <NumberField
                    id="mdrd-alb"
                    label="Albúmina"
                    value={mdrd.alb}
                    onChange={handleMdrdChange}
                    name="alb"
                    min={0.1}
                    required
                    error={mdrdError && !mdrd.alb ? mdrdError : undefined}
                    unit="g/dL"
                  />
                </>
              )}
              <div className="md:col-span-2 flex items-center mt-2">
                <input
                  id="mdrd-black"
                  name="black"
                  type="checkbox"
                  checked={mdrd.black}
                  onChange={handleMdrdChange}
                  className="mr-2"
                />
                <label htmlFor="mdrd-black" className="text-sm">¿Afrodescendiente?</label>
              </div>
            </div>
            {mdrdError && <div className="text-red-600 text-sm mt-2">{mdrdError}</div>}
          </CalculatorCard>
        </div>
      )}

      {/* CKD-EPI */}
      {tab === "ckd" && (
        <div>
          <CalculatorCard
            title="CKD-EPI"
            onCalculate={handleCkdCalc}
            onReset={handleCkdReset}
            result={ckdResult !== null && (
              <div>TFG: <b>{ckdResult.toFixed(2)}</b> ml/min/1.73 m²</div>
            )}
            onCopy={ckdResult !== null ? () => {
              navigator.clipboard.writeText(`TFG: ${ckdResult.toFixed(2)} ml/min/1.73 m²`);
            } : undefined}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                id="ckd-age"
                label="Edad"
                value={ckd.age}
                onChange={handleCkdChange}
                name="age"
                min={18}
                max={120}
                required
                error={ckdError && !ckd.age ? ckdError : undefined}
              />
              <div>
                <label className="block font-medium mb-1">Sexo</label>
                <select
                  name="sex"
                  value={ckd.sex}
                  onChange={handleCkdChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Sexo"
                >
                  {SEX_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <NumberField
                id="ckd-scr"
                label="Creatinina sérica"
                value={ckd.scr}
                onChange={handleCkdChange}
                name="scr"
                min={0.1}
                required
                error={ckdError && !ckd.scr ? ckdError : undefined}
                unit={unit === "mgdl" ? "mg/dL" : "µmol/L"}
              />
              <div>
                <label className="block font-medium mb-1">Versión</label>
                <select
                  name="version"
                  value={ckd.version}
                  onChange={handleCkdChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Versión"
                >
                  <option value="2021">2021 (sin raza)</option>
                  <option value="2009">2009 (con raza)</option>
                </select>
              </div>
              {ckd.version === "2009" && (
                <div className="md:col-span-2 flex items-center mt-2">
                  <input
                    id="ckd-black"
                    name="black"
                    type="checkbox"
                    checked={ckd.black}
                    onChange={handleCkdChange}
                    className="mr-2"
                  />
                  <label htmlFor="ckd-black" className="text-sm">¿Afrodescendiente?</label>
                </div>
              )}
            </div>
            {ckdError && <div className="text-red-600 text-sm mt-2">{ckdError}</div>}
          </CalculatorCard>
        </div>
      )}

      {/* Mensaje educativo eliminado para evitar duplicado de footer global */}
    </div>
  );
};

export default RenalFunctionPage;

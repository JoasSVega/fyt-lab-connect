// Ruta de la página
export const pathAnthropometric = "/herramientas/antropometricas";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import CalculatorCard from "../components/panels/CalculatorCard";
import NumberField from "../components/inputs/NumberField";

type Sex = "male" | "female";

const sexOptions = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Femenino" },
];

const bmiCategory = (bmi: number): string => {
  if (bmi < 18.5) return "Bajo peso";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Sobrepeso";
  return "Obesidad";
};

const AnthropometricCalculatorsPage: React.FC = () => {
  const navigate = useNavigate();
  // --- IMC ---
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmiAge, setBmiAge] = useState("");
  const [bmiSex, setBmiSex] = useState<Sex>("male");
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiError, setBmiError] = useState("");

  const handleBmiCalc = () => {
    setBmiError("");
    const weight = Number(bmiWeight);
    const heightCm = Number(bmiHeight);
    if (!weight || !heightCm) return setBmiError("Ingrese peso y estatura válidos");
    if (weight < 1 || weight > 500) return setBmiError("Peso válido: 1–500 kg");
    if (heightCm < 30 || heightCm > 300) return setBmiError("Estatura válida: 30–300 cm");
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    setBmiResult(Number(bmi.toFixed(2)));
  };
  const handleBmiReset = () => {
    setBmiWeight("");
    setBmiHeight("");
    setBmiAge("");
    setBmiSex("male");
    setBmiResult(null);
    setBmiError("");
  };
  const handleBmiCopy = () => {
    if (bmiResult !== null) {
      const cat = bmiCategory(bmiResult);
      navigator.clipboard.writeText(`IMC: ${bmiResult} kg/m² (${cat})`);
    }
  };

  // --- BSA ---
  const [bsaWeight, setBsaWeight] = useState("");
  const [bsaHeight, setBsaHeight] = useState("");
  const [bsaDuBois, setBsaDuBois] = useState<number | null>(null);
  const [bsaMosteller, setBsaMosteller] = useState<number | null>(null);
  const [bsaError, setBsaError] = useState("");

  const handleBsaCalc = () => {
    setBsaError("");
    const weight = Number(bsaWeight);
    const height = Number(bsaHeight);
    if (!weight || !height) return setBsaError("Ingrese peso y estatura válidos");
    if (weight < 1 || weight > 500) return setBsaError("Peso válido: 1–500 kg");
    if (height < 30 || height > 300) return setBsaError("Estatura válida: 30–300 cm");
    // DuBois: BSA = 0.007184 × altura^0.725 × peso^0.425 (DuBois & DuBois, 1916)
    const duBois = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
    // Mosteller: BSA = sqrt((altura(cm) * peso(kg))/3600) (Mosteller, 1987)
    const mosteller = Math.sqrt((height * weight) / 3600);
    setBsaDuBois(Number(duBois.toFixed(3)));
    setBsaMosteller(Number(mosteller.toFixed(3)));
  };
  const handleBsaReset = () => {
    setBsaWeight("");
    setBsaHeight("");
    setBsaDuBois(null);
    setBsaMosteller(null);
    setBsaError("");
  };
  const handleBsaCopy = () => {
    if (bsaDuBois !== null || bsaMosteller !== null) {
      navigator.clipboard.writeText(
        `BSA (DuBois): ${bsaDuBois ?? "-"} m²\nBSA (Mosteller): ${bsaMosteller ?? "-"} m²`
      );
    }
  };

  // --- Body Fat % (Deurenberg) ---
  const [bfWeight, setBfWeight] = useState("");
  const [bfHeight, setBfHeight] = useState("");
  const [bfAge, setBfAge] = useState("");
  const [bfSex, setBfSex] = useState<Sex>("male");
  const [bfResult, setBfResult] = useState<number | null>(null);
  const [bfError, setBfError] = useState("");

  const handleBfCalc = () => {
    setBfError("");
    const weight = Number(bfWeight);
    const heightCm = Number(bfHeight);
    const age = Number(bfAge);
    if (!weight || !heightCm || !age) return setBfError("Ingrese peso, estatura y edad válidos");
    if (weight < 1 || weight > 500) return setBfError("Peso válido: 1–500 kg");
    if (heightCm < 30 || heightCm > 300) return setBfError("Estatura válida: 30–300 cm");
    if (age < 5 || age > 120) return setBfError("Edad válida: 5–120 años");
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    // Deurenberg et al., 1991. Sexo: 1=hombre, 0=mujer
    const sexNum = bfSex === "male" ? 1 : 0;
    const bf = 1.20 * bmi + 0.23 * age - 10.8 * sexNum - 5.4;
    setBfResult(Number(bf.toFixed(2)));
  };
  const handleBfReset = () => {
    setBfWeight("");
    setBfHeight("");
    setBfAge("");
    setBfSex("male");
    setBfResult(null);
    setBfError("");
  };
  const handleBfCopy = () => {
    if (bfResult !== null) {
      navigator.clipboard.writeText(`% Grasa corporal: ${bfResult} %`);
    }
  };

  // --- Lean Mass ---
  const [lmWeight, setLmWeight] = useState("");
  const [lmBf, setLmBf] = useState("");
  const [lmResult, setLmResult] = useState<number | null>(null);
  const [lmError, setLmError] = useState("");

  const handleLmCalc = () => {
    setLmError("");
    const weight = Number(lmWeight);
    const bf = Number(lmBf);
    if (!weight && weight !== 0) return setLmError("Ingrese peso válido");
    if (!bf && bf !== 0) return setLmError("Ingrese % grasa corporal válido");
    if (weight < 1 || weight > 500) return setLmError("Peso válido: 1–500 kg");
    if (bf < 0 || bf > 100) return setLmError("% grasa corporal válido: 0–100");
    const lean = weight * (1 - bf / 100);
    setLmResult(Number(lean.toFixed(2)));
  };
  const handleLmReset = () => {
    setLmWeight("");
    setLmBf("");
    setLmResult(null);
    setLmError("");
  };
  const handleLmCopy = () => {
    if (lmResult !== null) {
      navigator.clipboard.writeText(`Masa magra: ${lmResult} kg`);
    }
  };

  // --- Peso ideal (Devine) ---
  const [piHeight, setPiHeight] = useState("");
  const [piSex, setPiSex] = useState<Sex>("male");
  const [piResult, setPiResult] = useState<number | null>(null);
  const [piError, setPiError] = useState("");

  const handlePiCalc = () => {
    setPiError("");
    const heightCm = Number(piHeight);
    if (!heightCm) return setPiError("Ingrese estatura válida");
    if (heightCm < 30 || heightCm > 300) return setPiError("Estatura válida: 30–300 cm");
    // Devine, 1974. Altura en pulgadas
    const heightIn = heightCm / 2.54;
    let ideal = 0;
    if (piSex === "male") {
      ideal = 50 + 2.3 * (heightIn - 60);
    } else {
      ideal = 45.5 + 2.3 * (heightIn - 60);
    }
    setPiResult(Number(ideal.toFixed(2)));
  };
  const handlePiReset = () => {
    setPiHeight("");
    setPiSex("male");
    setPiResult(null);
    setPiError("");
  };
  const handlePiCopy = () => {
    if (piResult !== null) {
      navigator.clipboard.writeText(`Peso ideal (Devine): ${piResult} kg`);
    }
  };

  // --- BMR (Mifflin–St Jeor) ---
  const [bmrWeight, setBmrWeight] = useState("");
  const [bmrHeight, setBmrHeight] = useState("");
  const [bmrAge, setBmrAge] = useState("");
  const [bmrSex, setBmrSex] = useState<Sex>("male");
  const [bmrResult, setBmrResult] = useState<number | null>(null);
  const [bmrError, setBmrError] = useState("");

  const handleBmrCalc = () => {
    setBmrError("");
    const weight = Number(bmrWeight);
    const height = Number(bmrHeight);
    const age = Number(bmrAge);
    if (!weight || !height || !age) return setBmrError("Ingrese peso, estatura y edad válidos");
    if (weight < 1 || weight > 500) return setBmrError("Peso válido: 1–500 kg");
    if (height < 30 || height > 300) return setBmrError("Estatura válida: 30–300 cm");
    if (age < 5 || age > 120) return setBmrError("Edad válida: 5–120 años");
    // Mifflin–St Jeor, 1990
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += bmrSex === "male" ? 5 : -161;
    setBmrResult(Math.round(bmr));
  };
  const handleBmrReset = () => {
    setBmrWeight("");
    setBmrHeight("");
    setBmrAge("");
    setBmrSex("male");
    setBmrResult(null);
    setBmrError("");
  };
  const handleBmrCopy = () => {
    if (bmrResult !== null) {
      navigator.clipboard.writeText(`BMR: ${bmrResult} kcal/día`);
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-2 py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2 text-blue-700 hover:bg-blue-50"
        onClick={() => navigate("/herramientas")}
      >
        <ArrowLeft className="w-5 h-5" /> Volver a Herramientas
      </Button>
      <motion.h1
        className="text-3xl font-bold text-blue-700 mb-6"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Calculadoras Antropométricas
      </motion.h1>

      {/* IMC */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
        <CalculatorCard
          title="Índice de Masa Corporal (IMC)"
          onCalculate={handleBmiCalc}
          onReset={handleBmiReset}
          result={bmiResult !== null && (
            <span>
              IMC: <b>{bmiResult}</b> kg/m² ({bmiCategory(bmiResult)})
            </span>
          )}
          onCopy={bmiResult !== null ? handleBmiCopy : undefined}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberField
              id="bmi-weight"
              label="Peso"
              value={bmiWeight}
              onChange={e => setBmiWeight(e.target.value)}
              name="weight"
              min={1}
              max={500}
              required
              unit="kg"
              error={bmiError && !bmiWeight ? bmiError : undefined}
            />
            <NumberField
              id="bmi-height"
              label="Estatura"
              value={bmiHeight}
              onChange={e => setBmiHeight(e.target.value)}
              name="height"
              min={30}
              max={300}
              required
              unit="cm"
              error={bmiError && !bmiHeight ? bmiError : undefined}
            />
            <NumberField
              id="bmi-age"
              label="Edad (opcional)"
              value={bmiAge}
              onChange={e => setBmiAge(e.target.value)}
              name="age"
              min={5}
              max={120}
              unit="años"
            />
            <div>
              <label htmlFor="bmi-sex" className="block font-medium mb-1">Sexo (opcional)</label>
              <select
                id="bmi-sex"
                name="sex"
                value={bmiSex}
                onChange={e => setBmiSex(e.target.value as Sex)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Sexo"
              >
                {sexOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          {bmiError && <div className="text-red-600 text-sm mt-2">{bmiError}</div>}
        </CalculatorCard>
      </motion.div>

      {/* BSA */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
        <CalculatorCard
          title="Superficie Corporal (BSA)"
          onCalculate={handleBsaCalc}
          onReset={handleBsaReset}
          result={bsaDuBois !== null || bsaMosteller !== null ? (
            <div>
              <div>DuBois: <b>{bsaDuBois}</b> m²</div>
              <div>Mosteller: <b>{bsaMosteller}</b> m²</div>
            </div>
          ) : null}
          onCopy={bsaDuBois !== null || bsaMosteller !== null ? handleBsaCopy : undefined}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberField
              id="bsa-weight"
              label="Peso"
              value={bsaWeight}
              onChange={e => setBsaWeight(e.target.value)}
              name="weight"
              min={1}
              max={500}
              required
              unit="kg"
              error={bsaError && !bsaWeight ? bsaError : undefined}
            />
            <NumberField
              id="bsa-height"
              label="Estatura"
              value={bsaHeight}
              onChange={e => setBsaHeight(e.target.value)}
              name="height"
              min={30}
              max={300}
              required
              unit="cm"
              error={bsaError && !bsaHeight ? bsaError : undefined}
            />
          </div>
          {bsaError && <div className="text-red-600 text-sm mt-2">{bsaError}</div>}
        </CalculatorCard>
      </motion.div>

      {/* % Grasa corporal (Deurenberg) */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.4 }}>
        <CalculatorCard
          title="% Grasa corporal (Deurenberg)"
          onCalculate={handleBfCalc}
          onReset={handleBfReset}
          result={bfResult !== null && (
            <span>% Grasa corporal: <b>{bfResult}</b> %</span>
          )}
          onCopy={bfResult !== null ? handleBfCopy : undefined}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberField
              id="bf-weight"
              label="Peso"
              value={bfWeight}
              onChange={e => setBfWeight(e.target.value)}
              name="weight"
              min={1}
              max={500}
              required
              unit="kg"
              error={bfError && !bfWeight ? bfError : undefined}
            />
            <NumberField
              id="bf-height"
              label="Estatura"
              value={bfHeight}
              onChange={e => setBfHeight(e.target.value)}
              name="height"
              min={30}
              max={300}
              required
              unit="cm"
              error={bfError && !bfHeight ? bfError : undefined}
            />
            <NumberField
              id="bf-age"
              label="Edad"
              value={bfAge}
              onChange={e => setBfAge(e.target.value)}
              name="age"
              min={5}
              max={120}
              required
              unit="años"
              error={bfError && !bfAge ? bfError : undefined}
            />
            <div>
              <label htmlFor="bf-sex" className="block font-medium mb-1">Sexo</label>
              <select
                id="bf-sex"
                name="sex"
                value={bfSex}
                onChange={e => setBfSex(e.target.value as Sex)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Sexo"
              >
                {sexOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          {bfError && <div className="text-red-600 text-sm mt-2">{bfError}</div>}
        </CalculatorCard>
      </motion.div>

      {/* Masa magra */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
        <CalculatorCard
          title="Masa magra (Lean mass)"
          onCalculate={handleLmCalc}
          onReset={handleLmReset}
          result={lmResult !== null && (
            <span>Masa magra: <b>{lmResult}</b> kg</span>
          )}
          onCopy={lmResult !== null ? handleLmCopy : undefined}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberField
              id="lm-weight"
              label="Peso"
              value={lmWeight}
              onChange={e => setLmWeight(e.target.value)}
              name="weight"
              min={1}
              max={500}
              required
              unit="kg"
              error={lmError && !lmWeight ? lmError : undefined}
            />
            <NumberField
              id="lm-bf"
              label="% Grasa corporal"
              value={lmBf}
              onChange={e => setLmBf(e.target.value)}
              name="bf"
              min={0}
              max={100}
              required
              unit="%"
              error={lmError && !lmBf ? lmError : undefined}
            />
          </div>
          {lmError && <div className="text-red-600 text-sm mt-2">{lmError}</div>}
        </CalculatorCard>
      </motion.div>

      {/* Peso ideal (Devine) */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.4 }}>
        <CalculatorCard
          title="Peso ideal (Devine)"
          onCalculate={handlePiCalc}
          onReset={handlePiReset}
          result={piResult !== null && (
            <span>Peso ideal: <b>{piResult}</b> kg <span className="block text-xs text-gray-500">(Devine, 1974)</span></span>
          )}
          onCopy={piResult !== null ? handlePiCopy : undefined}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberField
              id="pi-height"
              label="Estatura"
              value={piHeight}
              onChange={e => setPiHeight(e.target.value)}
              name="height"
              min={30}
              max={300}
              required
              unit="cm"
              error={piError && !piHeight ? piError : undefined}
            />
            <div>
              <label htmlFor="pi-sex" className="block font-medium mb-1">Sexo</label>
              <select
                id="pi-sex"
                name="sex"
                value={piSex}
                onChange={e => setPiSex(e.target.value as Sex)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Sexo"
              >
                {sexOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          {piError && <div className="text-red-600 text-sm mt-2">{piError}</div>}
        </CalculatorCard>
      </motion.div>

      {/* BMR (Mifflin–St Jeor) */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.4 }}>
        <CalculatorCard
          title="Tasa metabólica basal (BMR, Mifflin–St Jeor)"
          onCalculate={handleBmrCalc}
          onReset={handleBmrReset}
          result={bmrResult !== null && (
            <span>BMR: <b>{bmrResult}</b> kcal/día</span>
          )}
          onCopy={bmrResult !== null ? handleBmrCopy : undefined}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberField
              id="bmr-weight"
              label="Peso"
              value={bmrWeight}
              onChange={e => setBmrWeight(e.target.value)}
              name="weight"
              min={1}
              max={500}
              required
              unit="kg"
              error={bmrError && !bmrWeight ? bmrError : undefined}
            />
            <NumberField
              id="bmr-height"
              label="Estatura"
              value={bmrHeight}
              onChange={e => setBmrHeight(e.target.value)}
              name="height"
              min={30}
              max={300}
              required
              unit="cm"
              error={bmrError && !bmrHeight ? bmrError : undefined}
            />
            <NumberField
              id="bmr-age"
              label="Edad"
              value={bmrAge}
              onChange={e => setBmrAge(e.target.value)}
              name="age"
              min={5}
              max={120}
              required
              unit="años"
              error={bmrError && !bmrAge ? bmrError : undefined}
            />
            <div>
              <label htmlFor="bmr-sex" className="block font-medium mb-1">Sexo</label>
              <select
                id="bmr-sex"
                name="sex"
                value={bmrSex}
                onChange={e => setBmrSex(e.target.value as Sex)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Sexo"
              >
                {sexOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          {bmrError && <div className="text-red-600 text-sm mt-2">{bmrError}</div>}
        </CalculatorCard>
      </motion.div>

      <motion.footer
        className="mt-8 text-xs text-gray-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Estas calculadoras son de uso educativo y no reemplazan el juicio profesional.
      </motion.footer>
    </motion.div>
  );
};

export default AnthropometricCalculatorsPage;

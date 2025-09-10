import React, { useState } from "react";
import CalculatorCard from "../components/panels/CalculatorCard";

// Lógica de IMC y SC reutilizada de los componentes existentes

const AnthropometricCalculators: React.FC = () => {
  // IMC
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiError, setBmiError] = useState("");

  const handleBmiCalc = () => {
    setBmiError("");
    const w = Number(bmiWeight);
    const h = Number(bmiHeight) / 100;
    if (!w || !h) return setBmiError("Ingrese peso y estatura válidos");
    if (w <= 0 || h <= 0) return setBmiError("Peso y estatura deben ser mayores a 0");
    setBmi(Number((w / (h * h)).toFixed(2)));
  };
  const handleBmiReset = () => {
    setBmiWeight("");
    setBmiHeight("");
    setBmi(null);
    setBmiError("");
  };

  // SC
  const [bsaWeight, setBsaWeight] = useState("");
  const [bsaHeight, setBsaHeight] = useState("");
  const [bsaDuBois, setBsaDuBois] = useState<number | null>(null);
  const [bsaMosteller, setBsaMosteller] = useState<number | null>(null);
  const [bsaError, setBsaError] = useState("");

  const handleBsaCalc = () => {
    setBsaError("");
    const w = Number(bsaWeight);
    const h = Number(bsaHeight);
    if (!w || !h) return setBsaError("Ingrese peso y estatura válidos");
    if (w <= 0 || h <= 0) return setBsaError("Peso y estatura deben ser mayores a 0");
    // DuBois
    const duBois = 0.007184 * Math.pow(h, 0.725) * Math.pow(w, 0.425);
    // Mosteller
    const mosteller = Math.sqrt((h * w) / 3600);
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

  return (
    <div className="max-w-3xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Calculadoras Antropométricas</h1>
      <CalculatorCard
        title="Índice de Masa Corporal (IMC)"
        onCalculate={handleBmiCalc}
        onReset={handleBmiReset}
        result={bmi !== null && (
          <span>IMC: <b>{bmi}</b> kg/m²</span>
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Peso (kg)</label>
            <input
              type="number"
              min={1}
              value={bmiWeight}
              onChange={e => setBmiWeight(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Estatura (cm)</label>
            <input
              type="number"
              min={1}
              value={bmiHeight}
              onChange={e => setBmiHeight(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
        {bmiError && <div className="text-red-600 text-sm mt-2">{bmiError}</div>}
      </CalculatorCard>

      <CalculatorCard
        title="Superficie Corporal (SC)"
        onCalculate={handleBsaCalc}
        onReset={handleBsaReset}
        result={bsaDuBois !== null || bsaMosteller !== null ? (
          <div>
            <div>DuBois: <b>{bsaDuBois}</b> m²</div>
            <div>Mosteller: <b>{bsaMosteller}</b> m²</div>
          </div>
        ) : null}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Peso (kg)</label>
            <input
              type="number"
              min={1}
              value={bsaWeight}
              onChange={e => setBsaWeight(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Estatura (cm)</label>
            <input
              type="number"
              min={1}
              value={bsaHeight}
              onChange={e => setBsaHeight(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
        {bsaError && <div className="text-red-600 text-sm mt-2">{bsaError}</div>}
      </CalculatorCard>

      <footer className="mt-8 text-xs text-gray-500 text-center">
        Estas calculadoras son de uso educativo y no reemplazan el juicio profesional.
      </footer>
    </div>
  );
};

export default AnthropometricCalculators;

import { useState } from "react";

export default function DosageCalculator() {
  const [weight, setWeight] = useState<number>(0);
  const [dosePerKg, setDosePerKg] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const calculateDose = () => {
    if (weight > 0 && dosePerKg > 0) {
      setResult(weight * dosePerKg);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-600">💊 Calculadora de dosis</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium">Peso del paciente (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full border rounded-md px-3 py-2 mt-1"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Dosis (mg/kg)</label>
        <input
          type="number"
          value={dosePerKg}
          onChange={(e) => setDosePerKg(Number(e.target.value))}
          className="w-full border rounded-md px-3 py-2 mt-1"
        />
      </div>

      <button
        onClick={calculateDose}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Calcular
      </button>

      {result !== null && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
          <p><strong>Resultado:</strong> {result} mg</p>
        </div>
      )}
    </div>
  );
}

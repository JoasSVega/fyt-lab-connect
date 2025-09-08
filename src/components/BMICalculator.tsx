import React, { useState } from "react";

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const isValid = () =>
    !!weight && !!height && Number(weight) > 0 && Number(height) > 0;

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    const w = Number(weight);
    const h = Number(height) / 100; // cm to m
    const bmiValue = w / (h * h);
    setBmi(Number(bmiValue.toFixed(2)));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Calculadora de IMC</h2>
      <form onSubmit={calculate} className="space-y-3">
        <div>
          <label className="block">Peso (kg):</label>
          <input
            type="number"
            min={1}
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Estatura (cm):</label>
          <input
            type="number"
            min={1}
            value={height}
            onChange={e => setHeight(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Calcular
        </button>
      </form>
      {bmi !== null && (
        <div className="mt-4">
          <strong>IMC:</strong> {bmi} kg/m²
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
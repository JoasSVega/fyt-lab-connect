import React, { useState } from "react";

const BSACalculator: React.FC = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bsaDuBois, setBsaDuBois] = useState<number | null>(null);
  const [bsaMosteller, setBsaMosteller] = useState<number | null>(null);

  const isValid = () =>
    !!weight && !!height && Number(weight) > 0 && Number(height) > 0;

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    const w = Number(weight);
    const h = Number(height);

    // DuBois formula: BSA = 0.007184 × Height^0.725 × Weight^0.425
    const duBois = 0.007184 * Math.pow(h, 0.725) * Math.pow(w, 0.425);

    // Mosteller formula: BSA = sqrt([Height(cm) x Weight(kg)]/3600)
    const mosteller = Math.sqrt((h * w) / 3600);

    setBsaDuBois(Number(duBois.toFixed(3)));
    setBsaMosteller(Number(mosteller.toFixed(3)));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Calculadora de Superficie Corporal (BSA)</h2>
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
      {(bsaDuBois !== null || bsaMosteller !== null) && (
        <div className="mt-4">
          <div>
            <strong>DuBois:</strong> {bsaDuBois} m²
          </div>
          <div>
            <strong>Mosteller:</strong> {bsaMosteller} m²
          </div>
        </div>
      )}
    </div>
  );
};

export default BSACalculator;
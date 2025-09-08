import React, { useState } from "react";

const GFRCalculator: React.FC = () => {
  const [age, setAge] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [sex, setSex] = useState("male");
  const [race, setRace] = useState("other");
  const [resultMDRD, setResultMDRD] = useState<number | null>(null);
  const [resultCKDEPI, setResultCKDEPI] = useState<number | null>(null);

  const isValid = () =>
    !!age && !!creatinine && Number(age) > 0 && Number(creatinine) > 0;

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    const ageNum = Number(age);
    const crNum = Number(creatinine);

    // MDRD formula (simplified, for adults)
    let mdrd =
      175 *
      Math.pow(crNum, -1.154) *
      Math.pow(ageNum, -0.203) *
      (sex === "female" ? 0.742 : 1) *
      (race === "black" ? 1.212 : 1);

    // CKD-EPI formula (simplified)
    let k = sex === "female" ? 0.7 : 0.9;
    let a = sex === "female" ? -0.329 : -0.411;
    let min = Math.min(crNum / k, 1);
    let max = Math.max(crNum / k, 1);
    let ckdepi =
      141 *
      Math.pow(min, a) *
      Math.pow(max, -1.209) *
      Math.pow(0.993, ageNum) *
      (sex === "female" ? 1.018 : 1) *
      (race === "black" ? 1.159 : 1);

    setResultMDRD(Number(mdrd.toFixed(2)));
    setResultCKDEPI(Number(ckdepi.toFixed(2)));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Calculadora de TFG (MDRD y CKD-EPI)</h2>
      <form onSubmit={calculate} className="space-y-3">
        <div>
          <label className="block">Edad (años):</label>
          <input
            type="number"
            min={1}
            value={age}
            onChange={e => setAge(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Creatinina sérica (mg/dL):</label>
          <input
            type="number"
            min={0.1}
            step={0.01}
            value={creatinine}
            onChange={e => setCreatinine(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Sexo:</label>
          <select
            value={sex}
            onChange={e => setSex(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>
        <div>
          <label className="block">Raza:</label>
          <select
            value={race}
            onChange={e => setRace(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="other">Otra</option>
            <option value="black">Afrodescendiente</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Calcular
        </button>
      </form>
      {(resultMDRD !== null || resultCKDEPI !== null) && (
        <div className="mt-4">
          <div>
            <strong>MDRD:</strong> {resultMDRD} mL/min/1.73m²
          </div>
          <div>
            <strong>CKD-EPI:</strong> {resultCKDEPI} mL/min/1.73m²
          </div>
        </div>
      )}
    </div>
  );
};

export default GFRCalculator;
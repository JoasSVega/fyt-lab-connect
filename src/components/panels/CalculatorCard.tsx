import React from "react";

interface CalculatorCardProps {
  title: string;
  children: React.ReactNode;
  onCalculate: () => void;
  onReset: () => void;
  canCalculate: boolean;
  result?: React.ReactNode;
  onCopy?: () => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  children,
  onCalculate,
  onReset,
  canCalculate,
  result,
  onCopy,
}) => (
  <div className="bg-white rounded-2xl shadow p-6 w-full max-w-xl mx-auto mb-8">
    <h2 className="text-xl font-bold mb-4 text-blue-700">{title}</h2>
    <form
      onSubmit={e => {
        e.preventDefault();
        if (canCalculate) onCalculate();
      }}
      className="space-y-2"
      autoComplete="off"
    >
      {children}
      <div className="flex space-x-2 mt-4">
        <button
          type="submit"
          className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50`}
          disabled={!canCalculate}
        >
          Calcular
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition"
          onClick={onReset}
        >
          Resetear
        </button>
        {result && onCopy && (
          <button
            type="button"
            className="ml-auto px-4 py-2 rounded bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
            onClick={onCopy}
          >
            Copiar resultado
          </button>
        )}
      </div>
    </form>
    {result && (
      <div className="mt-4 p-4 bg-blue-50 rounded text-blue-900 text-center text-lg font-semibold">
        {result}
      </div>
    )}
  </div>
);

export default CalculatorCard;

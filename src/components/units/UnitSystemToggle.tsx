import React from "react";

export type UnitSystem = "mgdl" | "umoll";

interface UnitSystemToggleProps {
  value: UnitSystem;
  onChange: (value: UnitSystem) => void;
}

const UnitSystemToggle: React.FC<UnitSystemToggleProps> = ({ value, onChange }) => (
  <div className="flex items-center space-x-2">
    <button
      type="button"
      className={`px-3 py-1 rounded-l-full border border-blue-500 focus:outline-none transition-colors ${
        value === "mgdl"
          ? "bg-blue-500 text-white"
          : "bg-white text-blue-500 hover:bg-blue-50"
      }`}
      onClick={() => onChange("mgdl")}
      aria-pressed={value === "mgdl"}
    >
      Convencional (mg/dL)
    </button>
    <button
      type="button"
      className={`px-3 py-1 rounded-r-full border border-blue-500 focus:outline-none transition-colors -ml-px ${
        value === "umoll"
          ? "bg-blue-500 text-white"
          : "bg-white text-blue-500 hover:bg-blue-50"
      }`}
      onClick={() => onChange("umoll")}
      aria-pressed={value === "umoll"}
    >
      Internacional (µmol/L)
    </button>
  </div>
);

export default UnitSystemToggle;

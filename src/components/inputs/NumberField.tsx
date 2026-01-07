import React from "react";

interface NumberFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
}

const NumberField: React.FC<NumberFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  unit,
  min,
  max,
  step = "any",
  help,
  error,
  required,
  disabled,
  name,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block font-medium mb-1">
      {label}
      {unit && <span className="ml-2 text-sm text-gray-500">({unit})</span>}
    </label>
    <input
      id={id}
  name={name}
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      required={required}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {help && !error && <div className="text-xs text-gray-500 mt-1">{help}</div>}
    {error && <div id={`${id}-error`} className="text-xs text-red-600 mt-1">{error}</div>}
  </div>
);

export default NumberField;

import * as React from "react";

export type SelectOption = { value: string; label: string };

type Props = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  name?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
};

const baseClass =
  "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 " +
  "border-gray-300 bg-white";

const SelectField: React.FC<Props> = ({
  id,
  value,
  onChange,
  label,
  name,
  options,
  placeholder,
  required,
  disabled,
  ariaLabel,
  className,
}) => {
  return (
    <div className="mb-4">
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
      ) : null}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`${baseClass} ${className || ""}`}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

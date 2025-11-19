import * as React from 'react';
import CalculatorModal, { FieldSpec, CalculationResult } from '@/components/calculators/CalculatorModal';
import { Dumbbell } from 'lucide-react';
import { CalculatorsRegistry } from '@/lib/calculators';
import { motion } from 'framer-motion';
import { makeFadeScale, durations } from '@/animations';

// Pilot Hybrid IMC (BMI) Calculator using panelRender bridging into CalculatorModal state.
// Fields: peso (kg), talla (cm)

const imcFields: ReadonlyArray<FieldSpec> = [
  { name: 'peso', label: 'Peso', type: 'number', unit: 'kg', placeholder: '70', validation: { required: true, min: 1, max: 400 } },
  { name: 'talla', label: 'Talla', type: 'number', unit: 'cm', placeholder: '170', validation: { required: true, min: 30, max: 300 } },
];

function computeImc(values: Record<string, unknown>): CalculationResult {
  const peso = Number(values.peso);
  const tallaCm = Number(values.talla);
  if (!Number.isFinite(peso) || !Number.isFinite(tallaCm) || tallaCm <= 0) {
    return { value: '—', interpretation: 'Datos inválidos' };
  }
  const tallaM = tallaCm / 100;
  const imc = +(peso / (tallaM * tallaM)).toFixed(2);
  let severity: CalculationResult['severity'] = 'green';
  let interpretation = 'Peso saludable';
  if (imc < 18.5) { severity = 'yellow'; interpretation = 'Bajo peso'; }
  else if (imc >= 25 && imc < 30) { severity = 'yellow'; interpretation = 'Sobrepeso'; }
  else if (imc >= 30) { severity = 'red'; interpretation = 'Obesidad'; }
  return { value: imc, unit: 'kg/m²', interpretation, severity };
}

// Stable panel component (memoized) with animation variants
const ImcPanel: React.FC<{ fields: ReadonlyArray<FieldSpec>; values: Record<string, unknown>; onInput: (n:string,v:unknown)=>void; error: string; onCalculate: ()=>void; onClear: ()=>void; }> = React.memo(({ fields, values, onInput, error, onCalculate, onClear }) => {
  return (
    <motion.div variants={makeFadeScale(0, durations.fast, 0.98)} initial="hidden" animate="visible" className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(f => (
          <motion.div key={f.name} variants={makeFadeScale(0, durations.fast, 0.98)} initial="hidden" animate="visible" className="flex flex-col gap-1">
            <label htmlFor={`imc-${f.name}`} className="text-sm font-medium">{f.label} {f.unit && <span className="text-slate-500">({f.unit})</span>}</label>
            <input
              id={`imc-${f.name}`}
              type="text"
              inputMode="decimal"
              className="w-full rounded-md border px-3 py-2"
              placeholder={f.placeholder}
              value={typeof values[f.name] === 'number' || typeof values[f.name] === 'string' ? String(values[f.name]) : ''}
              onChange={e => onInput(f.name, e.target.value)}
            />
          </motion.div>
        ))}
      </div>
      {error && <div className="mt-3 text-sm text-rose-600" role="alert">{error}</div>}
      <div className="mt-5 flex items-center gap-3">
        <button type="button" onClick={onCalculate} className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-semibold">Calcular</button>
        <button type="button" onClick={onClear} className="px-4 py-2 rounded-md border">Limpiar</button>
      </div>
    </motion.div>
  );
});
ImcPanel.displayName = 'ImcPanel';

const ImcHybridCalculator: React.FC<{ open?: boolean; onOpenChange?: (v:boolean)=>void; categoryColor?: string; }> = ({ open, onOpenChange, categoryColor }) => {
  return (
    <CalculatorModal
      id="calc-bmi-hybrid"
      title={CalculatorsRegistry.bmi.title}
      subtitle={CalculatorsRegistry.bmi.subtitle}
      icon={<Dumbbell className="w-6 h-6" style={{ color: categoryColor || CalculatorsRegistry.bmi.color }} />}
      fields={imcFields}
      formulas={CalculatorsRegistry.bmi.formulas}
      onCalculate={(vals) => computeImc(vals)}
      open={open}
      onOpenChange={onOpenChange}
      legacyForm={false}
      categoryColor={categoryColor || CalculatorsRegistry.bmi.color}
      panelRender={({ fields, values, onInput, error, onCalculate, onClear }) => (
        <ImcPanel fields={fields} values={values} onInput={onInput} error={error} onCalculate={onCalculate} onClear={onClear} />
      )}
    />
  );
};

export default ImcHybridCalculator;

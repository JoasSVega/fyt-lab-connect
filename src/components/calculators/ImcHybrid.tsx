import * as React from 'react';
import CalculatorModal, { FieldSpec, CalculationResult } from '@/components/calculators/CalculatorModal';
import { Dumbbell } from 'lucide-react';

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

// Render prop panel: simple grid replicating core panel layout
const ImcPanel: React.FC<{ ctx: { fields: ReadonlyArray<FieldSpec>; values: Record<string, unknown>; onInput: (n:string,v:unknown)=>void; error: string; onCalculate: ()=>void; onClear: ()=>void; flipped: boolean; } }> = ({ ctx }) => {
  const { fields, values, onInput, error, onCalculate, onClear } = ctx;
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.name} className="flex flex-col gap-1">
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
          </div>
        ))}
      </div>
      {error && <div className="mt-3 text-sm text-rose-600">{error}</div>}
      <div className="mt-5 flex items-center gap-3">
        <button type="button" onClick={onCalculate} className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-semibold">Calcular</button>
        <button type="button" onClick={onClear} className="px-4 py-2 rounded-md border">Limpiar</button>
      </div>
    </div>
  );
};

const ImcHybridCalculator: React.FC<{ open?: boolean; onOpenChange?: (v:boolean)=>void; }> = ({ open, onOpenChange }) => {
  return (
    <CalculatorModal
      id="imc"
      title="Índice de Masa Corporal"
      subtitle="Evaluación antropométrica básica"
      icon={<Dumbbell className="w-6 h-6 text-sky-600" />}
      fields={imcFields}
      onCalculate={(vals) => computeImc(vals)}
      open={open}
      onOpenChange={onOpenChange}
      legacyForm={false}
      panelRender={({ fields, values, onInput, error, onCalculate, onClear, flipped }) => (
        <ImcPanel ctx={{ fields, values, onInput, error, onCalculate, onClear, flipped }} />
      )}
    />
  );
};

export default ImcHybridCalculator;

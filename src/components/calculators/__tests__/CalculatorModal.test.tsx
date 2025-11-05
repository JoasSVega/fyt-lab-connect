import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import CalculatorModal, { FieldSpec, FormulaSpec } from '@/components/calculators/CalculatorModal';

const fields: ReadonlyArray<FieldSpec> = [
  { name: 'weight', label: 'Peso', type: 'number', unit: 'kg', validation: { required: true, min: 20, max: 300 } },
  { name: 'height', label: 'Talla', type: 'number', unit: 'cm', validation: { required: true, min: 100, max: 250 } },
];

const formulas: ReadonlyArray<FormulaSpec> = [
  {
    id: 'bmi',
    label: 'IMC',
    expressionLatex: String.raw`\\mathrm{IMC}=\\frac{\\text{peso}}{(\\tfrac{\\text{talla}}{100})^{2}}`,
    compute: (values) => {
      const w = Number(values.weight);
      const h = Number(values.height) / 100;
      const v = w / (h * h);
      return { value: Number(v.toFixed(2)), unit: 'kg/m²' };
    },
    fields: [
      { name: 'weight', label: 'Peso', type: 'number', unit: 'kg', validation: { required: true, min: 20, max: 300 } },
      { name: 'height', label: 'Talla', type: 'number', unit: 'cm', validation: { required: true, min: 100, max: 250 } },
    ]
  },
  {
    id: 'onlyWeight',
    label: 'Sólo peso',
    expressionLatex: String.raw`x=\\text{peso}`,
    compute: (values) => ({ value: Number(values.weight) || 0, unit: 'u' }),
    fields: [
      { name: 'weight', label: 'Peso', type: 'number', unit: 'kg', validation: { required: true, min: 20, max: 300 } },
    ]
  }
];

describe('CalculatorModal', () => {
  it('permite calcular y limpiar', async () => {
    const Wrapper = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <CalculatorModal id="test-bmi" open={open} onOpenChange={setOpen} title="IMC" fields={fields} formulas={formulas} />
      );
    };
    render(<Wrapper />);

    const peso = screen.getByLabelText('Peso');
    const talla = screen.getByLabelText('Talla');
    fireEvent.change(peso, { target: { value: '70' } });
    fireEvent.change(talla, { target: { value: '170' } });
    fireEvent.click(screen.getByText('Calcular'));

  const unidad = await screen.findByText(/kg\/m²/);
  expect(unidad).toBeTruthy();

  // Con render condicional, primero volvemos al frente y luego limpiamos
  fireEvent.click(screen.getByText('Volver'));
  const btnLimpiar = await screen.findByText('Limpiar');
  fireEvent.click(btnLimpiar);
  // Re-query inputs after re-render to avoid stale element references
  const peso2 = await screen.findByLabelText('Peso');
  const talla2 = await screen.findByLabelText('Talla');
  expect((peso2 as HTMLInputElement).value).toBe('');
  expect((talla2 as HTMLInputElement).value).toBe('');

    // Abre modal de fórmulas y verifica renderizado KaTeX sin duplicados en texto
    fireEvent.click(screen.getByLabelText('Ver fórmulas'));
  const fItem = await screen.findByTestId('formula-item-1');
  expect(fItem).toBeTruthy();
  // Debe mostrar KaTeX y no el placeholder
  expect(screen.queryByText('Fórmula no disponible')).toBeNull();

    // Cambiar de fórmula debe ocultar variables no requeridas y reinicializar valores
  const closeBtns = screen.getAllByLabelText('Cerrar');
  fireEvent.click(closeBtns[closeBtns.length - 1]);
  const selector = screen.getByLabelText('Seleccionar fórmula') as HTMLSelectElement;
    fireEvent.change(selector, { target: { value: 'onlyWeight' } });
    // "Talla" debe ocultarse
  expect(screen.queryByLabelText('Talla')).toBeNull();
    // El primer input debe estar vacío tras reinicializar
    const peso3 = await screen.findByLabelText('Peso');
    expect((peso3 as HTMLInputElement).value).toBe('');
  });
});

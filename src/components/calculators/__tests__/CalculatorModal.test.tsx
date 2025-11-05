import { render, screen, fireEvent } from '@testing-library/react';
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
    compute: (values) => {
      const w = Number(values.weight);
      const h = Number(values.height) / 100;
      const v = w / (h * h);
      return { value: Number(v.toFixed(2)), unit: 'kg/m²' };
    },
  },
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

    expect(await screen.findByText(/kg\/m²/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Limpiar'));
    expect((peso as HTMLInputElement).value).toBe('');
    expect((talla as HTMLInputElement).value).toBe('');
  });
});

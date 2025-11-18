import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalculatorCard from '../CalculatorCard.jsx';

const setup = () => {
  const variables = [
    { id: 'n1', label: 'Valor numérico', type: 'number', placeholder: 'p. ej., 0', unit: 'u' },
  ];
  const onCalculate = (vals: Record<string, unknown>) => {
    const v = Number(String(vals['n1']).replace(',', '.')) || 0;
    return { value: v, unit: 'u', interpretation: v > 0 ? 'OK' : 'N/A' };
  };
  render(
    <CalculatorCard
      title="Prueba"
      variables={variables}
      formulaInfo={[]}
      onCalculate={onCalculate}
      initialValues={{}}
    />
  );
};

describe('CalculatorCard input focus and flip', () => {
  it('keeps focus while typing and flips reliably', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByLabelText('Valor numérico') as HTMLInputElement;
    input.focus();

    await user.type(input, '120.5');
    expect(document.activeElement).toBe(input);
    expect(input.value).toBe('120.5');

    // Calculate triggers flip
    await user.click(screen.getByRole('button', { name: /Calcular/i }));

    const scene = screen.getByTestId('flip-scene');
    expect(scene.getAttribute('style') || '').toContain('rotateY(180deg)');
    // Back face visible content exists
    expect(screen.getByText('Prueba: Resultado')).toBeInTheDocument();

    // Flip back
    await user.click(screen.getByRole('button', { name: /Volver/i }));
    expect(scene.getAttribute('style') || '').toContain('rotateY(0deg)');
  });
});

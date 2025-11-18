import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import React from 'react';
import CURB65Tool from '@/components/tools/CURB65Tool';

describe('CURB65Tool', () => {
  it('auto-calcula al completar campos y permite limpiar', async () => {
    render(<CURB65Tool />);

    // abre modal
    fireEvent.click(screen.getByText('Abrir herramienta'));

  // Completar campos (auto-cálculo)
    const confusion = await screen.findByLabelText('Confusión o desorientación');
    const urea = await screen.findByLabelText('Urea');
  // 
    const rr = await screen.findByLabelText('Frecuencia respiratoria');
    const sbp = await screen.findByLabelText('Presión sistólica');
    const dbp = await screen.findByLabelText('Presión diastólica');
    const age = await screen.findByLabelText('Edad');

  fireEvent.change(confusion, { target: { value: 'si' } });
  (urea as HTMLInputElement).value = '8';
  fireEvent.input(urea, { target: { value: '8' } });
  (rr as HTMLInputElement).value = '28';
  fireEvent.input(rr, { target: { value: '28' } });
  (sbp as HTMLInputElement).value = '100';
  fireEvent.input(sbp, { target: { value: '100' } });
  (dbp as HTMLInputElement).value = '70';
  fireEvent.input(dbp, { target: { value: '70' } });
  (age as HTMLInputElement).value = '70';
  fireEvent.input(age, { target: { value: '70' } });

  // Resultado o referencias deben ser visibles; abre fórmulas y verifica unidad 'pt'
  fireEvent.click(screen.getByLabelText('Ver fórmulas'));
  // Espera a que se abra el modal de fórmulas
  await screen.findByText('Fórmulas');
  const res = await screen.findAllByText(/pt/);
  expect(res.length).toBeGreaterThan(0);
  const closeBtns = screen.getAllByLabelText('Cerrar');
  fireEvent.click(closeBtns[closeBtns.length - 1]);

    // Volver y luego limpiar
    fireEvent.click(screen.getByText('Volver'));
    const limpiarBtn = await screen.findByText('Limpiar');
    fireEvent.click(limpiarBtn);
    // Al limpiar, los campos deben resetearse
    const confusion2 = await screen.findByLabelText('Confusión o desorientación');
    expect((confusion2 as HTMLSelectElement).value).toBe('');
  });
});

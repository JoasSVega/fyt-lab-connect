import { render, screen, fireEvent } from '@testing-library/react';
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
    const rr = await screen.findByLabelText('Frecuencia respiratoria');
    const sbp = await screen.findByLabelText('Presión sistólica');
    const dbp = await screen.findByLabelText('Presión diastólica');
    const age = await screen.findByLabelText('Edad');

    fireEvent.change(confusion, { target: { value: 'si' } });
    fireEvent.change(urea, { target: { value: '8' } });
    fireEvent.change(rr, { target: { value: '28' } });
    fireEvent.change(sbp, { target: { value: '100' } });
    fireEvent.change(dbp, { target: { value: '70' } });
    fireEvent.change(age, { target: { value: '70' } });

    // Resultado debe aparecer automáticamente
    const res = await screen.findByText(/pt/);
    expect(res).toBeTruthy();

    // Volver y luego limpiar
    fireEvent.click(screen.getByText('Volver'));
    const limpiarBtn = await screen.findByText('Limpiar');
    fireEvent.click(limpiarBtn);
    // Al limpiar, los campos deben resetearse
    const confusion2 = await screen.findByLabelText('Confusión o desorientación');
    expect((confusion2 as HTMLSelectElement).value).toBe('');
  });
});

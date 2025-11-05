import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import HASBLEDTool from '@/components/tools/HASBLEDTool';

describe('HAS-BLED Tool', () => {
  it('calcula con botones y permite limpiar', async () => {
    render(<HASBLEDTool />);

    fireEvent.click(screen.getByText('Abrir herramienta'));

    // Seleccionar Sí/No en algunos ítems (auto-cálculo)
    fireEvent.change(await screen.findByLabelText('Hipertensión (PA sistólica > 160 mmHg)'), { target: { value: 'si' } });
    fireEvent.change(await screen.findByLabelText('ACV previo'), { target: { value: 'si' } });
    fireEvent.change(await screen.findByLabelText('Edad > 65 años'), { target: { value: 'si' } });
    fireEvent.change(await screen.findByLabelText('Función hepática alterada'), { target: { value: 'no' } });
    fireEvent.change(await screen.findByLabelText('Función renal alterada'), { target: { value: 'no' } });
    fireEvent.change(await screen.findByLabelText('Historia de sangrado o predisposición'), { target: { value: 'no' } });
    fireEvent.change(await screen.findByLabelText('INR lábil / TTR bajo'), { target: { value: 'no' } });
    fireEvent.change(await screen.findByLabelText('Fármacos predisponentes'), { target: { value: 'no' } });
    fireEvent.change(await screen.findByLabelText('Consumo de alcohol'), { target: { value: 'no' } });

  // Debe auto-calcular y voltear
  expect(await screen.findByText(/pt/)).toBeTruthy();

  // Volver y limpiar en el frontal
  fireEvent.click(screen.getByText('Volver'));
  const limpiar = await screen.findByText('Limpiar');
  fireEvent.click(limpiar);

    // Después de limpiar, el checkbox debe estar false
    const htn = await screen.findByLabelText('Hipertensión (PA sistólica > 160 mmHg)') as HTMLSelectElement;
    expect(htn.value).toBe('');
  });
});

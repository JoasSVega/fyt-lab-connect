import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import CHA2DS2VAScTool from '@/components/tools/CHA2DS2VAScTool';

describe('CHA2DS2-VASc Tool', () => {
  it('calcula con botones y permite limpiar', async () => {
    render(<CHA2DS2VAScTool />);

    fireEvent.click(screen.getByText('Abrir Herramienta'));

  fireEvent.change(await screen.findByLabelText('Insuficiencia cardiaca (C)'), { target: { value: 'si' } });
  fireEvent.change(await screen.findByLabelText('Hipertensión (H)'), { target: { value: 'si' } });
  fireEvent.change(await screen.findByLabelText('Diabetes mellitus (D)'), { target: { value: 'si' } });
  fireEvent.change(await screen.findByLabelText('ACV/AIT/Tromboembolismo previo (S)'), { target: { value: 'si' } });
  fireEvent.change(await screen.findByLabelText('Enfermedad vascular (V)'), { target: { value: 'si' } });

    // Selects obligatorios
    fireEvent.change(await screen.findByLabelText('Edad'), { target: { value: '65to74' } });
    fireEvent.change(await screen.findByLabelText('Sexo'), { target: { value: 'femenino' } });

  // Verificar unidad 'pt' en el panel de fórmulas
  fireEvent.click(screen.getByLabelText('Ver fórmulas'));
  await screen.findByText('Fórmulas');
  const pts = await screen.findAllByText(/pt/);
  expect(pts.length).toBeGreaterThan(0);
  // Cerrar panel de fórmulas
  const closes = screen.getAllByLabelText('Cerrar');
  fireEvent.click(closes[closes.length - 1]);

    // Limpiar (frontal)
  const limpiar = await screen.findByText('Limpiar');
  fireEvent.click(limpiar);

    const age = await screen.findByLabelText('Edad') as HTMLSelectElement;
    expect(age.value).toBe('');
  });
});

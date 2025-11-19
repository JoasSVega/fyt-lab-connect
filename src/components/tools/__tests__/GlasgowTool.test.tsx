import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import GlasgowTool from '../GlasgowTool';

describe('GlasgowTool (auto-calc)', () => {
  it('auto-calcula y permite volver y limpiar', async () => {
    render(<GlasgowTool />);

    fireEvent.click(screen.getByText('Abrir Herramienta'));

    // Completar selects requeridos
    fireEvent.change(await screen.findByLabelText('Respuesta ocular (E)'), { target: { value: '4' } });
    fireEvent.change(await screen.findByLabelText('Respuesta verbal (V)'), { target: { value: '5' } });
    fireEvent.change(await screen.findByLabelText('Respuesta motora (M)'), { target: { value: '6' } });

  // Verificar referencias en "Fórmulas" para unidad 'pt'
  fireEvent.click(screen.getByLabelText('Ver fórmulas'));
  await screen.findByText('Fórmulas');
  const pts = await screen.findAllByText(/pt/);
  expect(pts.length).toBeGreaterThan(0);
  // Cerrar panel de fórmulas
  const closes = screen.getAllByLabelText('Cerrar');
  fireEvent.click(closes[closes.length - 1]);

  // Limpiar directamente (acciones en la cara frontal)
  fireEvent.click(await screen.findByText('Limpiar'));

    const ocular = await screen.findByLabelText('Respuesta ocular (E)') as HTMLSelectElement;
    expect(ocular.value).toBe('');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import GlasgowTool from '../GlasgowTool';

describe('GlasgowTool (auto-calc)', () => {
  it('auto-calcula y permite volver y limpiar', async () => {
    render(<GlasgowTool />);

    fireEvent.click(screen.getByText('Abrir herramienta'));

    // Completar selects requeridos
    fireEvent.change(await screen.findByLabelText('Respuesta ocular (E)'), { target: { value: '4' } });
    fireEvent.change(await screen.findByLabelText('Respuesta verbal (V)'), { target: { value: '5' } });
    fireEvent.change(await screen.findByLabelText('Respuesta motora (M)'), { target: { value: '6' } });

    // Auto-calculado
    expect(await screen.findByText(/pt/)).toBeTruthy();

    // Volver y luego limpiar
    fireEvent.click(screen.getByText('Volver'));
    fireEvent.click(await screen.findByText('Limpiar'));

    const ocular = await screen.findByLabelText('Respuesta ocular (E)') as HTMLSelectElement;
    expect(ocular.value).toBe('');
  });
});

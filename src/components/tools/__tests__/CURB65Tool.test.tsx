import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import CURB65Tool from '@/components/tools/CURB65Tool';

describe('CURB65Tool (auto-calc)', () => {
  it('auto-calcula y permite volver y limpiar', async () => {
    render(<CURB65Tool />);

    // abre modal
    fireEvent.click(screen.getByText('Abrir herramienta'));

    // Completar campos
    fireEvent.change(await screen.findByLabelText('Confusión o desorientación'), { target: { value: 'si' } });
    fireEvent.change(await screen.findByLabelText('Urea'), { target: { value: '8' } });
    fireEvent.change(await screen.findByLabelText('Frecuencia respiratoria'), { target: { value: '28' } });
    fireEvent.change(await screen.findByLabelText('Presión sistólica'), { target: { value: '100' } });
    fireEvent.change(await screen.findByLabelText('Presión diastólica'), { target: { value: '70' } });
    fireEvent.change(await screen.findByLabelText('Edad'), { target: { value: '70' } });

    // Auto-calculado
    expect(await screen.findByText(/pt/)).toBeTruthy();

    // Volver y limpiar
    fireEvent.click(screen.getByText('Volver'));
    fireEvent.click(await screen.findByText('Limpiar'));
    const age = await screen.findByLabelText('Edad') as HTMLInputElement;
    expect(age.value).toBe('');
  });
});

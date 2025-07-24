import { render, screen, fireEvent } from '@testing-library/react';
import normalizeToSharp from './utils/normalizeToSharp';
import type { tChord } from './PianoBase/PianoBase.types';
import App from './App';
import '@testing-library/jest-dom';

describe('App', () => {
  test('renderiza la tabla de modos con todos los botones y descripciones', () => {
    render(<App />);
    expect(screen.getByText('Modo')).toBeInTheDocument();
    expect(screen.getByText('Descripcion')).toBeInTheDocument();
    expect(screen.getByText('Notas')).toBeInTheDocument();

    [
      'Normal',
      'Ionian',
      'Dorian',
      'Phrygian',
      'Lydian',
      'Mixolydian',
      'Aeolian',
      'Locrian'
    ].forEach(mode => {
      expect(screen.getAllByRole('button', {
        name: new RegExp(mode, 'i')
      }).length).toBeGreaterThan(0);
    });

    expect(screen.getByText(/Escala mayor natural, base tonal./i)).toBeInTheDocument();
    expect(screen.getByText(/Menor con 6ta mayor brillante./i)).toBeInTheDocument();
    expect(screen.getByText(/Menor exótico, 2da menor tensa./i)).toBeInTheDocument();
    expect(screen.getByText(/Mayor soñador, 4ta aumentada./i)).toBeInTheDocument();
    expect(screen.getByText(/Mayor bluesy, 7ma menor./i)).toBeInTheDocument();
    expect(screen.getByText(/Menor natural, base melancólica./i)).toBeInTheDocument();
    expect(screen.getByText(/Semidisminuido, 2da menor, 5ta b./i)).toBeInTheDocument();
  });

  test('al hacer click en los botones de modos, cambia las notas resaltadas en el piano', () => {
    render(<App />);
    const piano = screen.getByTestId('piano-base');

    // Click en Ionian
    fireEvent.click(screen.getByRole('button', { name: /Ionian/i }));
    const ionianNotes: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
    ionianNotes.forEach(note => {
      const key = piano.querySelector(`[data-note="${note}"]`);
      expect(key).not.toBeNull();
      expect(key).toHaveClass('highlight-group-1');
    });

    // Click en Locrian
    fireEvent.click(screen.getByRole('button', { name: /Locrian/i }));
    const locrianNotes: tChord = ['D5', 'Eb5', 'F5', 'G5', 'Ab5', 'Bb5', 'C6', 'D6'];
    const normalizedLocrianNotes = normalizeToSharp(locrianNotes);
    normalizedLocrianNotes.forEach(note => {
      const key = piano.querySelector(`[data-note="${note}"]`);
      expect(key).not.toBeNull();
      expect(key).toHaveClass('highlight-group-1');
    });

  });
});
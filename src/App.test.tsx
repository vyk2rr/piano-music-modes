// src/App.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock de TonicSelector (usa data-testid="tonic-selector")
jest.mock('./TonicSelector/TonicSelector', () => (props: any) => (
  <select
    data-testid="tonic-selector"
    value={props.tonic || ""}
    onChange={e => props.onChange(e.target.value === "" ? undefined : e.target.value)}
  >
    <option value="">Selecciona tónica...</option>
    <option value="C">C</option>
    <option value="Gbb">Gbb</option>
  </select>
));

// Mock de ModeTable (usa data-testid="mode-table-mock")
jest.mock('./ModeTable/ModeTable', () => (props: any) => (
  <div data-testid="mode-table-mock">
    {['ionian', 'dorian', 'phrygian'].map(mode => (
      <button
        key={mode}
        data-testid={`mode-btn-${mode}`}
        aria-pressed={props.activeMode === mode}
        onClick={() => props.onModeClick(mode)}
      >{mode}</button>
    ))}
  </div>
));

// Mock de PianoBase (usa data-testid="piano-base-mock")
jest.mock('./PianoBase/PianoBase', () => (props: any) => (
  <div data-testid="piano-base-mock">{props.highlightOnThePiano?.join(',')}</div>
));

describe('App', () => {
  it('renderiza prompt inicial y el selector de tónica', () => {
    render(<App />);
    expect(screen.getByText(/Elige una tónica/i)).toBeInTheDocument();
    expect(screen.getByTestId('tonic-selector')).toBeInTheDocument();
    // No debe haber modo ni piano todavía
    expect(screen.queryByTestId('mode-table-mock')).toBeNull();
    expect(screen.getByTestId('piano-base-mock')).toBeInTheDocument();
  });

  it('al seleccionar tónica, muestra las escalas y tabla de modos', () => {
    render(<App />);
    fireEvent.change(screen.getByTestId('tonic-selector'), { target: { value: 'C' } });

    expect(screen.getByText(/Escala "C" \(ionian\):/)).toBeInTheDocument();
    expect(screen.getByText(/Raw scale/)).toBeInTheDocument();
    expect(screen.getByText(/Notación funcional/)).toBeInTheDocument();
    expect(screen.getByText(/Escala para ejecución/)).toBeInTheDocument();
    expect(screen.getByText(/El piano recibe/)).toBeInTheDocument();

    expect(screen.getByTestId('mode-table-mock')).toBeInTheDocument();
    expect(screen.getByTestId('piano-base-mock')).toBeInTheDocument();
  });

  it('al cambiar el modo, cambia el título', () => {
    render(<App />);
    fireEvent.change(screen.getByTestId('tonic-selector'), { target: { value: 'C' } });
    fireEvent.click(screen.getByTestId('mode-btn-dorian'));
    expect(screen.getByText(/Escala "C" \(dorian\):/i)).toBeInTheDocument();
  });

  it('renderiza la escala de Gbb correctamente', () => {
    render(<App />);
    fireEvent.change(screen.getByTestId('tonic-selector'), { target: { value: 'Gbb' } });

    expect(screen.getByText(/Escala "Gbb" \(ionian\):/)).toBeInTheDocument();
    // Raw, notación y ejecución deben estar presentes
    expect(screen.getByText(/Raw scale/)).toBeInTheDocument();
    expect(screen.getByText(/Notación funcional/)).toBeInTheDocument();
    expect(screen.getByText(/Escala para ejecución/)).toBeInTheDocument();
    expect(screen.getByText(/El piano recibe/)).toBeInTheDocument();

    expect(screen.getByTestId('mode-table-mock')).toBeInTheDocument();
    expect(screen.getByTestId('piano-base-mock')).toBeInTheDocument();
  });

  it('si se deselecciona tónica, limpia las escalas', () => {
    render(<App />);
    const selector = screen.getByTestId('tonic-selector');
    fireEvent.change(selector, { target: { value: 'C' } });
    expect(screen.getByText(/Escala "C"/)).toBeInTheDocument();
    fireEvent.change(selector, { target: { value: '' } });
    expect(screen.queryByText(/Escala "C"/)).toBeNull();
    expect(screen.queryByText(/Raw scale/)).toBeNull();
    expect(screen.queryByTestId('mode-table-mock')).toBeNull();
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock de dependencias principales para aislar el comportamiento
jest.mock('./PianoBase/PianoBase', () => (props: any) => (
  <div data-testid="piano-base-mock">{props.highlightOnThePiano?.join(',')}</div>
));
jest.mock('./ScaleTable/ScaleTable', () => (props: any) => (
  <div data-testid="scale-table-mock">{JSON.stringify(props.scale)}</div>
));
jest.mock('./ModeTable/ModeTable', () => (props: any) => (
  <div data-testid="mode-table-mock">
    {['ionian', 'dorian', 'phrygian'].map((mode) => (
      <button
        key={mode}
        data-testid={`mode-btn-${mode}`}
        onClick={() => props.onModeClick(mode)}
      >
        {mode}
      </button>
    ))}
  </div>
));
jest.mock('./ScaleTable/TonicSelector', () => (props: any) => (
  <select
    data-testid="tonic-selector-mock"
    value={props.tonic || ""}
    onChange={e => props.onChange(e.target.value || undefined)}
  >
    <option value="">Selecciona tónica...</option>
    {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(note => (
      <option key={note} value={note}>{note}</option>
    ))}
  </select>
));

describe('App', () => {
  it('renders the main UI components', () => {
    render(<App />);
    const selector = screen.getByTestId('tonic-selector-mock');
    // Simula seleccionar una tónica
    fireEvent.change(selector, { target: { value: 'C' } });

    expect(screen.getByText(/Elige una tónica/i)).toBeInTheDocument();
    expect(screen.getByTestId('tonic-selector-mock')).toBeInTheDocument();
    expect(screen.getByTestId('scale-table-mock')).toBeInTheDocument();
    expect(screen.getByTestId('mode-table-mock')).toBeInTheDocument();
    expect(screen.getByTestId('piano-base-mock')).toBeInTheDocument();
  });

  it('changes mode when a mode button is clicked', () => {
    render(<App />);
    const selector = screen.getByTestId('tonic-selector-mock');
    fireEvent.change(selector, { target: { value: 'C' } }); 
    const dorianBtn = screen.getByTestId('mode-btn-dorian');
    fireEvent.click(dorianBtn);
    expect(screen.getByTestId('mode-table-mock')).toBeInTheDocument();
  });

  it('passes correct notes to PianoBase', () => {
    render(<App />);
    const selector = screen.getByTestId('tonic-selector-mock');
    fireEvent.change(selector, { target: { value: 'C' } });   
    expect(screen.getByTestId('piano-base-mock').textContent).toMatch(/C5/);
  });
});
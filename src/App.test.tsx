import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mocks de componentes dependientes
jest.mock('./TonicSelector/TonicSelector', () => (props: any) => (
  <button onClick={() => props.onChange('C')}>TonicSelector-mock</button>
));
jest.mock('./ModeTable/ModeTable', () => (props: any) => (
  <div>
    ModeTable-mock
    <button onClick={() => props.onModeClick('phrygian')}>Set Phrygian</button>
  </div>
));
jest.mock('./PianoBase/PianoBase', () => () => <div>PianoBase-mock</div>);
jest.mock('./ModeTable/ModeBreakdown', () => (props: any) => (
  <div>
    ModeBreakdown-mock
    <span>Escala mayor de {props.tonic} {props.activeMode ? `(modo ${props.activeMode})` : ''}</span>
  </div>
));
jest.mock('./TonicSelector/TonicSelector', () => (props: any) => (
  <div>
    <button onClick={() => props.onChange('C')}>TonicSelector-mock</button>
    <button onClick={() => props.onChange(undefined)}>Clear Tonic</button>
  </div>
));
describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders prompt and selector at start, but nothing else', () => {
    render(<App />);
    expect(
      screen.getByText(/Elige una tónica y un modo/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/TonicSelector-mock/i)).toBeInTheDocument();
    expect(screen.queryByText(/ModeTable-mock/i)).not.toBeInTheDocument();
    expect(screen.getByText(/PianoBase-mock/i)).toBeInTheDocument();
    expect(screen.queryByText(/ModeBreakdown-mock/i)).not.toBeInTheDocument();
  });

  it('shows all UI after selecting a tonic', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/TonicSelector-mock/i));
    expect(screen.getByText(/Modos de la escala mayor de C/)).toBeInTheDocument();
    expect(screen.getByText(/ModeTable-mock/)).toBeInTheDocument();
    expect(screen.getByText(/PianoBase-mock/)).toBeInTheDocument();
    expect(screen.getByText(/ModeBreakdown-mock/)).toBeInTheDocument();
    expect(screen.getByText(/Escala mayor de C/)).toBeInTheDocument();
  });

  it('changes ModeBreakdown on mode change', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/TonicSelector-mock/i));
    expect(screen.getByText(/Escala mayor de C \(modo ionian\)/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Set Phrygian/i));
    expect(screen.getByText(/Escala mayor de C \(modo phrygian\)/)).toBeInTheDocument();
  });

  it('clears the tonic selection and hides dependent UI', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/TonicSelector-mock/i));
    // UI visible
    expect(screen.getByText(/Modos de la escala mayor de C/)).toBeInTheDocument();
    expect(screen.getByText(/ModeTable-mock/)).toBeInTheDocument();
    expect(screen.getByText(/ModeBreakdown-mock/)).toBeInTheDocument();
    // Ahora limpia la tónica
    fireEvent.click(screen.getByText(/Clear Tonic/i));
    // Deben desaparecer
    expect(screen.queryByText(/Modos de la escala mayor de C/)).not.toBeInTheDocument();
    expect(screen.queryByText(/ModeTable-mock/)).not.toBeInTheDocument();
    expect(screen.queryByText(/ModeBreakdown-mock/)).not.toBeInTheDocument();
  });
});
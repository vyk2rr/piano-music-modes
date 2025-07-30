import { render, screen } from '@testing-library/react';
import ModeBreakdown from './ModeBreakdown';
import { tChord, tScale, tMode, tNoteName } from '../PianoBase/PianoBase.types';

const defaultProps = {
  tonic: 'C' as tNoteName,
  activeMode: 'ionian' as tMode,
  octaveAssignedScale: ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'] as tChord,
  naturalMajorScale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as tScale,
  diatonicModeScale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as tScale,
};

describe('ModeBreakdown', () => {
  it('renders the table headings correctly', () => {
    render(<ModeBreakdown {...defaultProps} />);
    expect(screen.getByText(/Escala mayor de C$/)).toBeInTheDocument();
    expect(screen.getByText(/Escala mayor de C \(modo ionian\)/)).toBeInTheDocument();
  });

  it('renders degree and note rows correctly', () => {
    render(<ModeBreakdown {...defaultProps} />);
    // Los grados (I, II, III, ...)
    defaultProps.naturalMajorScale.forEach((note) => {
      expect(screen.getAllByText(note)[0]).toBeInTheDocument();
    });
    // Los degrees (I, II, etc.)
    ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].forEach((deg) => {
      expect(screen.getAllByText(deg)[0]).toBeInTheDocument();
    });
  });

  it('highlights altered degrees and notes', () => {
    // Phrygian tiene II y VI alterados (b2, b6)
    render(
      <ModeBreakdown
        {...defaultProps}
        activeMode="phrygian"
        diatonicModeScale={['C', 'Db', 'E', 'F', 'G', 'Ab', 'B']}
      />
    );
    // Checa que 'Db' y 'Ab' estén en un <strong>
    expect(screen.getByText('Db').tagName).toBe('STRONG');
    expect(screen.getByText('Ab').tagName).toBe('STRONG');
    // Checa también los grados alterados (II, VI en phrygian)
    expect(screen.getAllByText('IIb')[0].tagName).toBe('STRONG');
    expect(screen.getAllByText('VIb')[0].tagName).toBe('STRONG');
  });
  it('renders correct number of SVGs for intervals', () => {
    const { container } = render(<ModeBreakdown {...defaultProps} />);
    // Busca todos los SVG de los intervalos
    const svgNodes = container.querySelectorAll('svg.mode-breakdown__interval-svg');
    expect(svgNodes.length).toBe(14);
  });

  it('applies background gradient style if tonic is present', () => {
    render(<ModeBreakdown {...defaultProps} />);
    const table = screen.getByRole('table');
    // Solo checa que el background *exista*, no el valor exacto
    expect(table.style.background).toBeTruthy();
  });
});
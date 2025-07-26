import { render, screen } from '@testing-library/react';
import ScaleTable from './ScaleTable';
import type { tScaleNotes } from './../PianoBase/PianoBase.types';

const mockScale: tScaleNotes = [
  { degree: 'I',   note: 'C',  interval: 'Tónica',     distanceToNext: 'T' },
  { degree: 'II',  note: 'D',  interval: '2da mayor',  distanceToNext: 'T' },
  { degree: 'III', note: 'E',  interval: '3ra mayor',  distanceToNext: 'ST' },
  { degree: 'IV',  note: 'F',  interval: '4ta justa',  distanceToNext: 'T' },
  { degree: 'V',   note: 'G',  interval: '5ta justa',  distanceToNext: 'T' },
  { degree: 'VI',  note: 'A',  interval: '6ta mayor',  distanceToNext: 'T' },
  { degree: 'VII', note: 'B',  interval: '7ma mayor',  distanceToNext: 'ST' }
];

describe('ScaleTable', () => {
  it('renders table headers correctly', () => {
    render(<ScaleTable scale={mockScale} />);
    expect(screen.getByText('Grado')).toBeInTheDocument();
    expect(screen.getByText('Nota')).toBeInTheDocument();
    expect(screen.getByText('Intervalo')).toBeInTheDocument();
    expect(screen.getByText('Fórmula')).toBeInTheDocument();
  });

  it('renders all scale notes as table rows', () => {
    render(<ScaleTable scale={mockScale} />);
    mockScale.forEach(({ degree, note, interval, distanceToNext }) => {
      expect(screen.getByText(degree)).toBeInTheDocument();
      expect(screen.getByText(note)).toBeInTheDocument();
      expect(screen.getByText(interval)).toBeInTheDocument();
      expect(screen.getAllByText(distanceToNext).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders empty table body if scale is empty', () => {
    render(<ScaleTable scale={[]} />);
    // Solo debe haber eladings y ningún <td> (celdas de datos)
    expect(screen.queryByRole('cell')).not.toBeInTheDocument();
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import ModeTable from './ModeTable';
import type { tScale } from './../PianoBase/PianoBase.types';

const mockScale: tScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

describe('ModeTable', () => {
  it('renders table headers correctly', () => {
    render(<ModeTable scale={mockScale} onModeClick={() => {}} />);
    expect(screen.getByText('Modo')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Notas')).toBeInTheDocument();
  });

  it('renders all mode rows with correct data', () => {
    render(<ModeTable scale={mockScale} onModeClick={() => {}} />);
    // Hay 7 modos
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(8); // 1 header + 7 modos

    // Cada modo debe tener su nombre, descripción y notas
    expect(screen.getByText('Ionian')).toBeInTheDocument();
    expect(screen.getByText('Escala mayor natural, base tonal.')).toBeInTheDocument();
    expect(screen.getByText('C, D, E, F, G, A, B')).toBeInTheDocument();

    expect(screen.getByText('Dorian')).toBeInTheDocument();
    expect(screen.getByText('Menor con 6ta mayor brillante.')).toBeInTheDocument();
    expect(screen.getByText('D, E, F, G, A, B, C')).toBeInTheDocument();

    expect(screen.getByText('Phrygian')).toBeInTheDocument();
    expect(screen.getByText('Menor exótico, 2da menor tensa.')).toBeInTheDocument();
    expect(screen.getByText('E, F, G, A, B, C, D')).toBeInTheDocument();
    // ...puedes agregar más asserts para los demás modos si lo deseas
  });

  it('calls onModeClick with correct mode when button is clicked', () => {
    const handleModeClick = jest.fn();
    render(<ModeTable scale={mockScale} onModeClick={handleModeClick} />);
    // Click en el modo Lydian
    const lydianButton = screen.getByText('Lydian');
    fireEvent.click(lydianButton);
    expect(handleModeClick).toHaveBeenCalledWith('lydian');
  });

  it('does not render table if scale is empty', () => {
    const { container } = render(<ModeTable scale={[]} onModeClick={() => {}} />);
    expect(container.querySelector('table')).toBeNull();
  });

  it('does not render table if scale has less than 7 notes', () => {
    const { container } = render(<ModeTable scale={['C', 'D', 'E']} onModeClick={() => {}} />);
    expect(container.querySelector('table')).toBeNull();
  });
});
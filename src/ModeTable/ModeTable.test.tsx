import { render, screen, fireEvent } from '@testing-library/react';
import ModeTable from './ModeTable';
import type { tScale, tMode } from './../PianoBase/PianoBase.types';

const mockScale: tScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

describe('ModeTable', () => {
  it('renders table headers correctly', () => {
    render(<ModeTable scale={mockScale} onModeClick={() => { }} activeMode="ionian" />);
    expect(screen.getByText('Modo')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Notas')).toBeInTheDocument();
  });

  it('renders all mode rows with correct data', () => {
    render(<ModeTable scale={mockScale} onModeClick={() => { }} activeMode="ionian" />);
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
    render(<ModeTable scale={mockScale} onModeClick={handleModeClick} activeMode="ionian" />);
    // Click en el modo Lydian
    const lydianButton = screen.getByText('Lydian');
    fireEvent.click(lydianButton);
    expect(handleModeClick).toHaveBeenCalledWith('lydian');
  });

  it('does not render table if scale is empty', () => {
    const { container } = render(<ModeTable scale={[]} onModeClick={() => { }} activeMode="ionian" />);
    expect(container.querySelector('table')).toBeNull();
  });

  it('does not render table if scale has less than 7 notes', () => {
    const { container } = render(<ModeTable scale={['C', 'D', 'E']} onModeClick={() => { }} activeMode="ionian" />);
    expect(container.querySelector('table')).toBeNull();
  });

  it('adds the active class to the selected mode button', () => {
    render(<ModeTable scale={mockScale} onModeClick={() => { }} activeMode="phrygian" />);
    const activeBtn = screen.getByRole('button', { name: /Phrygian/i });
    expect(activeBtn.className).toMatch(/active/);
  });

  it('sets aria-pressed true only for the active mode', () => {
    render(<ModeTable scale={mockScale} onModeClick={() => { }} activeMode="phrygian" />);
    // El botón activo debe tener aria-pressed="true"
    const activeBtn = screen.getByRole('button', { name: /Phrygian/i });
    expect(activeBtn).toHaveAttribute('aria-pressed', 'true');

    // Los otros deben tener aria-pressed="false"
    const ionianBtn = screen.getByRole('button', { name: /Ionian/i });
    expect(ionianBtn).toHaveAttribute('aria-pressed', 'false');
  });
});
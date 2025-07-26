import { render, screen, fireEvent } from '@testing-library/react';
import TonicSelector from './TonicSelector';

describe('TonicSelector', () => {
  it('renders the select with all tonic options and the empty option', () => {
    render(<TonicSelector tonic={undefined} onChange={() => {}} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Selecciona tónica...')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('C#')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('shows the empty option as selected when tonic is undefined', () => {
    render(<TonicSelector tonic={undefined} onChange={() => {}} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('');
  });

  it('shows the correct option as selected when tonic is set', () => {
    render(<TonicSelector tonic="G#" onChange={() => {}} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('G#');
  });

  it('calls onChange with the new tonic when a tonic is selected', () => {
    const handleChange = jest.fn();
    render(<TonicSelector tonic={undefined} onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'F#' } });
    expect(handleChange).toHaveBeenCalledWith('F#');
  });

  it('calls onChange with undefined when the empty option is selected', () => {
    const handleChange = jest.fn();
    render(<TonicSelector tonic="A" onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(undefined);
  });
});
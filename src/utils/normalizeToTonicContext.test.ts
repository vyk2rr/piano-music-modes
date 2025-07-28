import { tScale } from './../PianoBase/PianoBase.types';
import normalizeToTonicContext from './normalizeToTonicContext';

describe('normalizeToTonicContext', () => {
  it('normalizes a Gbb locrian scale CORRECTLY and CONSISTENTLY', () => {
    const input = ['Gbb', 'Abbb', 'Bbbb', 'Cbb', 'Dbbb', 'Ebbb', 'Fbb'] as tScale;
    const tonic = 'Gbb';
    const expected = ['F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb'];

    expect(normalizeToTonicContext(input, tonic)).toEqual(expected);
  });

  it('normalizes a G## locrian scale correctly', () => {
    const input = ['G##', 'A#', 'B#', 'C##', 'D#', 'E#', 'F##'] as tScale;
    const tonic = 'G##';
    const expected = ['A', 'Bb', 'C', 'D', 'Eb', 'F', 'G'];
    expect(normalizeToTonicContext(input, tonic)).toEqual(expected);
  });

  it('ensures all letters A-G appear exactly once', () => {
    const input = ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D##'] as tScale;
    const tonic = 'E#';
    const result = normalizeToTonicContext(input, tonic);
    const letters = result.map(n => n[0]);
    const uniqueLetters = [...new Set(letters)];
    expect(uniqueLetters.sort()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
  });
});
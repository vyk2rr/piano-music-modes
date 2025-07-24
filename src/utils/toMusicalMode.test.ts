import toMusicalMode from './toMusicalMode';
import type { tChord } from '../PianoBase/PianoBase.types';

describe('toMusicalMode', () => {
  it('convierte un acorde a modo ionian', () => {
    const input: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
    const result = toMusicalMode(input, 'ionian', 'D');
    expect(result).toEqual(['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6']);
  });

  it('convierte un acorde a modo dorian', () => {
    const input: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
    const result = toMusicalMode(input, 'dorian', 'D');
    expect(result).toEqual(['D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6']);
  });

  it('convierte un acorde a modo phrygian', () => {
    const input: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
    const result = toMusicalMode(input, 'phrygian', 'D');
    expect(result).toEqual(['D5', 'Eb5', 'F5', 'G5', 'A5', 'Bb5', 'C6', 'D6']);
  });

   it('convierte un acorde a modo lydian', () => {
    const input: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
    const result = toMusicalMode(input, 'lydian', 'D');
    expect(result).toEqual(['D5', 'E5', 'F#5', 'G#5', 'A5', 'B5', 'C#6', 'D6']);
  });

  it('convierte un acorde a modo mixolydian', () => {
    const input: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
    const result = toMusicalMode(input, 'mixolydian', 'D');
    expect(result).toEqual(['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C6', 'D6']);
  });

  it('convierte un acorde a modo aeolian', () => {
    const input: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
    const result = toMusicalMode(input, 'aeolian', 'D');
    expect(result).toEqual(['D5', 'E5', 'F5', 'G5', 'A5', 'Bb5', 'C6', 'D6']);
  });

  it('convierte un acorde a modo locrian', () => {
    const input: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
    const result = toMusicalMode(input, 'locrian', 'D');
    expect(result).toEqual(['D5', 'Eb5', 'F5', 'G5', 'Ab5', 'Bb5', 'C6', 'D6']);
  });
});

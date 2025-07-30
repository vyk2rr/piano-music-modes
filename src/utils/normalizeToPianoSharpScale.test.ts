import { tScale } from '../PianoBase/PianoBase.types';
import { normalizeToPianoSharpScale } from './normalizeToPianoSharpScale';

describe('normalizeToPianoSharpScale', () => {
  it('normalizes a Gbb locrian scale to piano-sharp notation', () => {
    const input = ['Gbb', 'Abbb', 'Bbbb', 'Cbb', 'Dbbb', 'Ebbb', 'Fbb'] as tScale;
    const expected = ['F', 'F#', 'G#', 'A#', 'B', 'C#', 'D#'];
    expect(normalizeToPianoSharpScale(input)).toEqual(expected);
  });

  it('normalizes a G## locrian scale to piano-sharp notation', () => {
    const input = ['G##', 'A#', 'B#', 'C##', 'D#', 'E#', 'F##'] as tScale;
    const expected = ['A', 'A#', 'C', 'D', 'D#', 'F', 'G'];
    expect(normalizeToPianoSharpScale(input)).toEqual(expected);
  });

  it('keeps sharps in the Ab major scale (Ab input)', () => {
    const input = ['Ab', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb'] as tScale;
    const expected = ['G#', 'A', 'B', 'C#', 'D', 'E', 'F#'];
    expect(normalizeToPianoSharpScale(input)).toEqual(expected);
  });

  it('ensures all letters A-G appear exactly once (pitch-class order)', () => {
    const input = ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D##'] as tScale;
    const expected = ['F', 'G', 'A', 'A#', 'C', 'D', 'E'];
    expect(normalizeToPianoSharpScale(input)).toEqual(expected);
  });

  it('normalizes a C major scale (no alterations)', () => {
    const input = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as tScale;
    const expected = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    expect(normalizeToPianoSharpScale(input)).toEqual(expected);
  });
});
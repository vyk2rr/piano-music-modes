import {
  OCTAVES_RANGE,
  BASE_NOTES,
  NOTES,
  CHROMATIC_SCALE,
  MODES,
  MODE_INTERVAL_PATTERNS
} from './PianoBase.types';

describe('PianoBase.types constants integrity', () => {
  it('OCTAVES_RANGE should be [1..7]', () => {
    expect(OCTAVES_RANGE).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('BASE_NOTES should be natural notes C–B', () => {
    expect(BASE_NOTES).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
  });

  it('CHROMATIC_SCALE should have 12 semitones starting at C', () => {
    expect(CHROMATIC_SCALE).toHaveLength(12);
    expect(CHROMATIC_SCALE[0]).toBe('C');
    expect(new Set(CHROMATIC_SCALE).size).toBe(12);
  });

  it('NOTES should include all chromatic and enharmonic spellings', () => {
    // Every entry in CHROMATIC_SCALE must appear at least once in NOTES (possibly as sharp)
    CHROMATIC_SCALE.forEach(semi => {
      expect(NOTES.some(n => {
        // map sharps to themselves; flats/enharmonics also valid
        return n === semi || n.endsWith(semi) || semi.endsWith(n);
      })).toBe(true);
    });
    // And NOTES must include some flats and double accidentals
    expect(NOTES).toEqual(
      expect.arrayContaining(['Db', 'C##', 'Ebb', 'Abb', 'Gbb'])
    );
  });

  it('MODES and MODE_INTERVAL_PATTERNS keys must match', () => {
    const modeList = [...MODES].sort();
    const patternKeys = Object.keys(MODE_INTERVAL_PATTERNS).sort();
    expect(patternKeys).toEqual(modeList);
    // Each pattern must be length 7
    Object.values(MODE_INTERVAL_PATTERNS).forEach(pat => {
      expect(pat).toHaveLength(7);
      pat.forEach(step => expect(['T', 'ST']).toContain(step));
    });
  });
});
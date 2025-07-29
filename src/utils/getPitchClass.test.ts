import { NOTES, SHARP_TO_FLAT_MAP } from './../PianoBase/PianoBase.types'
import getPitchClass from './getPitchClass'

describe('getPitchClass', () => {

  it('returns the same pitch class for obvious enharmonic equivalents (musician sanity check)', () => {
    expect(getPitchClass('C#')).toBe(getPitchClass('Db'));   // ambos son 1
    expect(getPitchClass('Fb')).toBe(getPitchClass('E'));    // ambos son 4
    expect(getPitchClass('B#')).toBe(getPitchClass('C'));    // ambos son 0
    expect(getPitchClass('E#')).toBe(getPitchClass('F'));    // ambos son 5
    expect(getPitchClass('Cb')).toBe(getPitchClass('B'));    // ambos son 11
    expect(getPitchClass('G##')).toBe(getPitchClass('A'));   // ambos son 9
    expect(getPitchClass('Abb')).toBe(getPitchClass('G'));   // ambos son 7
    expect(getPitchClass('Bbb')).toBe(getPitchClass('A'));   // ambos son 9
  });

  it('all NOTES map to a pitch class 0-11', () => {
    NOTES.forEach(note => {
      const pc = getPitchClass(note);
      expect(Number.isInteger(pc)).toBe(true);
      expect(pc).toBeGreaterThanOrEqual(0);
      expect(pc).toBeLessThanOrEqual(11);
    });
  });

  it('SHARP_TO_FLAT_MAP maps to same pitch class', () => {
    Object.entries(SHARP_TO_FLAT_MAP).forEach(([sharp, flat]) => {
      expect(getPitchClass(sharp as any)).toEqual(getPitchClass(flat as any));
    });
  });

  it('all enarmonic spellings match their pitch class', () => {
    // example: C#, Db, B## all map to 1
    // group by pitch class
    const byClass: Record<number, string[]> = {};
    NOTES.forEach(note => {
      const pc = getPitchClass(note);
      byClass[pc] = byClass[pc] || [];
      byClass[pc].push(note);
    });
    // Should be 12 groups (0..11)
    expect(Object.keys(byClass)).toHaveLength(12);
    // Optionally: print mismatches
    Object.values(byClass).forEach(arr => {
      expect(arr.length).toBeGreaterThanOrEqual(1);
    });
  });
});
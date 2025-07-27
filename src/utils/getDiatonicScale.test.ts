import { getDiatonicScale } from './getDiatonicScale';
import { MODE_INTERVAL_PATTERNS } from '../PianoBase/PianoBase.types';

describe('getDiatonicScale for tonic C', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['C', 'D', 'E', 'F', 'G', 'A', 'B']],
    ['dorian',     ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb']],
    ['phrygian',   ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb']],
    ['lydian',     ['C', 'D', 'E', 'F#', 'G', 'A', 'B']],
    ['mixolydian', ['C', 'D', 'E', 'F', 'G', 'A', 'Bb']],
    ['aeolian',    ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']],
    ['locrian',    ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`C ${mode}`, () => {
      expect(getDiatonicScale('C', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic Cb', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb']],
    ['dorian',     ['Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Ab', 'Bbb']],
    ['phrygian',   ['Cb', 'Dbb', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb']],
    ['lydian',     ['Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']],
    ['mixolydian', ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bbb']],
    ['aeolian',    ['Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb']],
    ['locrian',    ['Cb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`Cb ${mode}`, () => {
      expect(getDiatonicScale('Cb', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic C#', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']],
    ['dorian',     ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B']],
    ['phrygian',   ['C#', 'D', 'E', 'F#', 'G#', 'A', 'B']],
    ['lydian',     ['C#', 'D#', 'E#', 'F##', 'G#', 'A#', 'B#']],
    ['mixolydian', ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B']],
    ['aeolian',    ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B']],
    ['locrian',    ['C#', 'D', 'E', 'F#', 'G', 'A', 'B']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`C# ${mode}`, () => {
      expect(getDiatonicScale('C#', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic Db', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']],
    ['dorian',     ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']],
    ['phrygian',   ['Db', 'Ebb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb']],
    ['lydian',     ['Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']],
    ['mixolydian', ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb']],
    ['aeolian',    ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb']],
    ['locrian',    ['Db', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`Db ${mode}`, () => {
      expect(getDiatonicScale('Db', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic Eb', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']],
    ['dorian',     ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db']],
    ['phrygian',   ['Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']],
    ['lydian',     ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'D']],
    ['mixolydian', ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'Db']],
    ['aeolian',    ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']],
    ['locrian',    ['Eb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`Eb ${mode}`, () => {
      expect(getDiatonicScale('Eb', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic E#', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D##']],
    ['dorian',     ['E#', 'F##', 'G#', 'A#', 'B#', 'C##', 'D#']],
    ['phrygian',   ['E#', 'F#', 'G#', 'A#', 'B#', 'C#', 'D#']],
    ['lydian',     ['E#', 'F##', 'G##', 'A##', 'B#', 'C##', 'D##']],
    ['mixolydian', ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D#']],
    ['aeolian',    ['E#', 'F##', 'G#', 'A#', 'B#', 'C#', 'D#']],
    ['locrian',    ['E#', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`E# ${mode}`, () => {
      expect(getDiatonicScale('E#', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic Fb', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb']],
    ['dorian',     ['Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Db', 'Ebb']],
    ['phrygian',   ['Fb', 'Gbb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb']],
    ['lydian',     ['Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']],
    ['mixolydian', ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Ebb']],
    ['aeolian',    ['Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb']],
    ['locrian',    ['Fb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`Fb ${mode}`, () => {
      expect(getDiatonicScale('Fb', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic Fbb', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['Fbb', 'Gbb', 'Abb', 'Bbbb', 'Cbb', 'Dbb', 'Ebb']],
    ['dorian',     ['Fbb', 'Gbb', 'Abbb', 'Bbbb', 'Cbb', 'Dbb', 'Ebbb']],
    ['phrygian',   ['Fbb', 'Gbbb', 'Abbb', 'Bbbb', 'Cbb', 'Dbbb', 'Ebbb']],
    ['lydian',     ['Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb']],
    ['mixolydian', ['Fbb', 'Gbb', 'Abb', 'Bbbb', 'Cbb', 'Dbb', 'Ebbb']],
    ['aeolian',    ['Fbb', 'Gbb', 'Abbb', 'Bbbb', 'Cbb', 'Dbbb', 'Ebbb']],
    ['locrian',    ['Fbb', 'Gbbb', 'Abbb', 'Bbbb', 'Cbbb', 'Dbbb', 'Ebbb']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`Fbb ${mode}`, () => {
      expect(getDiatonicScale('Fbb', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic Gb', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']],
    ['dorian',     ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb', 'Fb']],
    ['phrygian',   ['Gb', 'Abb', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb']],
    ['lydian',     ['Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']],
    ['mixolydian', ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb']],
    ['aeolian',    ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb']],
    ['locrian',    ['Gb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`Gb ${mode}`, () => {
      expect(getDiatonicScale('Gb', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic A#', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G##']],
    ['dorian',     ['A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G#']],
    ['phrygian',   ['A#', 'B', 'C#', 'D#', 'E#', 'F#', 'G#']],
    ['lydian',     ['A#', 'B#', 'C##', 'D##', 'E#', 'F##', 'G##']],
    ['mixolydian', ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G#']],
    ['aeolian',    ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#']],
    ['locrian',    ['A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`A# ${mode}`, () => {
      expect(getDiatonicScale('A#', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic B#', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A##']],
    ['dorian',     ['B#', 'C##', 'D#', 'E#', 'F##', 'G##', 'A#']],
    ['phrygian',   ['B#', 'C#', 'D#', 'E#', 'F##', 'G#', 'A#']],
    ['lydian',     ['B#', 'C##', 'D##', 'E##', 'F##', 'G##', 'A##']],
    ['mixolydian', ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A#']],
    ['aeolian',    ['B#', 'C##', 'D#', 'E#', 'F##', 'G#', 'A#']],
    ['locrian',    ['B#', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`B# ${mode}`, () => {
      expect(getDiatonicScale('B#', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic F#', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#']],
    ['dorian',     ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E']],
    ['phrygian',   ['F#', 'G', 'A', 'B', 'C#', 'D', 'E']],
    ['lydian',     ['F#', 'G#', 'A#', 'B#', 'C#', 'D#', 'E#']],
    ['mixolydian', ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E']],
    ['aeolian',    ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E']],
    ['locrian',    ['F#', 'G', 'A', 'B', 'C', 'D', 'E']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`F# ${mode}`, () => {
      expect(getDiatonicScale('F#', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic G#', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##']],
    ['dorian',     ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#']],
    ['phrygian',   ['G#', 'A', 'B', 'C#', 'D#', 'E', 'F#']],
    ['lydian',     ['G#', 'A#', 'B#', 'C##', 'D#', 'E#', 'F##']],
    ['mixolydian', ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F#']],
    ['aeolian',    ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#']],
    ['locrian',    ['G#', 'A', 'B', 'C#', 'D', 'E', 'F#']],
  ];

  testCases.forEach(([mode, expected]) => {
    it(`G# ${mode}`, () => {
      expect(getDiatonicScale('G#', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});

describe('getDiatonicScale for tonic Abb', () => {
  const testCases: [string, string[]][] = [
    ['ionian',     ['Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gb']],
    ['dorian',     ['Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fb', 'Gbb']], 
    ['phrygian',   ['Abb', 'Bbbb', 'Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb']], 
    ['lydian',     ['Abb', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb']], 
    ['mixolydian', ['Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gbb']], 
    ['aeolian',    ['Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb']], 
    ['locrian',    ['Abb', 'Bbbb', 'Cbb', 'Dbb', 'Ebbb', 'Fbb', 'Gbb']], 
  ];

  testCases.forEach(([mode, expected]) => {
    it(`Abb ${mode}`, () => {
      expect(getDiatonicScale('Abb', MODE_INTERVAL_PATTERNS[mode as keyof typeof MODE_INTERVAL_PATTERNS]))
        .toEqual(expected);
    });
  });
});
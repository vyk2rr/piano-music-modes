import * as Tone from "tone";
export const OCTAVES_RANGE = [1, 2, 3, 4, 5, 6, 7] as const;
export const BASE_NOTES = [
  'C', 'D', 'E', 'F', 'G', 'A', 'B'
] as const;

export const NOTES = [
  'Ab', 'A', 'A#', 'Abb', 'A##',
  'Bb', 'B', 'B#', 'Bbb',
  'Cb', 'C', 'C#', 'C##', 'Cbb',
  'Db', 'D', 'D#', 'Dbb', 'D##',
  'Eb', 'E', 'E#', 'Ebb', 'E##',
  'Fb', 'F', 'F#', 'Fbb', 'F##',
  'Gb', 'G', 'G#', 'Gbb', 'G##'
] as const;
export const CHORD_QUALITIES = [
  'maj', 'min', 'dim', 'aug',
  'sus2', 'sus4',
  'maj7', 'm7', 'dom7',
  'maj9', 'm9', 'dom9',
  'maj11', 'm11', 'dom11',
  'maj13', 'm13', 'dom13'
] as const;
export const MODES = [
  'ionian', 'dorian', 'phrygian',
  'lydian', 'mixolydian', 'aeolian',
  'locrian'
] as const;
export type tOctaveRange = typeof OCTAVES_RANGE[number]; // example: 1, 2, 3, 4, 5
export type tChordQualities = typeof CHORD_QUALITIES[number]; // "maj", "min", "dim", etc.

export type tMode = typeof MODES[number]; // example: "ionian", "dorian", etc.
export type tNote = typeof BASE_NOTES[number]; // example: "C", "D", "E", etc.
export type tNoteName = typeof NOTES[number]; // example: "C", "Db", "E#", etc.
export type tNoteWithOctave = `${tNoteName}${tOctaveRange}`; // example: "C4", "D#5", "Bb3", etc.
export type tNoteWQuality = `${tNoteName}${tChordQualities}`; // example: "Cmaj", "Dmin", "E#sus4", etc.
export type tNoteWOCtaveQuality = `${tNoteName}${tOctaveRange}${tChordQualities}`; // example: "C3maj", "Dmin", "E#sus4", etc.
export type tPercentString = `${number}%`; // example: "7.5%"
export type tTime = Tone.Unit.Time; // example: "4n", "2m", "1:2:3", etc.
export const SHARP_TO_FLAT_MAP: Partial<Record<tNoteName, tNoteName>> = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb"
};
export type tScale = tNoteName[];
export type tScaleNote = {
  degree: string;
  note: tNoteName;
  interval: string;
  distanceToNext: string;
}; // example: { degree: "I", note: "C", interval: "Tónica", distanceToNext: "T" }
export type tScaleNotes = tScaleNote[]; // example [{ degree: "I", note: "C", interval: "Tónica", distanceToNext: "T" }, ...]

export type tChord = tNoteWithOctave[]
export type tChordSequence = tChord[]

export type tChordWithName = {
  id: string; // note+type 
  quality: tChordQualities, // Ejemplo: "maj", "min", "sus4", etc.
  rootNote: tNoteName, // Ejemplo: "C", "D#", "E#", etc.
  name: string; // baseNoteName+type Ej: "Cmaj", "Dmin", "E#sus4"
  displayNotes: string; // Ej: "C E G"; 
  chord: tChord; // notas en logica completa para piano
}

export type tChordMap = Record<string, tNoteWithOctave[]>;

export type tPianoNotes = {
  white: tNoteWithOctave[];
  black: tNoteWithOctave[];
};

export type tSequenceToPlayProps = {
  sequenceToPlay: tChordSequence;
  onSequenceEnd: () => void;
  highlightedKeys?: boolean;
}

export const CHORD_INTERVALS: Record<tChordQualities, number[]> = {
  // casa posición del array representa 
  // la cantidad de semitonos desde la tónica
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  maj7: [0, 4, 7, 11],
  m7: [0, 3, 7, 10],
  dom7: [0, 4, 7, 10],
  maj9: [0, 4, 7, 11, 14],
  m9: [0, 3, 7, 10, 14],
  dom9: [0, 4, 7, 10, 14],
  maj11: [0, 4, 7, 11, 14, 17],
  m11: [0, 3, 7, 10, 14, 17],
  dom11: [0, 4, 7, 10, 14, 17],
  maj13: [0, 4, 7, 11, 14, 17, 21],
  m13: [0, 3, 7, 10, 14, 17, 21],
  dom13: [0, 4, 7, 10, 14, 17, 21],
};

export interface iChordEvent {
  pitches: tChord;
  time: string;           // Tiempo musical (ej: "0:0:1", "1m", "4n")
  duration: tTime;
  velocity?: number;
  highlightGroup?: 1 | 2;
  scheduledPlayTime?: number;
}

export type tMelodySequence = iChordEvent[];

export const MODE_INTERVAL_PATTERNS: Record<tMode, string[]> = {
  ionian: ['T', 'T', 'ST', 'T', 'T', 'T', 'ST'],
  dorian: ['T', 'ST', 'T', 'T', 'T', 'ST', 'T'],
  phrygian: ['ST', 'T', 'T', 'T', 'ST', 'T', 'T'],
  lydian: ['T', 'T', 'T', 'ST', 'T', 'T', 'ST'],
  mixolydian: ['T', 'T', 'ST', 'T', 'T', 'ST', 'T'],
  aeolian: ['T', 'ST', 'T', 'T', 'ST', 'T', 'T'],
  locrian: ['ST', 'T', 'T', 'ST', 'T', 'T', 'T'],
};
export const INTERVAL_SEMITONES: Record<string, number> = { T: 2, ST: 1 };
export const MODE_ALTERATIONS: Record<tMode, tModeAlteration[]> = {
  ionian: [],
  dorian: [
    { degree: 3, alteration: 'b' },
    { degree: 7, alteration: 'b' },
  ],
  phrygian: [
    { degree: 2, alteration: 'b' },
    { degree: 3, alteration: 'b' },
    { degree: 6, alteration: 'b' },
    { degree: 7, alteration: 'b' },
  ],
  lydian: [
    { degree: 4, alteration: '#' },
  ],
  mixolydian: [
    { degree: 7, alteration: 'b' },
  ],
  aeolian: [
    { degree: 3, alteration: 'b' },
    { degree: 6, alteration: 'b' },
    { degree: 7, alteration: 'b' },
  ],
  locrian: [
    { degree: 2, alteration: 'b' },
    { degree: 3, alteration: 'b' },
    { degree: 5, alteration: 'b' },
    { degree: 6, alteration: 'b' },
    { degree: 7, alteration: 'b' },
  ],
};
export const DEGREES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
// degree: 1 = 'I', 2 = 'II', etc. (índice + 1 en DEGREES)
export type tModeAlteration = {
  degree: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  alteration: 'b' | '#';
};
export const INTERVALS = [
  'Tónica',
  '2da mayor',
  '3ra mayor',
  '4ta justa',
  '5ta justa',
  '6ta mayor',
  '7ma mayor',
];

export const NOTE_LETTER_SEQUENCE: tNote[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const SEMITONE_INDICES: Record<tNoteName, number> = {
  'C': 0, 'B#': 0, 'Dbb': 0,
  'C#': 1, 'Db': 1,
  'C##': 2, 'D': 2, 'Ebb': 2,
  'D#': 3, 'Eb': 3, 'Fbb': 3,
  'D##': 4, 'E': 4, 'Fb': 4,
  'E#': 5, 'F': 5, 'Gbb': 5,
  'E##': 6, 'F#': 6, 'Gb': 6,
  'F##': 7, 'G': 7, 'Abb': 7,
  'G#': 8, 'Ab': 8,
  'G##': 9, 'A': 9, 'Bbb': 9,
  'A#': 10, 'Bb': 10, 'Cbb': 10,
  'A##': 11, 'B': 11, 'Cb': 11,
};
// CHROMATIC_SCALE contiene las equivalencias 0 -> C, C# -> 1 ... etc (las de SEMITONE_INDICES)
export const CHROMATIC_SCALE: tScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
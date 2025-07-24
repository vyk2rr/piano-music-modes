import type { tChord, tNoteWithOctave } from '../PianoBase/PianoBase.types';

// Define musical modes with their interval patterns (W = whole step, H = half step)
const MODES = {
  ionian: [2, 2, 1, 2, 2, 2, 1],     // W-W-H-W-W-W-H
  dorian: [2, 1, 2, 2, 2, 1, 2],     // W-H-W-W-W-H-W
  phrygian: [1, 2, 2, 2, 1, 2, 2],   // H-W-W-W-H-W-W
  lydian: [2, 2, 2, 1, 2, 2, 1],     // W-W-W-H-W-W-H
  mixolydian: [2, 2, 1, 2, 2, 1, 2], // W-W-H-W-W-H-W
  aeolian: [2, 1, 2, 2, 1, 2, 2],    // W-H-W-W-H-W-W
  locrian: [1, 2, 2, 1, 2, 2, 2]     // H-W-W-H-W-W-W
};

// All possible note names (using sharps as primary)
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Map sharps to flats for modes that require flats
const SHARP_TO_FLAT: { [key: string]: string } = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb'
};

// Map flats to sharps for input normalization
const FLAT_TO_SHARP: { [key: string]: string } = {
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#'
};

// Modes that should use flat note names
const FLAT_MODES = ['phrygian', 'aeolian', 'locrian'];

// Helper function to get note index
function getNoteIndex(note: string): number {
  const noteName = note.replace(/\d/, ''); // Remove octave number
  return NOTES.indexOf(FLAT_TO_SHARP[noteName] || noteName);
}


function transposeNote(baseNote: tNoteWithOctave, semitoneOffset: number, mode: keyof typeof MODES): tNoteWithOctave {
  const octave = parseInt(baseNote.match(/\d/)?.[0] || '5');
  let noteIndex = getNoteIndex(baseNote);
  
  // Calculate new note index with offset
  noteIndex = (noteIndex + semitoneOffset) % 12;
  if (noteIndex < 0) noteIndex += 12;
  
  // Adjust octave if crossing C
  const newOctave = octave + Math.floor((getNoteIndex(baseNote) + semitoneOffset) / 12);
  
  // Use flat notes for specific modes, sharps for others
  const noteName = FLAT_MODES.includes(mode) ? (SHARP_TO_FLAT[NOTES[noteIndex]] || NOTES[noteIndex]) : NOTES[noteIndex];

  return `${noteName}${newOctave}` as tNoteWithOctave;
}

export default function toMusicalMode(chord: tChord, mode: keyof typeof MODES, tonic: string): tChord {
  // Validate inputs
  if (!chord.length || !MODES[mode] || !NOTES.includes(FLAT_TO_SHARP[tonic] || tonic)) {
    return chord;
  }

  // Get the interval pattern for the requested mode
  const intervals = MODES[mode];
  
  // Initialize result array
  const result: tChord = [chord[0]]; // Keep first note (tonic) as is
  
  // Calculate cumulative intervals
  let currentInterval = 0;
  
  // Generate notes based on mode intervals
  for (let i = 1; i < chord.length; i++) {
    currentInterval += intervals[(i - 1) % intervals.length];
    const newNote = transposeNote(chord[0], currentInterval, mode);
    result.push(newNote);
  }
  
  return result;
}
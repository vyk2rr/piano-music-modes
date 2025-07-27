import { 
  tNoteName,
  MODE_INTERVAL_PATTERNS
} from '../PianoBase/PianoBase.types';

const INTERVAL_SEMITONES: Record<string, number> = { T: 2, ST: 1 };
const NOTE_LETTER_SEQUENCE: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const SEMITONE_INDICES: Record<string, number> = {
  'C': 0, 'B#': 0, 'C#': 1, 'Db': 1, 'C##': 2, 'Dbb': 0,
  'D': 2, 'D#': 3, 'Eb': 3, 'D##': 4, 'Ebb': 2,
  'E': 4, 'Fb': 4, 'E#': 5, 'F': 5, 'E##': 6, 'Fbb': 3,
  'F#': 6, 'Gb': 6, 'F##': 7, 'Gbb': 5,
  'G': 7, 'G#': 8, 'Ab': 8, 'G##': 9, 'Abb': 7,
  'A': 9, 'A#': 10, 'Bb': 10, 'A##': 11, 'Bbb': 9,
  'B': 11, 'Cb': 11, 'B#': 0, 'Cbb': 10,
};

function buildNoteWithSemitone(letter: string, semitone: number): tNoteName {
  const candidates = Object.keys(SEMITONE_INDICES).filter(note => {
    return note[0] === letter && SEMITONE_INDICES[note] === semitone;
  });

  if (candidates.length > 0) {
    // Prioridad: menor número de alteraciones primero (cantidad de "#" o "b")
    candidates.sort((a, b) => {
      const alteraciones = (nota: string) => (nota.match(/[#b]/g) || []).length;
      return alteraciones(a) - alteraciones(b) || a.length - b.length;
    });
    return candidates[0] as tNoteName;
  }

  // Caso fallback (no debería ocurrir si el mapa está completo)
  const naturalSemitone = SEMITONE_INDICES[letter];
  if (naturalSemitone === undefined) throw new Error(`Invalid letter ${letter}`);

  const diff = (semitone - naturalSemitone + 12) % 12;
  return (diff <= 6
    ? letter + '#'.repeat(diff)
    : letter + 'b'.repeat(12 - diff)) as tNoteName;
}

export function getDiatonicScale(
  tonic: tNoteName,
  pattern: string[]
): tNoteName[] {
  const scale: tNoteName[] = [tonic];

  let letterIndex = NOTE_LETTER_SEQUENCE.indexOf(tonic[0]);
  let semitoneIndex = SEMITONE_INDICES[tonic];

  pattern.forEach(interval => {
    letterIndex = (letterIndex + 1) % 7;
    const nextLetter = NOTE_LETTER_SEQUENCE[letterIndex];

    semitoneIndex = (semitoneIndex + INTERVAL_SEMITONES[interval]) % 12;

    const nextNote = buildNoteWithSemitone(nextLetter, semitoneIndex);
    scale.push(nextNote);
  });

  return scale.slice(0, 7);
}
import type { tNoteName, tNote } from '../PianoBase/PianoBase.types'
import {
  NOTES,
  INTERVAL_SEMITONES,
  NOTE_LETTER_SEQUENCE,
  SEMITONE_INDICES,
} from '../PianoBase/PianoBase.types';

function buildNoteWithSemitone(letter: tNoteName, semitone: number): tNoteName {
  const candidates = NOTES
    .filter(note => note[0] === letter && SEMITONE_INDICES[note] === semitone);

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

  const tonicLetter = tonic.charAt(0) as tNote;
  let letterIndex = NOTE_LETTER_SEQUENCE.indexOf(tonicLetter);
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
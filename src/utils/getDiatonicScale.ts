import type { tNoteName, tNote } from '../PianoBase/PianoBase.types'
import {
  NOTES,
  INTERVAL_SEMITONES,
  NOTE_LETTER_SEQUENCE,
  BASE_PITCH_MAP,
} from '../PianoBase/PianoBase.types';
import getPitchClass from './getPitchClass';

function buildNoteWithSemitone(letter: tNote, semitone: number): tNoteName {
  const candidates = NOTES.filter(
    note => note[0] === letter && getPitchClass(note) === semitone
  );
  if (candidates.length > 0) {
    candidates.sort((a, b) =>
      (a.match(/[#b]/g) || []).length - (b.match(/[#b]/g) || []).length
      || a.length - b.length
    );
    return candidates[0] as tNoteName;
  }
  const basePitch = BASE_PITCH_MAP[letter];
  const diff = (semitone - basePitch + 12) % 12;
  return (diff <= 6
    ? (letter + '#'.repeat(diff))
    : (letter + 'b'.repeat(12 - diff))) as tNoteName;
}

export function getDiatonicScale(
  tonic: tNoteName,
  pattern: string[]
): tNoteName[] {
  const scale: tNoteName[] = [tonic];
  const tonicLetter = tonic[0] as tNote;
  let letterIndex = NOTE_LETTER_SEQUENCE.indexOf(tonicLetter);
  let semitoneIndex = getPitchClass(tonic);

  pattern.forEach(interval => {
    letterIndex = (letterIndex + 1) % 7;
    const nextLetter = NOTE_LETTER_SEQUENCE[letterIndex];
    semitoneIndex = (semitoneIndex + INTERVAL_SEMITONES[interval]) % 12;
    const nextNote = buildNoteWithSemitone(nextLetter, semitoneIndex);
    scale.push(nextNote);
  });

  return scale.slice(0, 7);
}
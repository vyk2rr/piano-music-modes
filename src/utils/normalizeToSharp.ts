import { SHARP_TO_FLAT_MAP } from '../PianoBase/PianoBase.types';
import type { tNoteWithOctave } from '../PianoBase/PianoBase.types';

// Invierte el mapa de sostenidos a bemoles para mapear bemoles a sostenidos
const FLAT_TO_SHARP_MAP = Object.fromEntries(
  Object.entries(SHARP_TO_FLAT_MAP).map(([sharp, flat]) => [flat, sharp])
);

export default function normalizeToSharp(notes: tNoteWithOctave[]): tNoteWithOctave[] {
  return notes.map((note) => {
    const match = note.match(/^([A-G][b#]?)(\d)$/);
    if (!match) return note; // Devuelve la nota sin cambios si no coincide con el formato

    const [, pitchClass, octave] = match;
    // Si la nota es bemol, la convertimos a su equivalente en sostenido
    if (pitchClass.includes('b')) {
      const sharpNote = FLAT_TO_SHARP_MAP[pitchClass];
      if (sharpNote) {
        return `${sharpNote}${octave}` as tNoteWithOctave;
      }
    }
    // Si ya es sostenido o natural, la dejamos como está
    return note;
  });
}
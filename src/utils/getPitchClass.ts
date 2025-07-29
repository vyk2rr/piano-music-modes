import type { tNoteName } from './../PianoBase/PianoBase.types';
import { BASE_NOTES, BASE_PITCH_MAP } from './../PianoBase/PianoBase.types';

export default function getPitchClass(note: tNoteName): number {
  const baseNote = note[0] as typeof BASE_NOTES[number];
  const accidentals = note.slice(1);

  let pitch = BASE_PITCH_MAP[baseNote];

  for (const char of accidentals) {
    if (char === '#') {
      pitch++;
    } else if (char === 'b') {
      pitch--;
    }
  }

  // El módulo (%) asegura que el valor se mantenga en el rango 0-11.
  // El `+ 12` maneja correctamente los resultados negativos (ej. Cb -> -1).
  return (pitch % 12 + 12) % 12;
}
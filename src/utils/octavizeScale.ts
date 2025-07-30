import type {
  tChord,
  tScale,
  tOctaveRange,
  tNoteWithOctave,
  tNoteName
} from './../PianoBase/PianoBase.types';
import getPitchClass from './getPitchClass';

export default function octavizeScale(
  escala: tScale,
  octavaInicial: tOctaveRange = 5
): tChord {
  let octava = octavaInicial;
  const resultado: tChord = [];

  let prevIdx: number | null = null;

  for (const nota of escala) {
    const idx = getPitchClass(nota as tNoteName);

    if (prevIdx !== null && idx <= prevIdx) {
      octava += 1;
    }

    resultado.push(`${nota}${octava}` as tNoteWithOctave);
    prevIdx = idx;
  }
  return resultado;
}
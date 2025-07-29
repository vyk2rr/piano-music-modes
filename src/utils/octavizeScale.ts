import type {
  tChord,
  tScale,
  tOctaveRange,
  tNoteWithOctave
} from './../PianoBase/PianoBase.types';

// Sube la octava cada vez que se encuentra una 'C'
export default function octavizeScale(
  escala: tScale,
  octavaInicial: tOctaveRange = 5
): tChord {
  let octava = octavaInicial;
  const resultado: tChord = [];

  for (const nota of escala) {
    if (nota[0] === 'C' && resultado.length > 0) {
      octava += 1;
    }
    resultado.push(`${nota}${octava}` as tNoteWithOctave);
  }
  return resultado;
}
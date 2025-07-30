import type { tScale, tNoteName } from '../PianoBase/PianoBase.types';
import { CHROMATIC_SCALE } from '../PianoBase/PianoBase.types';
import getPitchClass from './getPitchClass';

/**
 * Normaliza una escala (notas con cualquier cantidad de bemoles o sostenidos)
 * a las 12 teclas del piano en notación con # (C, C#, ..., B).
 * Ejemplo:
 *   ['Gbb', 'Abbb', 'Bbbb', 'Cbb', 'Dbbb', 'Ebbb', 'Fbb']
 *   => ['F', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
 */
export function normalizeToPianoSharpScale(input: tScale): tScale {
  return input.map((note) => {
    // Calcula el índice en la escala cromática usando tu lógica central
    const idx = getPitchClass(note as tNoteName);
    return CHROMATIC_SCALE[idx] as tNoteName;
  });
}
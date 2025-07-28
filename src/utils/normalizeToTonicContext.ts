import {
  tNoteName, tScale,
  BASE_NOTES, CHROMATIC_SCALE
} from './../PianoBase/PianoBase.types';
import getPitchClass from './getPitchClass';

export default function normalizeToTonicContext(
  input: tScale,
  tonic: tNoteName
): tScale {
  // 1. Convertir todas las notas de entrada a sus valores numéricos (pitch class).
  const inputPitchClasses = input.map(getPitchClass);

  // 2. Determinar la tónica de destino y el intervalo de transposición.
  const sourceTonicPitch = getPitchClass(tonic);

  // Usamos CHROMATIC_SCALE para encontrar la nota más simple para el pitch de la tónica.
  const targetTonicName = CHROMATIC_SCALE[sourceTonicPitch];
  const targetTonicPitch = getPitchClass(targetTonicName as tNoteName);

  // Calculamos la diferencia para saber cuánto hay que transportar la escala.
  const transposeInterval = targetTonicPitch - sourceTonicPitch;

  // 3. Transportar todos los valores numéricos de la escala de entrada.
  const targetPitchClasses = inputPitchClasses.map(pitch =>
    (pitch + transposeInterval + 12) % 12
  );

  // 4. Generar la secuencia de letras diatónicas para la escala de salida.
  const targetTonicLetter = targetTonicName[0] as typeof BASE_NOTES[number];
  const tonicIndex = BASE_NOTES.indexOf(targetTonicLetter);
  const diatonicLetterSequence = [
    ...BASE_NOTES.slice(tonicIndex),
    ...BASE_NOTES.slice(0, tonicIndex),
  ];

  // 5. Construir la escala final, asignando los accidentales correctos a cada letra.
  const resultScale: tScale = [];

  for (let i = 0; i < diatonicLetterSequence.length; i++) {
    const targetLetter = diatonicLetterSequence[i];
    const targetPitch = targetPitchClasses[i];

    const basePitchOfLetter = getPitchClass(targetLetter);

    let semitoneDifference = targetPitch - basePitchOfLetter;

    // Ajustar la diferencia para encontrar el intervalo más corto (ej: +1 en lugar de -11).
    if (semitoneDifference > 6) semitoneDifference -= 12;
    if (semitoneDifference < -6) semitoneDifference += 12;

    let finalNote = targetLetter;
    if (semitoneDifference > 0) {
      finalNote += '#'.repeat(semitoneDifference);
    } else if (semitoneDifference < 0) {
      finalNote += 'b'.repeat(Math.abs(semitoneDifference));
    }

    resultScale.push(finalNote as tNoteName);
  }

  return resultScale;
}
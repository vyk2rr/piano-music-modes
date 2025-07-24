import type { tChord, tNoteWithOctave } from "../PianoBase/PianoBase.types";
export default function convertToLocrian(notes: tChord): tChord {
  // Definimos todas las notas en orden cromático
  const chromaticNotes = [
    "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"
  ];

  // Función para obtener el registro (octava) de una nota
  const getOctave = (note: string): number => {
    const octave = note.match(/\d+$/);
    return octave ? parseInt(octave[0]) : 4; // Por defecto, octava 4 si no se especifica
  };

  // Función para obtener la nota base sin el registro
  const getBaseNote = (note: string): string => {
    return note.replace(/\d+$/, "");
  };

  // Escala locria de D (D, Eb, F, G, Ab, A, B, C)
  const dLocrianScale = ["D", "Eb", "F", "G", "Ab", "A", "B", "C"];

  // Función para encontrar la nota más cercana en la escala locria
  const findClosestLocrianNote = (note: tNoteWithOctave, octave: number): tNoteWithOctave => {
    const baseNote = getBaseNote(note);
    let noteIndex = chromaticNotes.indexOf(baseNote);

    if (noteIndex === -1) {
      return note; // Si la nota no es válida, la devolvemos sin cambios
    }

    // Encontrar la nota más cercana en la escala locria
    let minDistance = Infinity;
    let closestNote = baseNote;

    for (const locrianNote of dLocrianScale) {
      const locrianIndex = chromaticNotes.indexOf(locrianNote);
      const distance = Math.min(
        Math.abs(noteIndex - locrianIndex),
        Math.abs(noteIndex + 12 - locrianIndex),
        Math.abs(noteIndex - 12 - locrianIndex)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestNote = locrianNote;
      }
    }

    // Ajustar la octava según la nota original
    return `${closestNote}${octave}` as tNoteWithOctave;
  };

  // Convertir cada nota a su equivalente en la escala locria
  return notes.map(note => {
    const octave = getOctave(note);
    return findClosestLocrianNote(note, octave);
  });
}
import { CHROMATIC_SCALE } from '../PianoBase/PianoBase.types';

const NOTE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const STEP_MAP: Record<string, number> = { T: 2, ST: 1 };

function rotateArray<T>(arr: T[], n: number): T[] {
  return arr.slice(n).concat(arr.slice(0, n));
}

function getBaseNoteLetters(tonic: string): string[] {
  const letter = tonic.replace(/[#b].*$/, '');
  const idx = NOTE_LETTERS.indexOf(letter.toUpperCase());
  return rotateArray(NOTE_LETTERS, idx);
}

function getNaturalIndex(letter: string): number {
  // Índice de la nota natural (sin alteración) en el círculo cromático
  return CHROMATIC_SCALE.findIndex(n => n === letter);
}

function getDiatonicNote(expectedLetter: string, actualChromaticIdx: number): string {
  // Encuentra la nota base (natural) para la letra esperada
  const naturalIdx = getNaturalIndex(expectedLetter);
  let diff = (actualChromaticIdx - naturalIdx + 12) % 12;
  let accidental = '';
  if (diff === 0) return expectedLetter; // Natural
  if (diff > 6) { // Preferir bemoles si es menor a -6
    diff = diff - 12;
  }
  if (diff > 0) accidental = '#'.repeat(diff);
  if (diff < 0) accidental = 'b'.repeat(-diff);
  return expectedLetter + accidental;
}

export function getDiatonicScale(tonic: string, pattern: string[]): string[] {
  const baseLetters = getBaseNoteLetters(tonic);
  let acc: string[] = [tonic];
  let chromaIdx = CHROMATIC_SCALE.indexOf(tonic);

  for (let i = 1; i < 7; i++) {
    const steps = STEP_MAP[pattern[i - 1]];
    chromaIdx = (chromaIdx + steps) % CHROMATIC_SCALE.length;
    const expectedLetter = baseLetters[i];
    acc.push(getDiatonicNote(expectedLetter, chromaIdx));
  }
  return acc;
}
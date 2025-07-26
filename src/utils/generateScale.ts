import type { tNote } from '../PianoBase/PianoBase.types';

const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const DEGREES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const INTERVALS = [
  'Tónica',
  '2da mayor',
  '3ra mayor',
  '4ta justa',
  '5ta justa',
  '6ta mayor',
  '7ma mayor',
];
const FORMULA = ['T', 'T', 'ST', 'T', 'T', 'T', 'ST'];
const MAJOR_SCALE_STEPS = [2, 2, 1, 2, 2, 2, 1];

function getMajorScale(tonic: string): string[] {
  const scale: string[] = [];
  let idx = CHROMATIC_SCALE.indexOf(tonic);
  if (idx === -1) return scale;

  scale.push(CHROMATIC_SCALE[idx]);
  for (let i = 0; i < MAJOR_SCALE_STEPS.length - 1; i++) {
    idx = (idx + MAJOR_SCALE_STEPS[i]) % 12;
    scale.push(CHROMATIC_SCALE[idx]);
  }
  return scale;
}

export default function generateScale(tonic: tNote) {
  const scaleNotes = getMajorScale(tonic as string);
  return DEGREES.map((degree, i) => ({
    degree,
    note: scaleNotes[i] || '',
    interval: INTERVALS[i],
    formula: FORMULA[i],
  }));
}
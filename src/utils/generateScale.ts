import type { tNoteName, tScale, tScaleNotes } from '../PianoBase/PianoBase.types';
import {
  CHROMATIC_SCALE,
  DEGREES,
  INTERVALS,
  FORMULA_SCALE_PATTERN,
  MAJOR_SCALE_STEPS
} from '../PianoBase/PianoBase.types';

function getMajorScale(tonic: tNoteName): tScale {
  const scale: tScale = [];
  let idx = CHROMATIC_SCALE.indexOf(tonic);
  if (idx === -1) return scale;

  scale.push(CHROMATIC_SCALE[idx]);
  for (let i = 0; i < MAJOR_SCALE_STEPS.length - 1; i++) {
    idx = (idx + MAJOR_SCALE_STEPS[i]) % 12;
    scale.push(CHROMATIC_SCALE[idx]);
  }
  return scale;
}

export default function generateScale(tonic: tNoteName): tScaleNotes {
  const scaleNotes = getMajorScale(tonic);
  return DEGREES.map((degree, i) => ({
    degree,
    note: scaleNotes[i] || '',
    interval: INTERVALS[i],
    distanceToNext: FORMULA_SCALE_PATTERN[i],
  }));
}
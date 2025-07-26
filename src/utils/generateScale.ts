import type { tNoteName, tScale, tScaleNotes } from '../PianoBase/PianoBase.types';
import {
  CHROMATIC_SCALE,
  DEGREES,
  INTERVALS,
  MODE_INTERVAL_PATTERNS
} from '../PianoBase/PianoBase.types';

// Helper para convertir los intervalos 'T'/'ST' a pasos numéricos
const STEP_MAP: Record<string, number> = { T: 2, ST: 1 };

function getMajorScale(tonic: tNoteName): tScale {
  const pattern = MODE_INTERVAL_PATTERNS['ionian'];
  const steps = pattern.map(interval => STEP_MAP[interval]);
  const scale: tScale = [];
  let idx = CHROMATIC_SCALE.indexOf(tonic);
  if (idx === -1) return scale;

  scale.push(CHROMATIC_SCALE[idx]);
  for (let i = 0; i < steps.length - 1; i++) {
    idx = (idx + steps[i]) % 12;
    scale.push(CHROMATIC_SCALE[idx]);
  }
  return scale;
}

export default function generateScale(tonic: tNoteName): tScaleNotes {
  const pattern = MODE_INTERVAL_PATTERNS['ionian'];
  const scaleNotes = getMajorScale(tonic);
  return DEGREES.map((degree, i) => ({
    degree,
    note: scaleNotes[i] || '',
    interval: INTERVALS[i],
    distanceToNext: pattern[i],
  }));
}
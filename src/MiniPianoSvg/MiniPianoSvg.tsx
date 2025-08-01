import React from 'react';
import type { tNoteName } from '../PianoBase/PianoBase.types';

// Blancas C–B
const whiteNotes: tNoteName[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Negras y su posición relativa en mini-piano
const blackNotes = [
  { note: 'C#' as tNoteName, pos: 1 },
  { note: 'D#' as tNoteName, pos: 2 },
  // No hay entre E–F
  { note: 'F#' as tNoteName, pos: 4 },
  { note: 'G#' as tNoteName, pos: 5 },
  { note: 'A#' as tNoteName, pos: 6 }
];

interface MiniPianoSvgProps {
  highlight?: tNoteName[]; // Ejemplo: ['C', 'D#', 'F']
}

const MiniPianoSvg: React.FC<MiniPianoSvgProps> = ({ highlight = [] }) => (
  <svg width="70" height="25" viewBox="0 0 70 25" xmlns="http://www.w3.org/2000/svg">
    {/* White keys */}
    {whiteNotes.map((note, i) => (
      <rect
        key={`w-${i}`}
        x={i * 10}
        y={0}
        width={10}
        height={25}
        fill={highlight.includes(note) ? '#ffd700' : '#fff'}
        stroke="#000"
        strokeWidth={0.5}
      />
    ))}
    {/* Black keys */}
    {blackNotes.map(({ note, pos }) => (
      <rect
        key={`b-${note}`}
        x={pos * 10 - 3}
        y={0}
        width={6}
        height={15}
        fill={highlight.includes(note) ? '#ff8500' : '#000'}
      />
    ))}
  </svg>
);

export default MiniPianoSvg;
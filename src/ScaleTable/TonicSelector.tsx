import React from 'react';
import type { tScale, tNoteName } from '../PianoBase/PianoBase.types';

interface TonicSelectorProps {
  tonic?: tNoteName;
  onChange: (tonic: tNoteName | undefined) => void;
}

const tonics: tScale = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B"
];

const TonicSelector: React.FC<TonicSelectorProps> = ({ tonic, onChange }) => (
  <label>
    Tónica:&nbsp;
    <select
      value={tonic || ''}
      onChange={e => {
        const v = e.target.value;
        onChange(v ? (v as tNoteName) : undefined);
      }}
    >
      <option value="">Selecciona tónica...</option>
      {tonics.map(note =>
        <option key={note} value={note}>{note}</option>
      )}
    </select>
  </label>
);

export default TonicSelector;
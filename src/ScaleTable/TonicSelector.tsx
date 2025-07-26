import React from 'react';
import type { tNoteName, tNote } from '../PianoBase/PianoBase.types';

interface TonicSelectorProps {
  tonic: tNote;
  onChange: (tonic: tNote) => void;
}

const tonics: tNoteName[] = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B"
];

const TonicSelector: React.FC<TonicSelectorProps> = ({ tonic, onChange }) => (
  <label>
    Tónica:&nbsp;
    <select
      value={tonic}
      onChange={e => onChange(e.target.value as tNote)}
    >
      {tonics.map(note =>
        <option key={note} value={note}>{note}</option>
      )}
    </select>
  </label>
);

export default TonicSelector;
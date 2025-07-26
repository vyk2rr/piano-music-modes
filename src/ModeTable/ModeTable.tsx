import React from 'react';
import type { tMode, tScale } from './../PianoBase/PianoBase.types';
import './ModeTable.css';

export interface ModeTableProps {
  onModeClick: (mode: tMode) => void;
  scale: tScale; 
  activeMode: tMode;
}

export type ModeDefinition = {
  name: string;
  mode: tMode;
  description: string;
};

const modes: ModeDefinition[] = [
  { name: "Ionian", mode: "ionian", description: "Escala mayor natural, base tonal." },
  { name: "Dorian", mode: "dorian", description: "Menor con 6ta mayor brillante." },
  { name: "Phrygian", mode: "phrygian", description: "Menor exótico, 2da menor tensa." },
  { name: "Lydian", mode: "lydian", description: "Mayor soñador, 4ta aumentada." },
  { name: "Mixolydian", mode: "mixolydian", description: "Mayor bluesy, 7ma menor." },
  { name: "Aeolian", mode: "aeolian", description: "Menor natural, base melancólica." },
  { name: "Locrian", mode: "locrian", description: "Semidisminuido, 2da menor, 5ta b." },
];

function modeNotesFromScale(scale: tScale, n: number): tScale {
  return scale.slice(n).concat(scale.slice(0, n));
}

const modeIndexes: Record<tMode, number> = {
  ionian: 0,
  dorian: 1,
  phrygian: 2,
  lydian: 3,
  mixolydian: 4,
  aeolian: 5,
  locrian: 6,
};

const ModeTable: React.FC<ModeTableProps> = ({ scale, onModeClick, activeMode }) => {
  if (!scale || scale.length < 7) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Modo</th>
          <th>Descripción</th>
          <th>Notas</th>
        </tr>
      </thead>
      <tbody>
        {modes.map((mode) => {
          const rotated: tScale = modeNotesFromScale(scale, modeIndexes[mode.mode]);
          return (
            <tr key={mode.name}>
              <td>
                <button
                  onClick={() => onModeClick(mode.mode)}
                  aria-pressed={mode.mode === activeMode}
                  className={mode.mode === activeMode ? 'active' : ''}
                >
                  {mode.name}
                </button>
              </td>
              <td>{mode.description}</td>
              <td>{rotated.join(", ")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ModeTable;
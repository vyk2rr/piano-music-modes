import React, { ReactNode } from 'react';
import type { tMode, tScale, tChordQualities, tNoteWithOctave } from './../PianoBase/PianoBase.types';
import {
  MODE_ALTERATIONS,
  MODE_INTERVAL_PATTERNS,
  DEGREES,
} from '../PianoBase/PianoBase.types';
import { getDiatonicScale } from '../utils/getDiatonicScale';
import { getChordColor } from './../ChordPalette/ChordPalette.utils';
import { normalizeToPianoSharpScale } from './../utils/normalizeToPianoSharpScale';
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
  modernEquivalent: string;
  classicalType: tChordQualities;
  color: string;
};

const modes: ModeDefinition[] = [
  { name: "Ionian", mode: "ionian", description: "Escala mayor natural, base tonal.", modernEquivalent: "Mayor", classicalType: "maj", color: '#e74c3c' },
  { name: "Dorian", mode: "dorian", description: "Menor con 6ta mayor brillante.", modernEquivalent: "Menor Dorian", classicalType: "min", color: '#e67e22' },
  { name: "Phrygian", mode: "phrygian", description: "Menor exótico, 2da menor tensa.", modernEquivalent: "Menor Frigia", classicalType: "min", color: '#f1c40f' },
  { name: "Lydian", mode: "lydian", description: "Mayor soñador, 4ta aumentada.", modernEquivalent: "Mayor Lidia", classicalType: "maj", color: '#2ecc71' },
  { name: "Mixolydian", mode: "mixolydian", description: "Mayor bluesy, 7ma menor.", modernEquivalent: "Mayor Mixolidia", classicalType: "maj", color: '#3498db' },
  { name: "Aeolian", mode: "aeolian", description: "Menor natural, base melancólica.", modernEquivalent: "Menor natural", classicalType: "min", color: '#273c75' },
  { name: "Locrian", mode: "locrian", description: "Semidisminuido, 2da menor, 5ta b.", modernEquivalent: "Semi-disminuida", classicalType: "dim", color: '#9b59b6' },
];

function withSeparator(nodes: ReactNode[], sep: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  nodes.forEach((node, i) => {
    if (i > 0) out.push(sep);
    out.push(node);
  });
  return out;
}

const ModeTable: React.FC<ModeTableProps> = ({ scale, onModeClick, activeMode }) => {
  if (!scale || scale.length < 7) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Tipo clásico</th>
          <th>Modo</th>
          <th>Notas</th>
          <th>Grados</th>
          <th>Intervalos</th>
          <th>Equivalencia moderna</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {modes.map((mode) => {
          const diatonicScale = getDiatonicScale(scale[0], MODE_INTERVAL_PATTERNS[mode.mode]);
          const normalizedTonic = normalizeToPianoSharpScale([scale[0]])[0];
          const rowBackground = getChordColor(normalizedTonic, mode.classicalType, [normalizedTonic as tNoteWithOctave]);
          return (
            <tr
              key={mode.name}
              className={`mode-row`}
              style={{ background: rowBackground }}
            >
              <td>{mode.classicalType}</td>
              <td>
                <button
                  onClick={() => onModeClick(mode.mode)}
                  aria-pressed={mode.mode === activeMode}
                  className={mode.mode === activeMode ? 'active' : ''}
                  style={{
                    backgroundColor: mode.color,
                    color: 'white',
                    fontWeight: mode.mode === activeMode ? 'bold' : undefined,
                  }}
                >
                  {mode.name}
                </button>
              </td>
               <td>
                {withSeparator(
                  diatonicScale.map((note, i) => {
                    const isAltered = MODE_ALTERATIONS[mode.mode].some(a => a.degree === i + 1);
                    const Tag = isAltered ? 'strong' : 'span';
                    return <Tag key={i}>{note}</Tag>;
                  }),
                  ', '
                )}
              </td>
              <td>{withSeparator(DEGREES.map((deg, i) => {
                // buscamos si este grado lleva alteración
                const alt = MODE_ALTERATIONS[mode.mode].find(a => a.degree === i + 1);
                const text = deg + (alt?.alteration || '');
                const Tag = alt ? 'strong' : 'span';
                return <Tag key={deg}>{text}</Tag>;
              }), ' - ')}</td>
             
              <td>{MODE_INTERVAL_PATTERNS[mode.mode].join("-")}</td>
              <td>{mode.modernEquivalent}</td>
              <td>{mode.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ModeTable;
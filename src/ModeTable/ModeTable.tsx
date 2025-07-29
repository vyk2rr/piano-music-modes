import React, { ReactNode } from 'react';
import type { tMode, tScale } from './../PianoBase/PianoBase.types';
import {
  MODE_ALTERATIONS,
  MODE_INTERVAL_PATTERNS,
  DEGREES,
} from '../PianoBase/PianoBase.types';
import { getDiatonicScale } from '../utils/getDiatonicScale';
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
  classicalType: string;
};

const modes: ModeDefinition[] = [
  { name: "Ionian", mode: "ionian", description: "Escala mayor natural, base tonal.", modernEquivalent: "Mayor", classicalType: "Mayor" },
  { name: "Dorian", mode: "dorian", description: "Menor con 6ta mayor brillante.", modernEquivalent: "Menor Dorian", classicalType: "Menor" },
  { name: "Phrygian", mode: "phrygian", description: "Menor exótico, 2da menor tensa.", modernEquivalent: "Menor Frigia", classicalType: "Menor" },
  { name: "Lydian", mode: "lydian", description: "Mayor soñador, 4ta aumentada.", modernEquivalent: "Mayor Lidia", classicalType: "Mayor" },
  { name: "Mixolydian", mode: "mixolydian", description: "Mayor bluesy, 7ma menor.", modernEquivalent: "Mayor Mixolidia", classicalType: "Mayor" },
  { name: "Aeolian", mode: "aeolian", description: "Menor natural, base melancólica.", modernEquivalent: "Menor natural", classicalType: "Menor" },
  { name: "Locrian", mode: "locrian", description: "Semidisminuido, 2da menor, 5ta b.", modernEquivalent: "Semi-disminuida", classicalType: "Disminuido" },
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
          <th>Modo</th>
          <th>Descripción</th>
          <th>Equivalencia moderna</th>
          <th>Tipo clásico</th>
          <th>Grados</th>
          <th>Notas</th>
          <th>Intervalos</th>
        </tr>
      </thead>
      <tbody>
        {modes.map((mode) => {
          // Obtiene la escala diatónica teórica para la tónica y el modo
          const diatonicScale = getDiatonicScale(scale[0], MODE_INTERVAL_PATTERNS[mode.mode]);
          const degreeNodes: ReactNode[] = DEGREES.map((deg, i) => {
            // buscamos si este grado lleva alteración
            const alt = MODE_ALTERATIONS[mode.mode].find(a => a.degree === i + 1);
            const text = deg + (alt?.alteration || '');     // p.e. "III" o "IIIb"
            const Tag = alt ? 'strong' : 'span';           // si hay alteración, <strong>, si no <span>
            return <Tag key={deg}>{text}</Tag>;
          });
          const degreesDisplay = withSeparator(degreeNodes, ' - ');
          // Intervalos (patrón T/ST)
          const intervalsDisplay = MODE_INTERVAL_PATTERNS[mode.mode].join("-");

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
              <td>{mode.modernEquivalent}</td>
              <td>{mode.classicalType}</td>
              <td>{degreesDisplay}</td>
              <td>{diatonicScale.join(", ")}</td>
              <td>{intervalsDisplay}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ModeTable;
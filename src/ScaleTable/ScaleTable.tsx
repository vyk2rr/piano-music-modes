import React from 'react';
import type { tScaleNotes } from './../PianoBase/PianoBase.types'

export interface ScaleTableProps {
  scale: tScaleNotes;
}

const ScaleTable: React.FC<ScaleTableProps> = ({ scale }) => (
  <table>
    <thead>
      <tr>
        <th>Grado</th>
        <th>Nota</th>
        <th>Intervalo</th>
        <th>Fórmula</th>
      </tr>
    </thead>
    <tbody>
      {scale.map((item, idx) => (
        <tr key={idx}>
          <td>{item.degree}</td>
          <td>{item.note}</td>
          <td>{item.interval}</td>
          <td>{item.distanceToNext}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ScaleTable;
import React from 'react';

interface ScaleNote {
  degree: string;
  note: string;
  interval: string;
  formula: string;
}

interface ScaleTableProps {
  scale: ScaleNote[];
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
          <td>{item.formula}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ScaleTable;
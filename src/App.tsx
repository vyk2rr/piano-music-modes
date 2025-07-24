import { useState } from 'react';
import PianoBase from './PianoBase/PianoBase';
import type { tChord, tNote } from './PianoBase/PianoBase.types';
import toMusicalMode from './utils/toMusicalMode';
import normalizeToSharp from './utils/normalizeToSharp'
import createPianoSynth from './utils/createPianoSynth';
import './App.css';

function App() {
  const [currentChord, setCurrentChord] = useState<tChord>([]);
  const originalChord: tChord = ['D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6'];
  const tonic: tNote = 'D';

  return (
    <div>
      <div className="piano-container">
        <PianoBase
          highlightOnThePiano={normalizeToSharp(currentChord)}
          createSynth={createPianoSynth}
          alwaysShowNoteNames
        />
      </div>

      <h1>
        Notas: {originalChord.join(' – ')}
        <br />
        Tónica: {tonic}
      </h1>

      <table>
        <thead>
          <tr>
            <th>Modo</th>
            <th>Descripcion</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button onClick={() => setCurrentChord(originalChord)}>Normal</button></td>
            <td>Escala original</td>
            <td>{originalChord.join(", ")}</td>
          </tr>
          <tr>
            <td><button onClick={() => setCurrentChord(toMusicalMode(originalChord, 'ionian', tonic))}>Ionian</button></td>
            <td>Escala mayor natural, base tonal.</td>
            <td>{toMusicalMode(originalChord, 'ionian', tonic).join(", ")}</td>
          </tr>
          <tr>
            <td><button onClick={() => setCurrentChord(toMusicalMode(originalChord, 'dorian', tonic))}>Dorian</button></td>
            <td>Menor con 6ta mayor brillante.</td>
            <td>{toMusicalMode(originalChord, 'dorian', tonic).join(", ")}</td>
          </tr>
          <tr>
            <td><button onClick={() => setCurrentChord(toMusicalMode(originalChord, 'phrygian', tonic))}>Phrygian</button></td>
            <td>Menor exótico, 2da menor tensa.</td>
            <td>{toMusicalMode(originalChord, 'phrygian', tonic).join(", ")}</td>
          </tr>
          <tr>
            <td><button onClick={() => setCurrentChord(toMusicalMode(originalChord, 'lydian', tonic))}>Lydian</button></td>
            <td>Mayor soñador, 4ta aumentada.</td>
            <td>{toMusicalMode(originalChord, 'lydian', tonic).join(", ")}</td>
          </tr>
          <tr>
            <td><button onClick={() => setCurrentChord(toMusicalMode(originalChord, 'mixolydian', tonic))}>Mixolydian</button></td>
            <td>Mayor bluesy, 7ma menor.</td>
            <td>{toMusicalMode(originalChord, 'mixolydian', tonic).join(", ")}</td>
          </tr>
          <tr>
            <td><button onClick={() => setCurrentChord(toMusicalMode(originalChord, 'aeolian', tonic))}>Aeolian</button></td>
            <td>Menor natural, base melancólica.</td>
            <td>{toMusicalMode(originalChord, 'aeolian', tonic).join(", ")}</td>
          </tr>
          <tr>
            <td><button onClick={() => setCurrentChord(toMusicalMode(originalChord, 'locrian', tonic))}>Locrian</button></td>
            <td>Semidisminuido, 2da menor, 5ta b.</td>
            <td>{toMusicalMode(originalChord, 'locrian', tonic).join(", ")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
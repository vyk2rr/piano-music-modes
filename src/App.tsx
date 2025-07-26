import { useState, useMemo } from 'react';
import PianoBase from './PianoBase/PianoBase';
import type { tNote, tMode, tChord } from './PianoBase/PianoBase.types';
import normalizeToSharp from './utils/normalizeToSharp';
import createPianoSynth from './utils/createPianoSynth';
import TonicSelector from './ScaleTable/TonicSelector';
import ScaleTable from './ScaleTable/ScaleTable';
import ModeTable from './ModeTable/ModeTable';
import generateScale from './utils/generateScale';
import toMusicalMode from './utils/toMusicalMode';

function App() {
  const [tonic, setTonic] = useState<tNote>('C');
  const [currentChord, setCurrentChord] = useState<tChord>([]);
  const [activeMode, setActiveMode] = useState<tMode>('ionian');

  // Escala de la tónica actual
  const scale = useMemo(() => generateScale(tonic), [tonic]);
  const scaleNotes = useMemo(() => scale.map(s => s.note), [scale]);
  const baseChord: tChord = useMemo(
    () => scaleNotes.map(note => note + '5') as tChord,
    [scaleNotes]
  );

  // Cuando el usuario hace click en modo: siempre setea un array nuevo y actualiza modo activo
  const handleModeClick = (mode: tMode) => {
    const newChord = toMusicalMode(baseChord, mode, tonic);
    setCurrentChord([...newChord]);
    setActiveMode(mode);
  };

  // Cuando cambia la tónica, reproduce el modo actualmente activo automáticamente
  const handleTonicChange = (newTonic: tNote) => {
    setTonic(newTonic);
    // Genera la escala y acorde de la nueva tónica y modo activo
    const scale = generateScale(newTonic);
    const scaleNotes = scale.map(s => s.note);
    const newBaseChord: tChord = scaleNotes.map(note => note + '5') as tChord;
    const modeChord = toMusicalMode(newBaseChord, activeMode, newTonic);
    setCurrentChord([...modeChord]);
  };

  return (
    <div>
      <p>Elige una tónica y un modo para explorar cómo suenan y cómo se construyen las escalas musicales</p>

      <TonicSelector tonic={tonic} onChange={handleTonicChange} />

      <h1>Escala "{tonic}" ({activeMode}): {scaleNotes.join('-')}:</h1>
      <h1>Escala deconstruida</h1>

      <ScaleTable scale={scale} />
      <br />
      
      <ModeTable scale={scaleNotes} onModeClick={handleModeClick} />
      <br />

      <div className="piano-container">
        <PianoBase
          highlightOnThePiano={normalizeToSharp(currentChord)}
          createSynth={createPianoSynth}
          alwaysShowNoteNames
        />
      </div>
    </div>
  );
}

export default App;
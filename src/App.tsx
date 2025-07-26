import { useState, useMemo } from 'react';
import PianoBase from './PianoBase/PianoBase';
import type { tNoteName, tMode, tChord, tScale } from './PianoBase/PianoBase.types';
import normalizeToSharp from './utils/normalizeToSharp';
import createPianoSynth from './utils/createPianoSynth';
import TonicSelector from './ScaleTable/TonicSelector';
import ScaleTable from './ScaleTable/ScaleTable';
import ModeTable from './ModeTable/ModeTable';
import generateScale from './utils/generateScale';
import { getDiatonicScale } from './utils/getDiatonicScale';
import { MODE_INTERVAL_PATTERNS } from './PianoBase/PianoBase.types';

function App() {
  const [tonic, setTonic] = useState<tNoteName>();
  const [currentChord, setCurrentChord] = useState<tChord>([]);
  const [activeMode, setActiveMode] = useState<tMode>('ionian');

  // Genera la escala mayor (array de objetos con {note, ...})
  const scale = useMemo(() => (tonic ? generateScale(tonic) : []), [tonic]);
  // Obtén solo los nombres de nota (tScale: tNoteName[])
  const scaleNotes = useMemo<tScale>(() => (scale.length ? scale.map(s => s.note) : []), [scale]);

  // El acorde base es la escala mayor con octava fija (para el piano)
  const baseChord: tChord = useMemo(
    () => (scaleNotes.length ? (scaleNotes.map(note => `${note}5`) as tChord) : []),
    [scaleNotes]
  );

  // Al seleccionar un modo, transforma el acorde base usando la escala diatónica correspondiente
  const handleModeClick = (mode: tMode) => {
    if (!scaleNotes.length) return;
    const diatonicScale = getDiatonicScale(scaleNotes[0], MODE_INTERVAL_PATTERNS[mode]);
    const modalChord: tChord = diatonicScale.map(note => `${note}5`) as tChord;
    setCurrentChord([...modalChord]);
    setActiveMode(mode);
  };

  // Al cambiar tónica, reinicia el modo actual y el acorde/piano destacado
  const handleTonicChange = (newTonic: tNoteName | undefined) => {
    setTonic(newTonic);
    if (!newTonic) {
      setCurrentChord([]);
      return;
    }
    const newScale = generateScale(newTonic);
    const newScaleNotes = newScale.map(s => s.note);
    const diatonicScale = getDiatonicScale(newScaleNotes[0], MODE_INTERVAL_PATTERNS[activeMode]);
    const modalChord: tChord = diatonicScale.map(note => `${note}5`) as tChord;
    setCurrentChord([...modalChord]);
  };

  return (
    <div>
      <p>
        Elige una tónica y un modo para explorar cómo suenan y cómo se construyen las escalas musicales
      </p>
      <TonicSelector tonic={tonic} onChange={handleTonicChange} />

      {tonic ? (
        <>
          <h1>
            Escala "{tonic}" ({activeMode}): {scaleNotes.join('-')}
          </h1>
          <h1>Escala deconstruida</h1>
          <ScaleTable scale={scale} />
          <br />
          <ModeTable
            scale={scaleNotes}
            onModeClick={handleModeClick}
            activeMode={activeMode}
          />
          <br />
        </>
      ) : null}

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
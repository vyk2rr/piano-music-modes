import { useState, useMemo } from 'react';
import type { tNoteName, tMode, tChord, tScale } from './PianoBase/PianoBase.types';
import { MODE_INTERVAL_PATTERNS } from './PianoBase/PianoBase.types';
import { getDiatonicScale } from './utils/getDiatonicScale';
import createPianoSynth from './utils/createPianoSynth';
import TonicSelector from './TonicSelector/TonicSelector';
import ModeTable from './ModeTable/ModeTable';
import PianoBase from './PianoBase/PianoBase';
import normalizeToSharp from './utils/normalizeToSharp';

function App() {
  const [tonic, setTonic] = useState<tNoteName>();
  const [activeMode, setActiveMode] = useState<tMode>('ionian');
  const scaleNotes = useMemo<tScale>(() => {
    return tonic
      ? getDiatonicScale(tonic, MODE_INTERVAL_PATTERNS[activeMode])
      : [];
  }, [tonic, activeMode]);

  // TODO: Asegurarnos de que el piano recibe notas que conoce 
  // TODO2 (opcional): asegurarnos que el piano recibe lo que sea pero lo traduce a lo que conoce
  const currentChord: tChord = useMemo(
    () => scaleNotes.map(n => `${n}5`) as tChord,
    [scaleNotes]
  );

  const handleTonicChange = (newTonic: tNoteName | undefined) => {
    setTonic(newTonic);
  };

  const handleModeClick = (mode: tMode) => {
    if (!tonic) return;
    setActiveMode(mode);
  };

  return (
    <div>
      <p>
        Elige una tónica y un modo para explorar cómo suenan y cómo se construyen las escalas musicales
      </p>
      <TonicSelector tonic={tonic} onChange={handleTonicChange} />
      {tonic ? (
        <>
          <h1>Escala "{tonic}" ({activeMode}): {scaleNotes.join('-')}</h1>
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
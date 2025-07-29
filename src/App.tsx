import { useState, useMemo } from 'react';
import type { tNoteName, tMode, tChord, tScale } from './PianoBase/PianoBase.types';
import { MODE_INTERVAL_PATTERNS } from './PianoBase/PianoBase.types';
import { getDiatonicScale } from './utils/getDiatonicScale';
import createPianoSynth from './utils/createPianoSynth';
import TonicSelector from './TonicSelector/TonicSelector';
import ModeTable from './ModeTable/ModeTable';
import PianoBase from './PianoBase/PianoBase';
import normalizeToSharp from './utils/normalizeToSharp';
import normalizeToTonicContext from './utils/normalizeToTonicContext';
import octavizeScale from './utils/octavizeScale';

function App() {
  const [tonic, setTonic] = useState<tNoteName>();
  const [activeMode, setActiveMode] = useState<tMode>('ionian');

  // Paso 1: Genera la escala "raw" según modo y tónica
  const rawScale = useMemo<tScale>(() =>
    tonic ? getDiatonicScale(tonic, MODE_INTERVAL_PATTERNS[activeMode]) : [],
    [tonic, activeMode]
  );

  // Paso 2: Normaliza la escala a notación humana, sin octavas
  const notatedScale = useMemo<tScale>(
    () => (tonic ? normalizeToTonicContext(rawScale, tonic) : []),
    [rawScale, tonic]
  );

  // Paso 3: Octaviza la escala (para mostrar en UI)
  const displayScale = useMemo<tChord>(
    () => notatedScale.length > 0 ? octavizeScale(notatedScale, 5) : [],
    [notatedScale]
  );

  // Paso 4: Prepara la escala para el piano (todo en sostenidos si es necesario)
  const pianoScale = useMemo<tChord>(
    () => displayScale.length > 0 ? normalizeToSharp(displayScale) : [],
    [displayScale]
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
          <h1>Escala "{tonic}" ({activeMode}):</h1>
          <p><strong>Raw scale (cruda, literal, teórica)</strong>: {rawScale.join('-')}</p>
          <p><strong>Notación funcional (humana/estándar)</strong>: {notatedScale.join('-')}</p>
          <p><strong>Escala para ejecución con octavas</strong>: {displayScale.join('-')}</p>
          <p><strong>El piano recibe (en sostenidos)</strong>: {pianoScale.join('-')}</p>
          <br />
          <ModeTable
            scale={rawScale}
            onModeClick={handleModeClick}
            activeMode={activeMode}
          />
          <br />
        </>
      ) : null}

      <div className="piano-container">
        <PianoBase
          highlightOnThePiano={pianoScale}
          createSynth={createPianoSynth}
          alwaysShowNoteNames
        />
      </div>
    </div>
  );
}

export default App;
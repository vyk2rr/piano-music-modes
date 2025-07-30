import { useState, useMemo } from 'react';
import type { tNoteName, tMode, tChord, tScale } from './PianoBase/PianoBase.types';
import { MODE_INTERVAL_PATTERNS } from './PianoBase/PianoBase.types';
import { getDiatonicScale } from './utils/getDiatonicScale';
import { getChordColor } from './ChordPalette/ChordPalette.utils';
import createPianoSynth from './utils/createPianoSynth';
import TonicSelector from './TonicSelector/TonicSelector';
import ModeTable from './ModeTable/ModeTable';
import PianoBase from './PianoBase/PianoBase';
import normalizeToSharp from './utils/normalizeToSharp';
import { normalizeToPianoSharpScale } from './utils/normalizeToPianoSharpScale';
import octavizeScale from './utils/octavizeScale';
import ModeBreakdown from './ModeTable/ModeBreakdown';

function App() {
  const debug = false;
  const [tonic, setTonic] = useState<tNoteName>();
  const [activeMode, setActiveMode] = useState<tMode>('ionian');

  // Paso 0: Genera la escala "natural mayor" (Ejemplo Gbb: Gbb Abb Bbb Cbb Dbb Ebb Fb)
  const naturalMajorScale = useMemo<tScale>(
    () => tonic ? getDiatonicScale(tonic, MODE_INTERVAL_PATTERNS['ionian']) : [],
    [tonic]
  );

  // Paso 1: Genera la escala "raw" según modo y tónica (Ejemplo Gbb Locrian: Gbb Abbb Bbbb Cbb Dbbb Ebbb Fbb)
  const diatonicModeScale = useMemo<tScale>(() =>
    tonic ? getDiatonicScale(tonic, MODE_INTERVAL_PATTERNS[activeMode]) : [],
    [tonic, activeMode]
  );

  // Paso 2: Normaliza la escala a notación humana, sin octavas (Ejemplo Gbb: F Gb Ab Bb Cb Db Eb)
  const humanReadableScale = useMemo<tScale>(
    () => (tonic ? normalizeToPianoSharpScale(diatonicModeScale) : []),
    [diatonicModeScale, tonic]
  );

  // Paso 3: Octaviza la escala (Ejemplo Gbb Locrian: F5 Gb5 Ab5 Bb5 Cb6 Db6 Eb6)
  const octaveAssignedScale = useMemo<tChord>(
    () => humanReadableScale.length > 0 ? octavizeScale(humanReadableScale, 5) : [],
    [humanReadableScale]
  );

  // Paso 4: Para el piano(convierte flat en #, ejemplo Gbb Locrian F5 F#5 G#5 A#5 Cb6 C#6 D#6)
  const pianoScale = useMemo<tChord>(
    () => octaveAssignedScale.length > 0 ? normalizeToSharp(octaveAssignedScale) : [],
    [octaveAssignedScale]
  );

  const handleTonicChange = (newTonic: tNoteName | undefined) => {
    setTonic(newTonic);
  };

  const handleModeClick = (mode: tMode) => {
    if (!tonic) return;
    setActiveMode(mode);
  };

  const scaleGradientColor = tonic ? getChordColor(
    tonic,
    "maj",
    octaveAssignedScale
  ) : undefined;

  return (
    <div>
      <p>
        Elige una tónica y un modo para explorar cómo suenan y cómo se construyen las escalas musicales
      </p>
      <TonicSelector tonic={tonic} onChange={handleTonicChange} />
      {tonic ? (
        <>
          <h1>Modos de la escala mayor de {tonic}</h1>
          <ModeTable
            scale={diatonicModeScale}
            onModeClick={handleModeClick}
            activeMode={activeMode}
          />
          <br />

          {/* 
          <h1>starting with Ionian:</h1>
          <h1>naturalMajorScale: {naturalMajorScale.join(" ")}</h1>
          <h1>activeMode: {activeMode}</h1>
          <h1>diatonicModeScale: {diatonicModeScale.join(" ")}</h1>
          <h1>humanReadableScale: {humanReadableScale.join(" ")}</h1>
          <h1>octaveAssignedScale: {octaveAssignedScale.join(" ")}</h1>
          <h1>pianoScale: {pianoScale.join(" ")}</h1> */}
          {debug && (
            <>
              <h1>starting with Ionian:</h1>
              <h1>naturalMajorScale: {naturalMajorScale.join(" ")}</h1>
              <h1>activeMode: {activeMode}</h1>
              <h1>diatonicModeScale: {diatonicModeScale.join(" ")}</h1>
              <h1>humanReadableScale: {humanReadableScale.join(" ")}</h1>
              <h1>octaveAssignedScale: {octaveAssignedScale.join(" ")}</h1>
              <h1>pianoScale: {pianoScale.join(" ")}</h1>
            </>
          )}

          <ModeBreakdown
            tonic={tonic}
            activeMode={activeMode}
            octaveAssignedScale={octaveAssignedScale}
            naturalMajorScale={naturalMajorScale}
            diatonicModeScale={diatonicModeScale}
          />

        </>
      ) : null}

      <div
        className="piano-container"
        style={{ background: scaleGradientColor, borderRadius: 16 }}
      >
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
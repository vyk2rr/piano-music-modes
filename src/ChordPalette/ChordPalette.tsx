import React, { useState, useCallback } from "react";
import type { tChordWithName, tNote, tOctaveRange, tChord } from "../PianoBase/PianoBase.types";
import { generateChordsForNote, filterChords, getChordColor, simplifyNoteName } from "./ChordPalette.utils";
import "./chordPalette.css";

type ChordPaletteParams = {
  currentChord: tChord;
  setCurrentChord: (chord: tChord) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  octave: tOctaveRange;
};

interface tChordPaletteProps {
  params?: ChordPaletteParams;
  showNotes?: boolean;
  showName?: boolean;
  debug?: boolean;
}

export default function ChordPalette({
  params,
  showNotes = true,
  showName = true,
  debug = false
}: tChordPaletteProps) {
  const defaultOctave: tOctaveRange = 4;
  const defaultSetChord = () => {};
  const defaultSetColor = () => {};

  const {
    currentChord = [],
    setCurrentChord = defaultSetChord,
    currentColor = "#cccccc",
    setCurrentColor = defaultSetColor,
    octave = defaultOctave
  } = params || {};

  const notes: tNote[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const [showInversions, setShowInversions] = useState<boolean>(false);
  const [selectedChordId, setSelectedChordId] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const handleChordClick = useCallback((chord: tChordWithName) => {
    setCurrentChord(chord.chord);
    const baseNoteForColor = simplifyNoteName(chord.chord[0]);
    setCurrentColor(
      getChordColor(
        baseNoteForColor,
        chord.quality,
        chord.chord
      )
    );
    setSelectedChordId(chord.id);
  }, [setCurrentChord, setCurrentColor, setSelectedChordId]);

  const handleDragStart = (event: React.DragEvent, chord: tChordWithName) => {
    event.dataTransfer.setData('application/json', JSON.stringify(chord));
  };

  return (
    <>
      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter chords (e.g. 'C', 'C E', 'C-E')"
            className="chord-search"
          />
        </div>
        <div className="palette-controls">
          <button onClick={() => setShowInversions(prev => !prev)} className="control-button">
            {showInversions ? "Ocultar inversiones" : "Mostrar inversiones"}
          </button>
        </div>
      </div>

      {debug && (
        <>
          <h3>Debug Info</h3>
          currentChord: {currentChord.join(", ")}<br />
          currentColor: {currentColor}<br />
          showInversions: {showInversions ? "si" : "no"}<br />
          selectedChordId: {selectedChordId}<br />
          searchFilter: {searchFilter}<br />
        </>
      )}
      <div className="chord-columns">
        {notes.map(note => {
          const chordsForNote: tChordWithName[] = generateChordsForNote(note, octave);
          const filteredChords = filterChords(chordsForNote, searchFilter)
            .filter(chord => showInversions || !chord.id.includes('_inv'));

          if (filteredChords.length === 0 && searchFilter) return null;

          return (
            <div key={note} className="chord-column">
              <h2>{note} Chords</h2>
              {filteredChords.map(chord => {
                const isInvestment = chord.id.includes('_inv');
                const baseNoteForColor = simplifyNoteName(chord.chord[0]);
                return (
                  <button
                    key={chord.id}
                    aria-label={`${chord.name} ${chord.chord.map(n => n.replace(/\d+$/, '')).join(' ')}`}
                    onClick={() => handleChordClick(chord)}
                    style={{
                      background: getChordColor(
                        baseNoteForColor,
                        chord.quality,
                        chord.chord
                      )
                    }}
                    className={`chord-button ${isInvestment ? 'inverted' : ''} ${selectedChordId === chord.id ? 'selected' : ''}`}
                    draggable
                    onDragStart={e => handleDragStart(e, chord)}
                  >
                    {showName && <div className="chord-name">{chord.name}</div>}
                    {showNotes && (
                      <div className="chord-notes-row">
                        {chord.chord.map((note) => (
                          <div className="chord-note-band" key={note}>
                            {note}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
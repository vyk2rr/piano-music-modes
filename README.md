# Piano Music Modes

**Playing with musical modes (D tonic, D scale)**

---

## Overview

This project is an interactive visualizer for musical modes using a piano interface. You can explore how different modes (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian) affect the notes of a scale, with D as the tonic. The app highlights the notes on a virtual piano and lets you listen to each mode.

---

## Features

- **Interactive Piano:** Highlights notes for the selected mode.
- **Mode Table:** Shows buttons for each mode, their description, and the notes.
- **Ear Training Synth:** Uses Tone.js for clear, practical sound.
- **Note Name Display:** Option to always show note names.
- **Error Highlighting:** Visual feedback for incorrect notes (if needed).
- **Alternative Notation:** Shows flat equivalents for black keys.

---

## Usage

1. **Select a mode** by clicking its button in the table.
2. **See the notes** for the mode and their description.
3. **Highlighted notes** appear on the piano.
4. **Click piano keys** to play notes and get visual feedback.

---

## Tech Stack

- **React** (TypeScript)
- **Tone.js** (audio synthesis)
- **Jest** + **Testing Library** (unit and interaction tests)

---

## Development & Testing

- All musical mode logic is tested (`src/utils/toMusicalMode.test.ts`).
- Piano rendering and interaction are tested (`src/PianoBase/PianoBase.test.tsx`).
- App integration and mode switching are tested (`src/App.test.tsx`).
- Tone.js is mocked for tests to avoid Web Audio API issues.

---

## License

Currently, **no license is specified**—all rights reserved by default.

---

## Disclaimer

This is a learning and exploration project.  
Feel free to reach out if you want to discuss or contribute.

---

## Author

vyk2rr (GitHub)
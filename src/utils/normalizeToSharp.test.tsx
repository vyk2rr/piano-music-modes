import normalizeToSharp from './normalizeToSharp';
import type { tNoteWithOctave } from '../PianoBase/PianoBase.types';

describe('normalizeToSharp', () => {
  it('converts flats to sharps', () => {
    const input: tNoteWithOctave[] = ['Ab4', 'Bb3', 'Db5', 'Eb2', 'Gb6'];
    const output = normalizeToSharp(input);
    expect(output).toEqual(['G#4', 'A#3', 'C#5', 'D#2', 'F#6']);
  });

  it('leaves sharps unchanged', () => {
    const input: tNoteWithOctave[] = ['C#4', 'D#5', 'F#6'];
    const output = normalizeToSharp(input);
    expect(output).toEqual(['C#4', 'D#5', 'F#6']);
  });

  it('leaves natural notes unchanged', () => {
    const input: tNoteWithOctave[] = ['C4', 'D3', 'E5', 'G2'];
    const output = normalizeToSharp(input);
    expect(output).toEqual(['C4', 'D3', 'E5', 'G2']);
  });

  it('returns the original note for invalid input', () => {
    // Formato incorrecto: no debe tronar, solo dejar igual
    const input = ['Z9', '123', '', 'C##4'];
    const output = normalizeToSharp(input as any); 
    expect(output).toEqual(['Z9', '123', '', 'C##4']);
    
  });
});
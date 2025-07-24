import * as Tone from 'tone';

// Function to create a clear, practical PolySynth for ear training
export default function createPianoSynth(): Tone.PolySynth {
  // Configure a PolySynth with a clean, bright tone
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: 'triangle', // Bright, clear, and harmonic-rich for distinct notes
    },
    envelope: {
      attack: 0.05, // Quick attack for precise note starts
      decay: 0.2, // Short decay for clarity
      sustain: 0.7, // Moderate sustain for natural feel
      release: 0.5, // Short release to avoid overlap in fast passages
    },
    volume: -12, // Balanced volume for clean output
  });

  // Add a gentle lowpass filter for warmth
  const filter = new Tone.Filter({
    type: 'lowpass',
    frequency: 3500, // Keeps brightness but softens harsh edges
    Q: 0.4, // Smooth resonance for natural tone
  });

  // Add subtle chorus for slight depth and movement
  const chorus = new Tone.Chorus({
    frequency: 0.2, // Slow modulation for subtle vibrato
    delayTime: 2, // Minimal delay for light ensemble effect
    depth: 0.4, // Subtle depth to avoid overpowering
    wet: 0.3, // Light chorus mix for clarity
  }).start();

  // Add minimal reverb for a touch of space
  const reverb = new Tone.Reverb({
    decay: 1.5, // Short decay for clean, non-muddy sound
    wet: 0.2, // Subtle reverb to avoid washing out notes
  });

  // Chain the effects: synth -> filter -> chorus -> reverb -> destination
  synth.chain(filter, chorus, reverb, Tone.Destination);

  return synth;
}
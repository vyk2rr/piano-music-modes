import * as Tone from 'tone';

export default function createPianoSynth(): Tone.PolySynth {
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: 'triangle',
    },
    envelope: {
      attack: 0,
      decay: 10,
      sustain: 0,
      release: 0.5,
    },
    volume: -5,
  });

  const filter = new Tone.Filter({
    type: 'lowpass',
    frequency: 1200,
    Q: 0.4,
  });

  synth.chain(filter, Tone.getDestination());

  return synth;
}
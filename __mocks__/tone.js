const jestFn = () => jest.fn();

const mockChainable = {
  toDestination: jestFn(),
  connect: jestFn(),
  chain: jest.fn(function() { return this; }),
  dispose: jestFn(),
};

const triggerAttackReleaseMock = jest.fn();

const PolySynth = jest.fn().mockImplementation(() => ({
  toDestination: () => {},
  connect: () => {},
  chain: function() { return this; },
  dispose: () => {},
  triggerAttackRelease: triggerAttackReleaseMock,
}));

const transportMock = {
  bpm: { value: 120 },
  start: jestFn(),
  pause: jestFn(),
  stop: jestFn(),
  cancel: jestFn(),
  state: 'stopped',
  scheduleOnce: jest.fn((callback) => {
    if (typeof callback === 'function') callback();
  }),
  position: 0,
};

const destinationMock = {
  volume: { value: 0 },
  chain: jestFn(),
  toDestination: jestFn(),
};

const Frequency = jest.fn((note) => {
  const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteMatch = note.match(/([A-G]#?)(\d+)/);
  
  if (!noteMatch) {
    return { transpose: () => ({ toNote: () => 'C4' }) };
  }

  const [, noteName, octaveStr] = noteMatch;
  const octave = parseInt(octaveStr, 10);

  return {
    transpose: jest.fn((interval) => {
      const startIndex = chromatic.indexOf(noteName);
      if (startIndex === -1) {
        return { toNote: () => note };
      }
      
      const totalSemitones = startIndex + interval;
      const newNoteIndex = (totalSemitones % 12 + 12) % 12;
      const octaveOffset = Math.floor(totalSemitones / 12);
      
      const newNoteName = chromatic[newNoteIndex];
      const newOctave = octave + octaveOffset;
      
      return {
        toNote: jest.fn(() => `${newNoteName}${newOctave}`),
      };
    }),
  };
});

const Part = jest.fn(() => ({
  start: jestFn(),
  stop: jestFn(),
  dispose: jestFn(),
}));

const Filter = jest.fn().mockImplementation(() => ({
  connect: jestFn(),
  toDestination: jestFn(),
  dispose: jestFn(),
}));

const Chorus = jest.fn().mockImplementation(() => ({
  connect: jestFn(),
  toDestination: jestFn(),
  dispose: jestFn(),
  start: jestFn(),
}));

const Reverb = jest.fn().mockImplementation(() => ({
  connect: jestFn(),
  toDestination: jestFn(),
  dispose: jestFn(),
}));

module.exports = {
  __esModule: true,
  PolySynth,
  Synth: PolySynth,
  Frequency,
  Part,
  Filter,
  Chorus,
  Reverb,
  Time: jest.fn(() => ({
    toMilliseconds: () => 500,
    toSeconds: () => 0.5,
  })),
  now: jest.fn(() => performance.now()),
  start: jest.fn(() => Promise.resolve()),
  getTransport: () => transportMock,
  getDestination: () => destinationMock,
  context: {
    state: 'running',
    resume: () => Promise.resolve(),
  },
  triggerAttackReleaseMock,
  renderHook: jest.fn((callback) => {
    callback();
    return {
      result: {
        current: {
          triggerAttackRelease: triggerAttackReleaseMock,
          toDestination: () => ({}),
          connect: () => ({}),
          chain: () => ({}),
          dispose: () => {},
        },
      },
    };
  }),
};
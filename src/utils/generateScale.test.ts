import generateScale from './generateScale';
import type { tNote } from '../PianoBase/PianoBase.types';

describe('generateScale', () => {
  it('returns the correct major scale structure for C', () => {
    const tonic: tNote = 'C';
    const scale = generateScale(tonic);

    expect(scale).toHaveLength(7);
    expect(scale).toEqual([
      { degree: 'I',   note: 'C',  interval: 'Tónica',    distanceToNext: 'T' },
      { degree: 'II',  note: 'D',  interval: '2da mayor', distanceToNext: 'T' },
      { degree: 'III', note: 'E',  interval: '3ra mayor', distanceToNext: 'ST' },
      { degree: 'IV',  note: 'F',  interval: '4ta justa', distanceToNext: 'T' },
      { degree: 'V',   note: 'G',  interval: '5ta justa', distanceToNext: 'T' },
      { degree: 'VI',  note: 'A',  interval: '6ta mayor', distanceToNext: 'T' },
      { degree: 'VII', note: 'B',  interval: '7ma mayor', distanceToNext: 'ST' },
    ]);
  });

  it('returns the correct major scale structure for G', () => {
    const tonic: tNote = 'G';
    const scale = generateScale(tonic);

    expect(scale).toHaveLength(7);
    expect(scale).toEqual([
      { degree: 'I',   note: 'G',  interval: 'Tónica',    distanceToNext: 'T' },
      { degree: 'II',  note: 'A',  interval: '2da mayor', distanceToNext: 'T' },
      { degree: 'III', note: 'B',  interval: '3ra mayor', distanceToNext: 'ST' },
      { degree: 'IV',  note: 'C',  interval: '4ta justa', distanceToNext: 'T' },
      { degree: 'V',   note: 'D',  interval: '5ta justa', distanceToNext: 'T' },
      { degree: 'VI',  note: 'E',  interval: '6ta mayor', distanceToNext: 'T' },
      { degree: 'VII', note: 'F#', interval: '7ma mayor', distanceToNext: 'ST' },
    ]);
  });

  it('returns an empty array for invalid tonic', () => {
    // @ts-expect-error purposely passing invalid tonic
    const scale = generateScale('H');
    expect(scale).toEqual([
      { degree: 'I',   note: '', interval: 'Tónica', distanceToNext: 'T' },
      { degree: 'II',  note: '', interval: '2da mayor', distanceToNext: 'T' },
      { degree: 'III', note: '', interval: '3ra mayor', distanceToNext: 'ST' },
      { degree: 'IV',  note: '', interval: '4ta justa', distanceToNext: 'T' },
      { degree: 'V',   note: '', interval: '5ta justa', distanceToNext: 'T' },
      { degree: 'VI',  note: '', interval: '6ta mayor', distanceToNext: 'T' },
      { degree: 'VII', note: '', interval: '7ma mayor', distanceToNext: 'ST' },
    ]);
  });

  it('returns the correct major scale structure for F', () => {
    const tonic: tNote = 'F';
    const scale = generateScale(tonic);

    expect(scale).toHaveLength(7);
    expect(scale).toEqual([
      { degree: 'I',   note: 'F',  interval: 'Tónica',    distanceToNext: 'T' },
      { degree: 'II',  note: 'G',  interval: '2da mayor', distanceToNext: 'T' },
      { degree: 'III', note: 'A',  interval: '3ra mayor', distanceToNext: 'ST' },
      { degree: 'IV',  note: 'A#', interval: '4ta justa', distanceToNext: 'T' },
      { degree: 'V',   note: 'C',  interval: '5ta justa', distanceToNext: 'T' },
      { degree: 'VI',  note: 'D',  interval: '6ta mayor', distanceToNext: 'T' },
      { degree: 'VII', note: 'E',  interval: '7ma mayor', distanceToNext: 'ST' },
    ]);
  });
});
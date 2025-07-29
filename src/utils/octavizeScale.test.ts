import octavizeScale from './octavizeScale';

describe('octavizeScale', () => {
  it('octaviza escala que NO contiene C', () => {
    expect(octavizeScale(['F', 'G', 'A', 'B'], 5)).toEqual(['F5', 'G5', 'A5', 'B5']);
  });

  it('octaviza escala que contiene una C', () => {
    expect(octavizeScale(['F', 'G', 'A', 'B', 'C', 'D', 'E'], 5)).toEqual(
      ['F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6']
    );
  });

  it('octaviza escala que empieza con C', () => {
    expect(octavizeScale(['C', 'D', 'E', 'F'], 4)).toEqual(['C4', 'D4', 'E4', 'F4']);
  });

  it('octaviza escala que contiene más de una C', () => {
    expect(octavizeScale(['G', 'A', 'B', 'C', 'D', 'E', 'F', 'C'], 3)).toEqual(
      ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'C5']
    );
  });

  it('usa octava inicial por defecto si no se especifica', () => {
    expect(octavizeScale(['F', 'G', 'A', 'B', 'C'])).toEqual(['F5', 'G5', 'A5', 'B5', 'C6']);
  });

  it('octaviza mezcla de notas válidas y minúsculas al final', () => {
    expect(
      octavizeScale([
        'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'A', 'B', 'C', 'D', 'E', 'F'
      ] as any, 2)
    ).toEqual([
      'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3',
      'A3', 'B3', 'C4', 'D4', 'E4', 'F4',
      'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5'
    ]);
  });
});
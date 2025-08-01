import React from 'react';
import { render } from '@testing-library/react';
import MiniPianoSvg from './MiniPianoSvg';
import type { tNoteName } from '../PianoBase/PianoBase.types';

describe('MiniPianoSvg', () => {
  it('renderiza 7 teclas blancas', () => {
    const { container } = render(<MiniPianoSvg />);
    // Debe haber 7 rect blancos (fill="#fff")
    const whiteKeys = container.querySelectorAll('rect[fill="#fff"]');
    expect(whiteKeys.length).toBe(7);
  });

  it('resalta teclas blancas pasadas en highlight', () => {
    const highlights: tNoteName[] = ['C', 'E'];
    const { container } = render(<MiniPianoSvg highlight={highlights} />);
    // Color de highlight de blanca: #ffd700
    const highlighted = Array.from(container.querySelectorAll('rect')).filter(
      rect => rect.getAttribute('fill') === '#ffd700'
    );
    expect(highlighted.length).toBe(2);
  });

  it('resalta teclas negras pasadas en highlight', () => {
    const highlights: tNoteName[] = ['D#'];
    const { container } = render(<MiniPianoSvg highlight={highlights} />);
    // Color de highlight de negra: #ff8500
    const highlighted = Array.from(container.querySelectorAll('rect')).filter(
      rect => rect.getAttribute('fill') === '#ff8500'
    );
    expect(highlighted.length).toBe(1);
  });

  it('resalta todas blancas y negras', () => {
    const highlights: tNoteName[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'D#', 'F#', 'G#', 'A#'];
    const { container } = render(<MiniPianoSvg highlight={highlights} />);
    const whiteHighlighted = Array.from(container.querySelectorAll('rect')).filter(
      rect => rect.getAttribute('fill') === '#ffd700'
    );
    const blackHighlighted = Array.from(container.querySelectorAll('rect')).filter(
      rect => rect.getAttribute('fill') === '#ff8500'
    );
    expect(whiteHighlighted.length).toBe(7);
    expect(blackHighlighted.length).toBe(5);
  });

  it('no resalta ninguna tecla si highlight es vacío', () => {
    const { container } = render(<MiniPianoSvg highlight={[]} />);
    const highlighted = Array.from(container.querySelectorAll('rect')).filter(
      rect => rect.getAttribute('fill') === '#ffd700' || rect.getAttribute('fill') === '#ff8500'
    );
    expect(highlighted.length).toBe(0);
  });

  it('renderiza 12 teclas en total: 7 blancas y 5 negras', () => {
    const { container } = render(<MiniPianoSvg />);
    const whiteKeys = container.querySelectorAll('rect[fill="#fff"]');
    const blackKeys = container.querySelectorAll('rect[fill="#000"]');
    expect(whiteKeys.length).toBe(7);
    expect(blackKeys.length).toBe(5);
    expect(whiteKeys.length + blackKeys.length).toBe(12);
  });
});
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PianoBase from './PianoBase';
import type { PianoBaseHandle } from './PianoBase';
import { PianoObserver } from '../PianoObserver/PianoObserver';
import type { iChordEvent, tNoteWithOctave, tMelodySequence } from './PianoBase.types';
import useToneJs from '../hooks/useToneJs/useToneJs';
import useHighlight from '../hooks/useHighlight/useHighlight';

// Mock the custom hooks
jest.mock('../hooks/useToneJs/useToneJs');
jest.mock('../hooks/useHighlight/useHighlight');

// Typecast the mock for easier use
const mockedUseToneJs = useToneJs as jest.Mock;
const mockedUseHighlight = useHighlight as jest.Mock;

// Mock PianoObserver
class MockPianoObserver extends PianoObserver {
  notify = jest.fn();
}

describe('PianoBase', () => {
  let mockPianoObserver: MockPianoObserver;
  let mockToneJsFns: ReturnType<typeof useToneJs>;
  let mockHighlightFns: ReturnType<typeof useHighlight>;
  // The handle in the source file is missing some methods, so we extend it here for testing purposes.
  type ExtendedPianoBaseHandle = PianoBaseHandle & {
    playArpeggio: (chord: tNoteWithOctave[], duration: string) => void;
    playChord: (chord: tNoteWithOctave[], duration: string) => void;
  };
  let pianoRef: React.RefObject<ExtendedPianoBaseHandle | null>;


  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup mock return values for the hooks
    mockToneJsFns = {
      isReady: true,
      start: jest.fn().mockResolvedValue(undefined), // Corrected: use 'start' as per useToneJs hook
      play: jest.fn(),
      pause: jest.fn(),
      stop: jest.fn(),
      scheduleMelody: jest.fn(),
      playNote: jest.fn(),
      playChord: jest.fn(),
      playArpeggio: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      durationToMs: jest.fn((duration: any) => (typeof duration === 'number' ? duration : 250)),
      setBpm: jest.fn(),
      cancelScheduledEvents: jest.fn(),
      setMasterVolume: jest.fn(),
      synthRef: React.createRef(),
    };
    mockedUseToneJs.mockReturnValue(mockToneJsFns);

    mockHighlightFns = {
      highlightNoteInGroup: jest.fn(),
      highlightClickedNote: jest.fn(),
      clearAllHighlights: jest.fn(),
      clearGroupHighlights: jest.fn(),
      isNoteClicked: jest.fn().mockReturnValue(false),
      isNoteInGroup: jest.fn().mockReturnValue(false),
      clickedNotes: [],
      highlightGroups: [[], []],
    };
    mockedUseHighlight.mockReturnValue(mockHighlightFns);

    mockPianoObserver = new MockPianoObserver();
    pianoRef = React.createRef<ExtendedPianoBaseHandle>();
  });

  describe('Rendering and Basic Props', () => {
    it('renders the piano with default octaves', () => {
      render(<PianoBase />);
      expect(screen.getByTestId('piano-base')).toBeInTheDocument();
      // Default: 3 octaves starting at 4. Should include C4, C5, C6, C7.
      expect(screen.getByText('C4')).toBeInTheDocument();
      expect(screen.getByText('C7')).toBeInTheDocument();
    });

    it('renders with custom octaves and starting octave', () => {
      render(<PianoBase octaves={2} octave={2} />);
      // Should render from C2 to C4
      expect(screen.getByText('C2')).toBeInTheDocument();
      expect(screen.getByText('C4')).toBeInTheDocument();
      expect(screen.queryByText('C5')).not.toBeInTheDocument();
    });

    it('applies a custom className', () => {
      render(<PianoBase className="my-custom-piano" />);
      expect(screen.getByTestId('piano-base')).toHaveClass('my-custom-piano');
    });

    it('uses a custom renderUI function when provided', () => {
      const customRenderFn = jest.fn(() => <div data-testid="custom-ui">Custom UI</div>);
      render(<PianoBase renderUI={customRenderFn} />);
      expect(screen.getByTestId('custom-ui')).toBeInTheDocument();
      expect(screen.queryByTestId('piano-base')?.querySelector('.piano')).not.toBeInTheDocument();
      expect(customRenderFn).toHaveBeenCalled();
    });
  });

  describe('User Interaction', () => {
    it('handles clicking a key, plays note, highlights, and notifies observer', () => {
      render(<PianoBase pianoObservable={mockPianoObserver} />);
      const keyElement = screen.getByTestId('piano-base').querySelector('[data-note="C4"]')!;
      fireEvent.click(keyElement);

      expect(mockHighlightFns.highlightClickedNote).toHaveBeenCalledWith('C4', 180);
      expect(mockToneJsFns.playNote).toHaveBeenCalledWith('C4');
      expect(mockPianoObserver.notify).toHaveBeenCalledWith({ type: 'notePlayed', note: 'C4' });
    });

    it('does not throw error if pianoObservable is not provided on key click', () => {
      render(<PianoBase />);
      const keyElement = screen.getByTestId('piano-base').querySelector('[data-note="C4"]')!;
      expect(() => fireEvent.click(keyElement)).not.toThrow();
      expect(mockPianoObserver.notify).not.toHaveBeenCalled();
    });
  });

  describe('Imperative Handle (ref)', () => {
    beforeEach(() => {
      render(<PianoBase ref={pianoRef} pianoObservable={mockPianoObserver} createSynth={jest.fn()} />);
    });

    it('exposes control methods that call useToneJs functions', async () => {
      expect(pianoRef.current).toBeDefined();

      await act(async () => {
        await pianoRef.current?.startTone();
      });
      expect(mockToneJsFns.start).toHaveBeenCalledTimes(1);

      act(() => pianoRef.current?.play());
      expect(mockToneJsFns.play).toHaveBeenCalledTimes(1);

      act(() => pianoRef.current?.pause());
      expect(mockToneJsFns.pause).toHaveBeenCalledTimes(1);

      act(() => pianoRef.current?.stop());
      expect(mockToneJsFns.stop).toHaveBeenCalledTimes(1);
    });

    it('exposes scheduleMelody which calls useToneJs scheduleMelody', () => {
      const sequence: tMelodySequence = [{ pitches: ['C4'], duration: '4n', time: '0' }];
      const onEvent = jest.fn();
      const onComplete = jest.fn();

      act(() => pianoRef.current?.scheduleMelody(sequence, onEvent, onComplete));
      expect(mockToneJsFns.scheduleMelody).toHaveBeenCalledWith(sequence, onEvent, onComplete);
    });

    it('exposes playArpeggio which calls useToneJs playArpeggio', () => {
      const chord: tNoteWithOctave[] = ['C4', 'E4', 'G4'];
      const duration = '4n';
      const interval = '16n';
      const velocity = 0.7;
      act(() => pianoRef.current?.playArpeggio(chord, duration, interval, velocity));
      expect(mockToneJsFns.playArpeggio).toHaveBeenCalledWith(chord, duration, interval, velocity);
    });

    it('exposes playChord which calls useToneJs playChord', () => {
      const chord: tNoteWithOctave[] = ['C4', 'E4', 'G4'];
      const duration = '4n';
      act(() => pianoRef.current?.playChord(chord, duration));
      expect(mockToneJsFns.playChord).toHaveBeenCalledWith(chord, duration);
    });

    it('handleMelodyEvent notifies observer and highlights notes', () => {
      const event: iChordEvent = { pitches: ['C4', 'E4', 'G4'], duration: '2n', time: '0:0:0', highlightGroup: 1 };
      const visualDuration = 250 + 80;
      (mockToneJsFns.durationToMs as jest.Mock).mockReturnValue(250);

      act(() => { pianoRef.current?.handleMelodyEvent(event); });

      expect(mockPianoObserver.notify).toHaveBeenCalledWith({ type: 'chordPlayed', chord: event.pitches });
      expect(mockHighlightFns.highlightNoteInGroup).toHaveBeenCalledTimes(3);
      expect(mockHighlightFns.highlightNoteInGroup).toHaveBeenCalledWith('C4', visualDuration, 0);
    });

    it('handleMelodyEvent does nothing if highlightGroup is undefined', () => {
      const event: iChordEvent = { pitches: ['C4', 'E4', 'G4'], duration: '2n', time: '0:0:0' };
      act(() => { pianoRef.current?.handleMelodyEvent(event); });
      expect(mockPianoObserver.notify).toHaveBeenCalledWith({ type: 'chordPlayed', chord: event.pitches });
      expect(mockHighlightFns.highlightNoteInGroup).not.toHaveBeenCalled();
    });

    it('handleMelodyEvent does not notify or highlight if pitches are empty', () => {
      const event: iChordEvent = { pitches: [], duration: '2n', time: '0:0:0', highlightGroup: 1 };
      act(() => { pianoRef.current?.handleMelodyEvent(event); });
      expect(mockPianoObserver.notify).not.toHaveBeenCalled();
      expect(mockHighlightFns.highlightNoteInGroup).not.toHaveBeenCalled();
    });

    it('exposes isReady state from useToneJs', () => {
      const { rerender } = render(<PianoBase ref={pianoRef} />);
      expect(pianoRef.current?.isReady).toBe(true);

      mockedUseToneJs.mockReturnValue({ ...mockToneJsFns, isReady: false });
      rerender(<PianoBase ref={pianoRef} />);
      expect(pianoRef.current?.isReady).toBe(false);
    });
  });

  describe('Highlighting Logic', () => {
    it('highlights notes when highlightOnThePiano prop is an array', () => {
      const chordToHighlight: tNoteWithOctave[] = ['C4', 'E4', 'G4'];
      render(<PianoBase highlightOnThePiano={chordToHighlight} />);

      expect(mockHighlightFns.clearGroupHighlights).toHaveBeenCalledWith(0);
      expect(mockToneJsFns.playArpeggio).toHaveBeenCalledTimes(1);
      expect(mockHighlightFns.highlightNoteInGroup).toHaveBeenCalledTimes(3);
      chordToHighlight.forEach(note => {
        expect(mockToneJsFns.playArpeggio).toHaveBeenCalledWith(chordToHighlight, '4n', '16n', 0.7);
        expect(mockHighlightFns.highlightNoteInGroup).toHaveBeenCalledWith(note, Infinity, 0);
      });
    });

    it('highlights a single note when highlightOnThePiano is a string', () => {
      const noteToHighlight: tNoteWithOctave = 'G4';
      render(<PianoBase highlightOnThePiano={[noteToHighlight]} />);

      expect(mockHighlightFns.clearGroupHighlights).toHaveBeenCalledWith(0);
      expect(mockToneJsFns.playArpeggio).toHaveBeenCalledWith([noteToHighlight], '4n', '16n', 0.7);
      expect(mockHighlightFns.highlightNoteInGroup).toHaveBeenCalledWith(noteToHighlight, Infinity, 0);
    });

    it('updates highlights when highlightOnThePiano prop changes', () => {
      render(<PianoBase highlightOnThePiano={['C4', 'E4', 'G4']} />);
      jest.clearAllMocks();
      const newChord: tNoteWithOctave[] = ['D4', 'F#4', 'A4'];
      const { rerender } = render(<PianoBase />);
      rerender(<PianoBase highlightOnThePiano={newChord} />);

      expect(mockHighlightFns.clearGroupHighlights).toHaveBeenCalledWith(0);
      expect(mockToneJsFns.playArpeggio).toHaveBeenCalledTimes(1);
      newChord.forEach(note => {
        expect(mockHighlightFns.highlightNoteInGroup).toHaveBeenCalledWith(note, Infinity, 0);
      });
    });

    it('applies correct classes based on useHighlight state', () => {
      (mockHighlightFns.isNoteClicked as jest.Mock).mockImplementation((note: tNoteWithOctave) => note === 'C4');
      (mockHighlightFns.isNoteInGroup as jest.Mock).mockImplementation((note: tNoteWithOctave, group: number) => note === 'E4' && group === 0);

      render(<PianoBase />);
      const piano = screen.getByTestId('piano-base');
      const c4Key = piano.querySelector('[data-note="C4"]');
      const e4Key = piano.querySelector('[data-note="E4"]');
      const g4Key = piano.querySelector('[data-note="G4"]');

      expect(g4Key).toBeInTheDocument();
      expect(c4Key).toHaveClass('active-key');
      expect(e4Key).toHaveClass('highlight-group-1');
      expect(g4Key).not.toHaveClass('active-key');
      expect(g4Key).not.toHaveClass('highlight-group-1');
    });
  });

  describe('Error Highlighting', () => {
    it('applies the error-highlight class to notes in the errorNotes prop', () => {
      const errorNotes: tNoteWithOctave[] = ['C4', 'F#5'];
      render(<PianoBase errorNotes={errorNotes} />);
      
      const piano = screen.getByTestId('piano-base');
      const c4Key = piano.querySelector('[data-note="C4"]');
      const fSharp5Key = piano.querySelector('[data-note="F#5"]');
      const d4Key = piano.querySelector('[data-note="D4"]');

      expect(c4Key).toHaveClass('error-highlight');
      expect(fSharp5Key).toHaveClass('error-highlight');
      expect(d4Key).not.toHaveClass('error-highlight');
    });

    it('error-highlight should have priority over other highlights', () => {
      const errorNotes: tNoteWithOctave[] = ['E4'];
      const regularHighlight: tNoteWithOctave[] = ['E4', 'G4'];
      
      // Mock que E4 está "clicado"
      (mockHighlightFns.isNoteClicked as jest.Mock).mockImplementation((note: tNoteWithOctave) => note === 'E4');
      // Mock que las notas en `regularHighlight` están en el grupo 1
      (mockHighlightFns.isNoteInGroup as jest.Mock).mockImplementation(
        (note: tNoteWithOctave, group: number) => regularHighlight.includes(note) && group === 0
      );

      render(<PianoBase errorNotes={errorNotes} highlightOnThePiano={regularHighlight} />);
      
      const piano = screen.getByTestId('piano-base');
      const e4Key = piano.querySelector('[data-note="E4"]');
      const g4Key = piano.querySelector('[data-note="G4"]');

      // E4 debería tener SOLO error-highlight, ninguna otra clase de resaltado
      expect(e4Key).toHaveClass('error-highlight');
      expect(e4Key).not.toHaveClass('highlight-group-1');
      expect(e4Key).not.toHaveClass('active-key');

      // G4 debería tener su resaltado normal
      expect(g4Key).toHaveClass('highlight-group-1');
      expect(g4Key).not.toHaveClass('error-highlight');
    });
  });

  describe('alwaysShowNoteNames', () => {
    it('muestra el nombre de la nota en todas las teclas blancas y negras cuando alwaysShowNoteNames es true', () => {
      render(<PianoBase alwaysShowNoteNames />);
      const piano = screen.getByTestId('piano-base');
      // Busca varias teclas blancas y negras
      expect(piano.querySelector('[data-note="C4"] .note-name')).toBeInTheDocument();
      expect(piano.querySelector('[data-note="D#4"] .note-name')).toBeInTheDocument();
      expect(piano.querySelector('[data-note="F#5"] .note-name')).toBeInTheDocument();
      // Deben mostrarse en todas las teclas
      piano.querySelectorAll('.white-key, .black-key').forEach(key => {
        expect(key.querySelector('.note-name')).toBeInTheDocument();
      });
    });

    it('no muestra el nombre de la nota en teclas sin highlight si alwaysShowNoteNames es false', () => {
      render(<PianoBase alwaysShowNoteNames={false} />);
      const piano = screen.getByTestId('piano-base');
      // Busca una tecla blanca y negra sin highlight
      expect(piano.querySelector('[data-note="D4"] .note-name')).not.toBeInTheDocument();
      expect(piano.querySelector('[data-note="G#4"] .note-name')).not.toBeInTheDocument();
    });
  });

  describe('getAlternativeNotation', () => {
    it('muestra la notación alternativa (bemol) en teclas negras', () => {
      render(<PianoBase alwaysShowNoteNames />);
      const piano = screen.getByTestId('piano-base');
      // Busca una tecla negra con notación alternativa
      const gSharpKey = piano.querySelector('[data-note="G#4"]');
      expect(gSharpKey).toBeInTheDocument();
      const flatNotation = gSharpKey?.querySelector('.flat-notation');
      expect(flatNotation).toBeInTheDocument();
      expect(flatNotation?.textContent).toBe('Ab4');
    });

    it('no muestra notación alternativa en teclas blancas', () => {
      render(<PianoBase alwaysShowNoteNames />);
      const piano = screen.getByTestId('piano-base');
      const cKey = piano.querySelector('[data-note="C4"]');
      expect(cKey).toBeInTheDocument();
      expect(cKey?.querySelector('.flat-notation')).not.toBeInTheDocument();
    });
  });
});
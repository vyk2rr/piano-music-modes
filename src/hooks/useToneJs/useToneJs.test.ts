import { renderHook, act, waitFor } from '@testing-library/react';
import useToneJs from './useToneJs';
import { getTransport, getDestination, start, Part as PartMock } from 'tone';
import { SupportedSynthType } from './useToneJs';
import { tMelodySequence } from '../../PianoBase/PianoBase.types';

const triggerAttackReleaseMock = jest.fn();

type TransportType = ReturnType<typeof getTransport>;
type DestinationType = ReturnType<typeof getDestination>;

describe('useToneJs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getTransport() as TransportType).bpm.value = 120;
    (getDestination() as DestinationType).volume.value = 0;
  });

  it('sets initial bpm and volume', () => {
    renderHook(() => useToneJs());
    expect((getTransport() as TransportType).bpm.value).toBe(120);
    expect((getDestination() as DestinationType).volume.value).toBe(0);
  });

  it('start() calls Tone.start and transport.start and sets isReady', async () => {
    const { result } = renderHook(() => useToneJs());
    await act(async () => {
      await result.current.start();
    });
    expect(start).toHaveBeenCalled();
    expect(getTransport().start).toHaveBeenCalled();
    expect(result.current.isReady).toBe(true);
  });

  it('initializes synthRef correctly', async () => {
    const { result } = renderHook(() => useToneJs({
      createSynth: () =>
      ({
        triggerAttackRelease: triggerAttackReleaseMock,
        toDestination: () => ({}),
        connect: () => ({}),
        chain: () => ({}),
        dispose: () => { },
      } as unknown as SupportedSynthType),
    }));
    await waitFor(() => {
      expect(result.current.synthRef.current).toBeDefined();
    }, { timeout: 2000 }); // <-- Aumenta el timeout si es necesario
    expect(typeof result.current.synthRef.current?.triggerAttackRelease).toBe('function');
  });

  it('playNote() calls triggerAttackRelease', async () => {
    const { result } = renderHook(() => useToneJs({
      createSynth: () =>
      ({
        triggerAttackRelease: triggerAttackReleaseMock,
        toDestination: () => ({}),
        connect: () => ({}),
        chain: () => ({}),
        dispose: () => { },
      } as unknown as SupportedSynthType),
    }));
    await waitFor(() => expect(result.current.synthRef.current).toBeDefined());

    act(() => {
      result.current.playNote('C4', '8n');
    });
    expect(triggerAttackReleaseMock).toHaveBeenCalledWith('C4', '8n', undefined, 0.7);
  });

  it('playArpeggio() calls triggerAttackRelease for each note', async () => {
    const { result } = renderHook(() => useToneJs({
      createSynth: () =>
      ({
        triggerAttackRelease: triggerAttackReleaseMock,
        toDestination: () => ({}),
        connect: () => ({}),
        chain: () => ({}),
        dispose: () => { },
      } as unknown as SupportedSynthType),
    }));

    await waitFor(() => {
      expect(result.current.synthRef.current).toBeDefined();
    });

    await act(async () => {
      await result.current.playArpeggio(['C4', 'E4', 'G4'], '8n', 0.1);
    });

    expect(triggerAttackReleaseMock).toHaveBeenCalledWith('C4', '8n', undefined, 0.7);
    expect(triggerAttackReleaseMock).toHaveBeenCalledWith('E4', '8n', undefined, 0.7);
    expect(triggerAttackReleaseMock).toHaveBeenCalledWith('G4', '8n', undefined, 0.7);
  });

  it('durationToMs converts duration to milliseconds', () => {
    const { result } = renderHook(() => useToneJs());
    expect(result.current.durationToMs('4n')).toBe(500);
  });

  it('scheduleMelody creates a Tone.Part and starts it', async () => {
    const { result } = renderHook(() => useToneJs({
      createSynth: () =>
      ({
        triggerAttackRelease: triggerAttackReleaseMock,
        toDestination: () => ({}),
        connect: () => ({}),
        chain: () => ({}),
        dispose: () => { },
      } as unknown as SupportedSynthType),
    }));
    const melody: tMelodySequence = [{ time: '0:0', pitches: ['C4'], duration: '8n' }];

    act(() => {
      result.current.scheduleMelody(melody, jest.fn());
    });

    expect(PartMock).toHaveBeenCalled();
    const partInstance = (PartMock as unknown as jest.Mock).mock.results[0].value;
    expect(partInstance.start).toHaveBeenCalled();
  });
});
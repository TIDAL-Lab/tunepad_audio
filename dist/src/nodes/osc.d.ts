import { EffectCurve } from './curve';
import { SynthNode } from './node';
import { Note } from '../note';
export declare class SynthOscNode extends SynthNode {
    osc: OscillatorNode;
    shaper: WaveShaperNode;
    gain: GainNode;
    frequency: number;
    multiplier: number;
    detune: number;
    relative: boolean;
    waveform: string;
    static BasicWaveforms: string[];
    static PeriodicWaveforms: string[];
    static ShaperWaveforms: string[];
    static Waveforms: string[];
    constructor(context: BaseAudioContext, config: any);
    _updateWaveform(waveform: string): void;
    _createWaveShaper(waveform: string): Float32Array;
    _createPeriodicWave(waveform: string): PeriodicWave;
    playNote(note: Note): void;
    scheduleNote(note: Note, when: number, duration: number, release: number): void;
    cancelNotes(): void;
    destroy(): void;
    pitchBend(cents: number): void;
    schedulePitchBend(start: number, cents: EffectCurve): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=osc.d.ts.map
import { EffectCurve } from './curve';
import { SynthNode } from './node';
import { SynthConnector } from './connector';
import { Note } from '../note';
export interface PitchedSample {
    sample: string;
    step: number;
}
export declare function isPitchedSample(p: any): p is PitchedSample;
export declare class SynthSampleNode extends SynthNode {
    sources: AudioBufferSourceNode[];
    playback: number;
    pIn: GainNode;
    detune: number;
    dIn: GainNode;
    sample_pack: string;
    samples: PitchedSample[];
    private _rate;
    drumkit: boolean;
    constructor(context: BaseAudioContext, config: any);
    private loadSamplePack;
    static loadAudioBuffers(samples: Array<PitchedSample>, context: BaseAudioContext): void;
    playNote(note: Note): void;
    private findBestSample;
    scheduleNote(note: Note, when: number, duration: number, release: number): void;
    cancelNotes(): void;
    destroy(): void;
    pitchBend(cents: number): void;
    schedulePitchBend(start: number, cents: EffectCurve): void;
    connect(source: SynthConnector, dest: string): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=sample.d.ts.map
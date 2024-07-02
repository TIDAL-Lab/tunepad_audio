import { SynthNode } from './node';
import { SynthConnector } from './connector';
import { Note } from '../note';
/**
 * ADSR Envelope with the following parameters:
 * * A: attack in seconds (>= 0.0)
 * * D: decay in seconds (>= 0.0)
 * * S: sustain value in range [0.0 - 1.0]
 * * R: release in seconds (>= 0.0)
 * * aShape: shape of the attack curve (1 -> line, >1 -> exp, <1 -> log)
 * * dShape: shape of the decay curve (1 -> line, >1 -> exp, <1 -> log)
 * * rShape: shape of the release curve (1 -> line, >1 -> exp, <1 -> log)
 */
export interface ADSREnvelope {
    A: number;
    D: number;
    S: number;
    R: number;
    aShape: number;
    dShape: number;
    rShape: number;
}
export declare class ADSRNode extends SynthNode implements ADSREnvelope {
    A: number;
    D: number;
    S: number;
    R: number;
    aShape: number;
    dShape: number;
    rShape: number;
    static readonly samplesPerSecond = 300;
    private _attack;
    private _decay;
    private _release;
    attackCurve: number[];
    decayCurve: number[];
    releaseCurve: number[];
    constructor(context: BaseAudioContext, config: any);
    connect(source: SynthConnector, dest: string): void;
    playNote(note: Note): void;
    releaseNote(): void;
    scheduleNote(note: Note, when: number, duration: number, release: number): void;
    cancelNotes(): void;
    destroy(): void;
    updateParameter(pname: string, newValue: any): void;
    _buildCurves(): void;
    _buildAttackCurve(shape: number): void;
    _buildDecayCurve(shape: number): void;
    _buildReleaseCurve(shape: number): void;
}
//# sourceMappingURL=adsr.d.ts.map
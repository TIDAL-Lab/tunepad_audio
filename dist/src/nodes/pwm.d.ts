import { SynthNode } from "./node";
import { EffectCurve } from "./curve";
import { Note } from "../note";
export declare class SynthPWMNode extends SynthNode {
    driver: OscillatorNode;
    shaper: WaveShaperNode;
    csn: ConstantSourceNode;
    gain: GainNode;
    frequency: number;
    multiplier: number;
    detune: number;
    relative: boolean;
    constructor(context: BaseAudioContext, config: any);
    playNote(note: Note): void;
    scheduleNote(note: Note, when: number, duration: number, release: number): void;
    cancelNotes(): void;
    destroy(): void;
    pitchBend(cents: number): void;
    schedulePitchBend(start: number, cents: EffectCurve): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=pwm.d.ts.map
import { Note } from "../note";
import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
export declare class SynthDelayNode extends SynthNode {
    audioIn: GainNode;
    delayIn: GainNode;
    gates: any[];
    delayTime: number;
    constructor(context: BaseAudioContext, config: any);
    connect(source: SynthConnector, dest: string): void;
    updateParameter(pname: string, newValue: any): void;
    playNote(note: Note): void;
    releaseNote(): void;
    _freeGates(): void;
    scheduleNote(note: Note, when: number, duration: number, release: number): void;
    destroy(): void;
    cancelNotes(): void;
}
//# sourceMappingURL=delay.d.ts.map
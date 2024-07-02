import { Note } from "../note";
import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
export declare class SynthFilterNode extends SynthNode {
    filter: BiquadFilterNode;
    tracking: boolean;
    ratio: number;
    frequency: number;
    Q: number;
    gain: number;
    detune: number;
    type: string;
    static FILTERS: string[];
    constructor(context: BaseAudioContext, config: any);
    playNote(note: Note): void;
    scheduleNote(note: Note, when: number, duration: number, release: number): void;
    cancelNotes(): void;
    destroy(): void;
    connect(source: SynthConnector, dest: string): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=filter.d.ts.map
import { SynthNode } from './node';
import { Note } from "../note";
export declare class SynthRandomSignalNode extends SynthNode {
    csn: ConstantSourceNode;
    constructor(context: BaseAudioContext, config: any);
    playNote(note: Note): void;
    scheduleNote(note: Note, when: number, duration: number, release: number): void;
    destroy(): void;
}
//# sourceMappingURL=rand.d.ts.map
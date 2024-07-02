import { Note } from "./note";
import { SynthChain } from "./chain";
export declare class SynthEvent {
    readonly note: Note;
    readonly chain: SynthChain;
    released: boolean;
    canceled: boolean;
    constructor(note: Note, chain: SynthChain);
}
//# sourceMappingURL=event.d.ts.map
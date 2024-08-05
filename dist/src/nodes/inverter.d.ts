import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
export declare class SynthInverterNode extends SynthNode {
    inverter: GainNode;
    constructor(context: BaseAudioContext, config: any);
    connect(source: SynthConnector, dest: string): void;
    destroy(): void;
}
//# sourceMappingURL=inverter.d.ts.map
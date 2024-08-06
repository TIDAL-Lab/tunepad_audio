import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
export declare class SynthCompressorNode extends SynthNode {
    compressor: DynamicsCompressorNode;
    constructor(context: BaseAudioContext, config: any);
    connect(source: SynthConnector, dest: string): void;
    destroy(): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=compressor.d.ts.map
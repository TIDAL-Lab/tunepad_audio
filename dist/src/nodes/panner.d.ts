import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
export declare class SynthPannerNode extends SynthNode {
    panner: StereoPannerNode;
    constructor(context: BaseAudioContext, config: any);
    connect(source: SynthConnector, dest: string): void;
    destroy(): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=panner.d.ts.map
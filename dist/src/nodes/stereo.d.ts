import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
export declare class SynthStereoNode extends SynthNode {
    merger: ChannelMergerNode;
    leftGain: GainNode;
    rightGain: GainNode;
    constructor(context: BaseAudioContext, config: any);
    connect(source: SynthConnector, dest: string): void;
    destroy(): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=stereo.d.ts.map
import { SynthNode } from './node';
export declare class SynthConstNode extends SynthNode {
    csn: ConstantSourceNode;
    constructor(context: BaseAudioContext, config: any);
    destroy(): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=const.d.ts.map
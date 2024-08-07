import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
export declare class SynthDistortionNode extends SynthNode {
    gain: GainNode;
    dist: WaveShaperNode;
    param: number;
    curve: string;
    constructor(context: BaseAudioContext, config: any);
    connect(source: SynthConnector, dest: string): void;
    destroy(): void;
    updateParameter(pname: string, newValue: any): void;
    _makeCurve(): Float32Array;
    _curve(name: string): typeof _tanh;
}
declare function _tanh(x: number, p: number): number;
export {};
//# sourceMappingURL=distort.d.ts.map
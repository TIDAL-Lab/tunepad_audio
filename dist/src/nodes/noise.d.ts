import { SynthNode } from './node';
export declare class SynthNoiseNode extends SynthNode {
    noise: string;
    white: AudioBuffer;
    pink: AudioBuffer;
    brown: AudioBuffer;
    source: AudioBufferSourceNode;
    gain: GainNode;
    get buffer(): AudioBuffer;
    static readonly NOISE_TYPES: string[];
    constructor(context: BaseAudioContext, config: any);
    destroy(): void;
    updateParameter(pname: string, newValue: any): void;
}
//# sourceMappingURL=noise.d.ts.map
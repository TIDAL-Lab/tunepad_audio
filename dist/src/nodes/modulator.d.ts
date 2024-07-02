import { SynthConnector } from "./connector";
export declare class SynthModulator {
    readonly gain: GainNode;
    readonly name: string;
    value: number;
    constructor(context: BaseAudioContext, name: string, value: number);
    connect(connector: SynthConnector, dest: string): boolean;
    destroy(): void;
    updateParameter(pname: string, newValue: any): boolean;
}
//# sourceMappingURL=modulator.d.ts.map
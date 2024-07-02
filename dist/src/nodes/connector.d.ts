import { SynthNode } from "./node";
export declare class SynthConnector {
    id: number;
    get context(): BaseAudioContext;
    readonly source: SynthNode;
    readonly level: GainNode;
    dB: number;
    private _pre;
    private _analyzers;
    private _splitter;
    private _merger;
    private _buffer;
    readonly type: string;
    constructor(source: SynthNode, config: any);
    updateLevel(dB: number): void;
    destroy(): void;
    attachAnalyzer(fftSize: number, channels: number, minDB?: number, maxDB?: number): void;
    detachAnalyzer(): void;
    getFloatTimeDomainData(channel: number, buff: Float32Array): void;
}
//# sourceMappingURL=connector.d.ts.map
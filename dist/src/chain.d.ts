import { Note } from './note';
import { SynthNode, OutNode, EffectCurve } from './nodes';
export declare class SynthChain {
    static _CHAIN_ID: number;
    id: number;
    readonly context: BaseAudioContext;
    free: number;
    nodes: Map<number, SynthNode>;
    out?: OutNode;
    release: number;
    gates: any[];
    constructor(context: BaseAudioContext);
    playNote(note: Note, dest: AudioNode): void;
    releaseNote(): void;
    scheduleNote(note: Note, when: number, duration: number, dest: AudioNode): number;
    disconnect(): void;
    cancelNotes(): void;
    destroy(): void;
    pitchBend(cents: number): void;
    schedulePitchBend(start: number, curve: EffectCurve): void;
    loadPatch(config: any): void;
    private createSynthNode;
    getNodeById(id: number): SynthNode | undefined;
    updateParameter(nodeId: number, pname: string, newValue: any): void;
    updateConnectorLevel(nodeId: number, connectorId: number, dB: number): void;
    attachAnalyzer(nodeId: number, connectorId: number, fftSize: number, channels: number): void;
    detachAnalyzer(nodeId: number, connectorId: number): void;
    getFloatTimeDomainData(nodeId: number, connectorId: number, channel: number, buff: Float32Array): void;
    _updateReleaseValue(): void;
    static _sine_patch: {
        nodes: ({
            type: string;
            A: number;
            D: number;
            S: number;
            R: number;
            id: number;
            waveform?: undefined;
            relative?: undefined;
            frequency?: undefined;
            level?: undefined;
        } | {
            type: string;
            waveform: string;
            relative: string;
            frequency: number;
            id: number;
            level: number;
            A?: undefined;
            D?: undefined;
            S?: undefined;
            R?: undefined;
        })[];
        routing: {
            source: number;
            dest: number;
            type: string;
        }[];
    };
    static _custom_patch: {
        nodes: ({
            type: string;
            id: number;
            A: number;
            D: number;
            S: number;
            R: number;
            level: number;
            "sample-pack"?: undefined;
            samples?: undefined;
        } | {
            type: string;
            "sample-pack": string;
            samples: {
                sample: string;
                step: number;
            }[];
            id: number;
            level: number;
            A?: undefined;
            D?: undefined;
            S?: undefined;
            R?: undefined;
        })[];
        routing: {
            id: number;
            source: number;
            dest: number;
            type: string;
            level: number;
        }[];
    };
}
//# sourceMappingURL=chain.d.ts.map
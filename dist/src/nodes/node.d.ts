import { Note } from "../note";
import { SynthConnector } from "./connector";
import { SynthModulator } from "./modulator";
import { EffectCurve } from "./curve";
export declare class SynthNode {
    readonly context: BaseAudioContext;
    level: GainNode;
    id: number;
    modulators: SynthModulator[];
    connectors: SynthConnector[];
    constructor(context: BaseAudioContext, config: any);
    connect(connector: SynthConnector, dest: string): void;
    addConnector(connector: SynthConnector): void;
    addModulator(name: string, value: number, param: AudioParam): void;
    playNote(note: Note): void;
    releaseNote(): void;
    scheduleNote(note: Note, when: number, duration: number, release: number): void;
    cancelNotes(): void;
    destroy(): void;
    pitchBend(cents: number): void;
    schedulePitchBend(start: number, cents: EffectCurve): void;
    updateParameter(pname: string, newValue: any): void;
    updateConnectorLevel(connectorId: number, dB: number): void;
    attachAnalyzer(connectorId: number, fftSize: number, channels: number): void;
    detachAnalyzer(connectorId: number): void;
    getFloatTimeDomainData(connectorId: number, channel: number, buff: Float32Array): void;
}
//# sourceMappingURL=node.d.ts.map
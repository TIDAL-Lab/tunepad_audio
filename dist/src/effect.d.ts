import { TraceEvent } from "./trace";
import { SynthChain } from "./chain";
interface EffectParams {
    start: number;
    beats: number;
    values: Array<(number | Array<number>)>;
}
export declare abstract class SynthEffect {
    name: string;
    params: number[][];
    start: number;
    beats: number;
    free: number;
    abstract get node(): AudioNode;
    oparams: EffectParams;
    static _EFFECT_ID: number;
    id: number;
    protected constructor(name: string, oparams: EffectParams);
    static createEffect(t: TraceEvent, context: BaseAudioContext): SynthEffect;
    connect(dest: AudioNode, bpm: number, delta: number): AudioNode;
    disconnect(): void;
    afterEffect(gen: SynthChain | undefined, noteStart: number, noteDuration: number, bpm: number, delta: number): void;
    clampParam(param: Array<number>, minVal: number, maxVal: number): void;
}
export declare class EmptyEffect extends SynthEffect {
    private _node;
    get node(): AudioNode;
    constructor(context: BaseAudioContext);
}
export {};
//# sourceMappingURL=effect.d.ts.map
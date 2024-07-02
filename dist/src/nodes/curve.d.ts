export declare class EffectCurve {
    values: number[];
    curve: number[];
    duration: number;
    static SAMPLE_RATE: number;
    constructor(values: number[], duration: number);
    trimStart(seconds: number): void;
    trimEnd(seconds: number): void;
    apply(param: AudioParam, delta: number, context: BaseAudioContext, baseVal?: number): void;
    map(conversion: (value: number) => number): EffectCurve;
}
//# sourceMappingURL=curve.d.ts.map
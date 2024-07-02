/**
 * Represents an exposed shortcut audio parameter that can be adjusted in real time
 * by the user through the UI or through code. e.g. resonance, feedback, reverb
 */
export declare class SynthParameter {
    private _value;
    get isAssigned(): boolean;
    /** which node in the synth chain to adjust (-1 means unassigned) */
    nodeId: number;
    /** which parameter to adjust */
    name: string;
    /** user-visible parameter label */
    label: string;
    /** a slot is like an address or location of the parameter in the UI
     * typically a number in the range 0 - 5.
     */
    slot: number;
    /** current value of the parameter */
    get value(): number;
    set value(v: number);
    get percentValue(): number;
    set percentValue(p: number);
    get range(): number;
    /** min value of the parameter */
    minValue: number;
    /** max value of the parameter */
    maxValue: number;
    constructor();
    static fromJSON(config: any): SynthParameter;
    toJSON(): any;
}
//# sourceMappingURL=param.d.ts.map
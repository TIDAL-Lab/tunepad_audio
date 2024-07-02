import { GrowableAudioBuffer } from "./buffer";
/**
 * Stores a compressed/reduced version of an audio buffer with just enough information to
 * render a waveform visualization.
 */
export declare class WaveformData {
    private waveform;
    readonly sampleRate = 44100;
    readonly waveQuantum = 128;
    get waveRate(): number;
    get isEmpty(): boolean;
    get duration(): number;
    private _wavelines;
    private _wavepath;
    private _top_path;
    private _bottom_path;
    /**
     * Create a new empty waveform
     */
    constructor();
    /**
     * Appends one waveform sample representing 256 underlying audio samples (waveQuantum)
     */
    appendSample(sample: Array<number>): void;
    /**
     * Append the given audio data to this waveform.
     */
    appendBuffer(buffer: AudioBuffer | GrowableAudioBuffer): void;
    /**
     * Create a new buffer from the given AudioBuffer object
     */
    static fromBuffer(buffer: AudioBuffer | GrowableAudioBuffer): WaveformData;
    get wavepath(): SVGPathElement;
    get wavelines(): SVGGElement;
}
//# sourceMappingURL=waveform.d.ts.map
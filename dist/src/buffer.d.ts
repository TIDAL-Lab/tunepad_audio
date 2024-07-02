/**
 * Thin wrapper around the AudioBuffer class that allows for
 * exporting to WAV, MP3, and Base64. Also generates compressed waveform visualization data.
 * This is *mostly* an immutable object, except for the append operation, which can grow the buffer.
 */
export declare class GrowableAudioBuffer {
    private channels;
    getChannelData(channel: number): Float32Array;
    readonly sampleRate: number;
    get numberOfChannels(): number;
    get samples(): number;
    get length(): number;
    get isEmpty(): boolean;
    get duration(): number;
    get isMono(): boolean;
    get isStereo(): boolean;
    private buffer?;
    /**
     * Create a new empty buffer with the given number of channels and sample rate
     */
    constructor(channels?: number, sampleRate?: number);
    /**
     * Append the given audio data to this buffer and return the new buffer.
     * This is the only function that mutates the GrowableAudioBuffer.
     * @returns Returns this object with the new audio data appended.
     */
    appendAudioBuffer(buffer: AudioBuffer): GrowableAudioBuffer;
    append(buffer: GrowableAudioBuffer): GrowableAudioBuffer;
    /**
     * Create a new buffer from the given AudioBuffer object
     */
    static fromBuffer(buffer: AudioBuffer): GrowableAudioBuffer;
    /**
     * load audio source from a URL. Throws an error if buffer cannot be loaded.
     */
    static fromURL(url: string): Promise<GrowableAudioBuffer>;
    /**
     * Create a copy of this buffer
     */
    clone(): GrowableAudioBuffer;
    /**
     * Trim the buffer from a start to an end point in seconds.
     * Return the new buffer.
     */
    trim(start: number, end: number): GrowableAudioBuffer;
    /**
     * reverses the audio and returns the new buffer
     */
    reverse(): GrowableAudioBuffer;
    /**
     * create an AudioBuffer from the saved audio data.
     * The length of the buffer must be greater than zero or this will throw an exception.
     */
    toAudioBuffer(): AudioBuffer;
    toWAV(): Uint8Array;
    /**
     * downloads a WAV file as a blob
     */
    downloadWAV(filename: string): void;
    /**
     * encode audio buffer as a base64 encoded WAV file
     */
    toWAVBase64(): string;
}
//# sourceMappingURL=buffer.d.ts.map
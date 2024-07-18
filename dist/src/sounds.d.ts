/**
 * Loads audio files and caches them as audio buffers
 */
export declare class SoundLoader {
    static sounds: Map<string, AudioBuffer>;
    private static context;
    private constructor();
    static hasSound(name: string): boolean;
    static getAudioBuffer(name: string): AudioBuffer | undefined;
    static loadAudioBuffer(name: string): Promise<AudioBuffer | undefined>;
    static loadCustomSound(url: string): Promise<boolean>;
    static supportsAudioType(mimetype: string): boolean;
    static _supports: Map<string, boolean>;
}
//# sourceMappingURL=sounds.d.ts.map
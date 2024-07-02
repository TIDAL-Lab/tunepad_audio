/**
 * Clock subscribers receive events when clock properties change.
 */
export interface ClockSubscriber {
    onClockReset(): void;
    onClockTimeChange(): void;
    onTempoChange(): void;
    onTimeSignatureChange(): void;
}
/**
 * Metronomes can request beat pulses from the clock
 */
interface Metronome {
    pulse(beats: number): void;
}
/**
 * Thin wrapper around the audio context timer that lets you set time
 * and synchronize multiple subscribers playing at the same time.
 */
export declare class TunePadAudio {
    private _start;
    private _elapsedBeats;
    private _bpm;
    get bpm(): number;
    set bpm(tempo: number);
    private _meter;
    get meter(): string;
    set meter(m: string);
    private _beatsPerMeasure;
    get beatsPerMeasure(): number;
    private _beatValue;
    get beatValue(): number;
    private _key;
    get key(): string;
    set key(keyName: string);
    get contextTime(): number;
    get time(): number;
    get timeString(): string;
    get beats(): number;
    private _subscribers;
    private _listeners;
    context: AudioContext;
    get isPaused(): boolean;
    private _metronomes;
    static _instance: TunePadAudio | null;
    static init(): TunePadAudio;
    private constructor();
    addSubscriber(subscriber: ClockSubscriber): void;
    removeSubscriber(subscriber: ClockSubscriber): void;
    isPlaying(subscriber: ClockSubscriber): boolean;
    /**
     * Start playing for this subscriber
     */
    play(subscriber: ClockSubscriber): void;
    /**
     * Pause this subscriber only ...
     */
    pause(subscriber: ClockSubscriber): void;
    /**
     * Reset the clock back to zero beats and stop all subscribers
     */
    stopAll(): void;
    /**
     * Automatically stops all subscribers
     */
    setTime(elapsedBeats: number): void;
    setTempo(tempo: number): void;
    setTimeSignature(s: string): void;
    startMetronome(metronome: Metronome): void;
    private _timer;
    stopMetronome(metronome: Metronome): void;
    isMetronomePlaying(metronome: Metronome): boolean;
}
export {};
//# sourceMappingURL=audio.d.ts.map
export type MIDISource = "pointer" | "keyboard" | "midi" | "system";
export interface MIDIEventListener {
    onMidiInput: (e: MIDIEvent) => void;
}
/**
 * MIDI event class
 */
export declare class MIDIEvent {
    /** raw midi message code (e.g. 8, 9, 14) */
    code: number;
    /** MIDI message (only three messages supported for now) */
    message: "note-on" | "note-off" | "pitch-bend" | "unknown";
    /** MIDI note number if applicable */
    note: number;
    /** Note velocity if applicable */
    private _velocity;
    get velocity(): number;
    set velocity(v: number);
    /** Command value (e.g. for pitch bend amount) */
    value: number;
    /** MIDI Channel (typically 0) */
    channel: number;
    constructor(code: number);
}
/**
 * Singleton wrapper around javascript's MIDIAccess
 */
export declare class MIDIManager {
    private static instance?;
    private access?;
    private static listeners;
    /**
     * Singleton instance initializer. Can safely be called multiple times.
     */
    static init(): void;
    static addListener(listener: MIDIEventListener): void;
    static removeListener(listener: MIDIEventListener): void;
    /**
     * Is the MIDI access object ready?
     */
    static get ready(): boolean;
    static get outputs(): MIDIOutputMap | undefined;
    private get _outputs();
    static get inputs(): MIDIInputMap | undefined;
    private get _inputs();
    private constructor();
    /**
     * Fired when midi devices are added or removed.
     */
    private _midiConnection;
    private _midiEvent;
}
//# sourceMappingURL=midi.d.ts.map
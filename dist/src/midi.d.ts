export type MIDISource = "pointer" | "keyboard" | "midi" | "system";
export interface MIDIEventProps {
    note?: number;
    velocity?: number;
    value?: number;
    time?: number;
    message: "note-on" | "note-off" | "pitch-bend";
    source: MIDISource;
}
/**
 * MIDI event class
 */
export declare class MIDIEvent {
    readonly props: MIDIEventProps;
    get customEvent(): CustomEvent;
    constructor(props: MIDIEventProps);
}
/**
 * Singleton wrapper around javascript's MIDIAccess
 */
export declare class MIDIManager {
    private static instance?;
    private access?;
    /**
     * Singleton instance initializer. Can safely be called multiple times.
     */
    static init(): void;
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
    /**
     * Processes incoming midi events and send it to listeners
     */
    private _midiEvent;
}
//# sourceMappingURL=midi.d.ts.map
/*
 * TunePad
 *
 * Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
  *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */

export type MIDISource = "pointer" | "keyboard" | "midi" | "system";

export interface MIDIEventListener {
    onMidiInput : (e : MIDIEvent) => void;
}

/**
 * MIDI event class
 */
export class MIDIEvent {

    /** raw midi message code (e.g. 8, 9, 14) */
    code : number = 0;

    /** MIDI message (only three messages supported for now) */
    message : "note-on" | "note-off" | "pitch-bend" | "unknown";

    /** MIDI note number if applicable */
    note : number = -1;

    /** Note velocity if applicable */
    velocity : number = 0;

    /** Command value (e.g. for pitch bend amount) */
    value : number = 0;

    /** MIDI Channel (typically 0) */
    channel : number = 0;

    constructor(code : number) {
        this.code = code;
        switch (code) {
            case 9: this.message = 'note-on'; break;
            case 8: this.message = 'note-off'; break;
            case 14: this.message = 'pitch-bend'; break;
            default: this.message = 'unknown';
        }
    }
}


/**
 * Singleton wrapper around javascript's MIDIAccess
 */
export class MIDIManager {

    private static instance ? : MIDIManager;

    // javascript's builtin access object
    private access ? : MIDIAccess;

    private static listeners = new Set<MIDIEventListener>();


    /**
     * Singleton instance initializer. Can safely be called multiple times.
     */
    public static init() {
        if (!MIDIManager.instance) {
            MIDIManager.instance = new MIDIManager();
        }
    }

    public static addListener(listener : MIDIEventListener) {
        MIDIManager.listeners.add(listener);
    }

    public static removeListener(listener : MIDIEventListener) {
        MIDIManager.listeners.delete(listener);
    }

    /**
     * Is the MIDI access object ready?
     */
    public static get ready() : boolean {
        MIDIManager.init();
        return (MIDIManager.instance?.access !== undefined);
    }
    

    public static get outputs() : MIDIOutputMap | undefined {
        MIDIManager.init();
        return MIDIManager.instance ? MIDIManager.instance._outputs : undefined;
    }
    private get _outputs() : MIDIOutputMap | undefined {
        return this.access ? this.access.outputs : undefined;
    }


    public static get inputs() : MIDIInputMap | undefined {
        MIDIManager.init();
        return MIDIManager.instance ? MIDIManager.instance._inputs : undefined;
    }
    private get _inputs() : MIDIInputMap | undefined {
        return this.access ? this.access.inputs : undefined;
    }


    private constructor() {
        navigator.requestMIDIAccess().then(
            (midi) => {
                this.access = midi;
                console.log("Connected to MIDI.");
                midi.addEventListener("statechange", (e) => this._midiConnection(e));
                midi.outputs.forEach((out) => out.open());
                midi.inputs.forEach((input) => input.onmidimessage = this._midiEvent);
            },
            () => { console.log("Failed to initialize web MIDI."); }
        );
    }


    /**
     * Fired when midi devices are added or removed. 
     */
    private _midiConnection( event : Event ) {
        const e = event as MIDIConnectionEvent;
        const port = e.port; // MIDIPort
        if (port) {
            if (port.type == "input" && port.state == "connected") {
                (port as MIDIInput).onmidimessage = this._midiEvent;
            }
            else if (port.type == "output" && port.state == "connected") {
                port.open();
            }
        }
    }

    private _midiEvent(e : MIDIMessageEvent) {
        if (e.data && e.data.length >= 2) {
            const me = new MIDIEvent(e.data[0] >> 4);
            me.channel = e.data[0] & 0xf;
            me.note = e.data[1];
            if (e.data.length >= 3) me.velocity = e.data[2];

            /// FIXME: pitch bend value isn't working quite right
            if (me.message === 'pitch-bend' && e.data.length >= 3) {
                me.value = ((e.data[2] << 7) | (e.data[1] & 0x7f)) - 0x2000;
            }
            MIDIManager.listeners.forEach((l) => l.onMidiInput(me));
        }
    }
}
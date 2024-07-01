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
import { MusicTrace, TraceEvent } from "./trace";

export type MIDISource = "pointer" | "keyboard" | "midi" | "system";

export interface MIDIEventProps {
    note? : number,         // midi note value (0 - 127)
    velocity? : number,     // midi note velocity (0 - 127)
    value? : number,        // value of pitch bend or control
    time? : number,
    message : "note-on" | "note-off" | "pitch-bend",
    source : MIDISource
}

const MEDefaults : MIDIEventProps = {
    note : 0,
    velocity : 90,
    message : "note-on",
    source : "pointer"
}

/**
 * MIDI event class
 */
export class MIDIEvent {

    readonly props : MIDIEventProps;

    get customEvent() : CustomEvent { 
        return new CustomEvent(this.props.message, {
            bubbles: true,
            composed: true,
            detail: this.props 
        }); 
    }
    
    constructor(props : MIDIEventProps) {
        this.props = { ...MEDefaults, ...props, ...{ time: Date.now() } };
    }
}


/**
 * Singleton wrapper around javascript's MIDIAccess
 */
export class MIDIManager {

    private static instance ? : MIDIManager;

    // javascript's builtin access object
    private access ? : MIDIAccess;


    /**
     * Singleton instance initializer. Can safely be called multiple times.
     */
    public static init() {
        if (!MIDIManager.instance) {
            MIDIManager.instance = new MIDIManager();
        }
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
                //for (let input of midi.inputs.values()) {
                //    input.onmidimessage = _midiEvent;
                //}
                midi.outputs.forEach((out) => out.open());
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

    /**
     * Processes incoming midi events and send it to listeners
     */
    private _midiEvent(event : MIDIMessageEvent) {
        if (event.data && event.data.length >= 2) {
            let cmd = event.data[0] >> 4;
            let channel = event.data[0] & 0xf;
            let note = event.data[1];
            let velocity = 0;
            if (event.data.length >= 3) velocity = event.data[2];
            console.log(cmd, channel, note, velocity);
            // FIXME : callback or listener dist
        }
    }
}
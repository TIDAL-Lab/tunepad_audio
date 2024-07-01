/*
 * TunePad
 * Northwestern University
 *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */
import { Note } from "./note";

/**
 * A Trace object is generated by the python compiler and represents a list of
 * audio events that generate music.
 */
export class MusicTrace {

    /// a trace is just a list of events
    public trace = new Array<TraceEvent>();

    /// number of events in the trace
    public get length(): number { return this.trace.length; }

    /// is this trace empty
    public get isEmpty(): boolean { return this.length === 0; }

    /// number of beats in the trace (to the end of the last note)
    private _beats: number = 0;
    public get beats(): number { return this._beats; }

    /// current position of the playhead as the trace is being constructed
    private _playhead: number = 0;

    /// what's the minimum note value in this trace (or -1 if there are no notes)
    private _minNote: number = -1;
    public get minNote(): number { return this._minNote; }
    public get minOctave(): number { return Math.max(0, Math.floor(this._minNote / 12)); }

    /// what's the maximum note value in this trace (or -1 if there are no notes)
    private _maxNote: number = -1;
    public get maxNote(): number { return this._maxNote; }
    public get maxOctave(): number { return Math.max(0, Math.floor(this._minNote / 12)); }

    /// what's the range between the highest and lowest note values
    public get noteRange(): number { return (this.maxNote - this.minNote); }
    public get octaveRange(): number { return (this.maxOctave - this.minOctave); }

    /// how many notes in this trace?
    private _noteCount: number = 0;
    public get noteCount(): number { return this._noteCount; }

    constructor() { }

    public clear() {
        this.trace = [];
        this._beats = 0;
        this._minNote = -1;
        this._maxNote = -1;
        this._noteCount = 0;
        this._playhead = 0;
    }

    public fromPython(list: Array<Map<string, any>>) {
        for (let t of list) this.addTraceEvent(t);
    }

    public get messages() : TraceEvent[] {
        return this.trace.filter(t => t.params.get('type') === 'message');
    }

    public get unitTests() : TraceEvent[] {
        return this.trace.filter(t => ['pass', 'fail'].includes(t.params.get('type')));
    }

    public get passes() : TraceEvent[] {
        return this.trace.filter(t => t.params.get('type') === 'pass');
    }

    public get fails() : TraceEvent[] {
        return this.trace.filter(t => t.params.get('type') === 'fail');
    }


    /** 
     * Compare two trace objects to see if they are equivalent except for line numbers
     */
    public isEquivalent(other: MusicTrace): boolean {
        if (this.length !== other.length) return false;

        for (let i = 0; i < this.length; i++) {
            if (!this.trace[i].isEquivalent(other.trace[i])) return false;
        }
        return true;
    }


    /**
     * Add an event to the trace
     */
    public addTraceEvent(e: Map<string, any>) {
        this._addTraceEvent(TraceEvent.fromMap(e));
    }

    private _addTraceEvent(event: TraceEvent) {
        this.trace.push(event);
        switch (event.command) {
            case TraceEvent.PLAY:
                this._beats = Math.max(event.end, this._beats);
                this._playhead = event.end;
                if (this._minNote < 0 || event.note.note < this._minNote) {
                    this._minNote = event.note.note;
                }
                this._maxNote = Math.max(this._maxNote, event.note.note);
                this._noteCount++;
                break;

            case TraceEvent.SOUND:
                this._beats = Math.max(event.end, this._beats);
                this._playhead = event.end;
                this._noteCount++;
                break;

            case TraceEvent.REST:
                this._beats = Math.max(event.end, this._beats);
                this._playhead = event.end;
                break;
        }
    }

    /**
     * Return a list of events for the given trace group number
     */
    public getTraceGroup(bug: number): Array<TraceEvent> {
        return this.trace.filter((e) => e.trace_group === bug);
    }


    /**
     * Create a trace with only events with start times between start and end
       public subtrace(start : number, end : number) : MusicTrace {
        let t = new MusicTrace();
        for (let e of this.trace) {
          if (e.time >= start && e.time < end) {
            t._addTraceEvent(e.clone());
          }
        }
        return t;
      }
    */
}


/**
 * Audio trace of a program's execution. Trace events are generated by
 * python and then replayed to generate sounds and animation.
 */
export class TraceEvent {

    static readonly PLAY = "play";           /// command code to play a note
    static readonly SOUND = "sound";         /// command to play a custom sound recording
    static readonly REST = "rest";           /// rest for an interval
    static readonly PUSH_FX = "push_fx";     /// push an audio effect
    static readonly POP_FX = "pop_fx";       /// pop the audio effect stack
    static readonly MESSAGE = "message";

    /// used to generate unique trace event IDs
    private static _TRACE_ID = 0;

    /// unique trace event id
    public readonly id: number;

    /// name of the trace event
    public readonly command: string;

    /// start time of the event in beats
    public readonly time: number = 0;

    /// duration of the event in beats
    public duration: number = 1;

    /// end time of the event in beats
    public get end() { return this.time + this.duration; }

    /// python source line number of this command
    public line: number = -1;

    /// note to play (for playNote and playSound)
    public note = new Note(60);

    /// trace "group" that this event belongs to. all events 
    /// generated by the same python function call will have 
    /// matching trace ids.
    public trace_group: number = -1;

    /// any additional parameters
    public params = new Map<string, any>();


    constructor(command: string, time: number) {
        this.id = TraceEvent._TRACE_ID++;
        this.command = command;
        this.time = time;
    }


    public clone(): TraceEvent {
        let e = new TraceEvent(this.command, this.time);
        e.line = this.line;
        e.duration = this.duration;
        e.note = this.note.clone();
        for (let [key, value] of this.params) {
            e.params.set(key, value);
        }
        return e;
    }

    public static fromMap(m: Map<string, any>): TraceEvent {
        let e = new TraceEvent(String(m.get('command')), Math.max(0, Number(m.get('time'))));
        e.duration = Number(m.get('duration'));
        e.note.duration = e.duration;
        for (let [key, val] of m) {
            if (key === "note" && typeof val === 'number') {
                e.note.note = val;
            }
            else if (key === "pitch" && typeof val === 'number') {
                e.note.note = val + 60;
            }
            else if (key === "velocity" && typeof val === 'number') {
                e.note.velocity = val;
            }
            else if (key === "sustain" && typeof val === 'number') {
                e.note.duration = Math.max(e.note.duration, val);
                e.duration = e.note.duration;
            }
            else if (key === "line" && typeof val === 'number') {
                e.line = val;
            }
            else if (key === "trace") {
                e.trace_group = val;
            }
            else if (["command", "time", "duration"].includes(key)) {
                continue;
            }
            else {
                e.params.set(key, val);
            }
        }
        return e;
    }


    /**
     * Are two trace events the same except for their line numbers
     */
    public isEquivalent(other: TraceEvent): boolean {
        if (this.command === other.command &&
            this.time === other.time &&
            this.duration === other.duration &&
            this.note.isEqual(other.note)) {
            for (let [key, val] of this.params) {
                if (key !== 'line' && other.params.get(key) !== val) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

}

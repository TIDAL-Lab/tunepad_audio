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
import { TunePadAudio } from "./audio";
import { Note } from "./note";
import { MusicTrace, TraceEvent } from "./trace";
import { clamp } from "./utils";
import { SynthNode } from "./nodes/node";
import { SynthEvent } from "./event";
import { SynthChain } from "./chain";
import { SynthEffect, EmptyEffect } from "./effect";
import { SynthParameter } from "./param";
import { SoundLoader } from "./sounds";
import { ADSREnvelope, PitchedSample, isPitchedSample } from "./nodes";


/** Built-in Patches */
import { SimpleSinePatch } from "./patches/simple-sine";
import { SimpleSawPatch } from "./patches/simple-saw";
import { SimpleSquarePatch } from "./patches/simple-square";
import { SimpleTriPatch } from "./patches/simple-tri";
import { FilteredSaw } from "./patches/filtered-saw";
import { WobblySquare } from "./patches/wobbly-square";


/**
 * A SynthPatch specifies how an instrument/voice generates audio
 */
export interface SynthPatch {
    name : string,
    nodes : Array<any>,
    routing : Array<any>,
    version : string,
    format : string,
    parameters : Array<any>,
    credit? : string
}

/**
 * Type checks an object to see if it conforms to the `SynthPatch` interface.
 * The `parameters` array is currently optional.
 */
function isPatch(object: any): object is SynthPatch {
    return (
        typeof object.name === 'string' &&
        Array.isArray(object.nodes) &&
        Array.isArray(object.routing) &&
        object.version === '2.0' &&
        object.format === 'tunepad-patch'
    );
}

/**
 * Patches can be specified as a built-in name (string), a patch object, 
 * or a URL referring to a `patch.json` object.
 */
export type SynthPatchRef = string | SynthPatch | URL;


/** 
 * Polyphonic audio synthesizer.
 */
export class Synthesizer {

    /** allow a maximum of 24 simultaneous notes */
    static readonly MAX_GENERATORS = 24;

    /** tempo (beats per minute) */
    get bpm() : number { return this._bpm; }
    set bpm(tempo : number) { if (!isNaN(tempo)) this._bpm = clamp(tempo, 5, 300); }
    private _bpm = 90;

    /** list of currently scheduled or playing notes */
    private notes = new Array<SynthEvent>();

    /** the patch is a chain of samples and audio nodes that produce notes */
    patch : SynthPatch = SimpleSinePatch;

    /** name of the active patch */
    get voice() { return this.patch.name; }

    /** bank of tone generators that we can check out to play notes */
    private bank = new Array<SynthChain>();

    /** list of generators scheduled to play notes */
    private sound_gens = new Array<SynthChain>();

    /** shortcut parameters that can be adjusted by user */
    parameters = new Array<SynthParameter>();

    /** optional analyzer node for visualizing audio stream */
    private _analyzer? : AnalyserNode;
    private _analyzers = new Map<number, any>();

    private _effects = new Array<SynthEffect>();


    /**
     * Create a new synthesizer
     * @param patch optional patch to load (e.g. "simple-sine")
     */
    constructor(patch? : SynthPatchRef) {
        if (patch) this.loadPatch(patch);
    }

    
    /**
     * Is the synth currently playing a sound?
     */
    get isPlaying() {
        if (this.bank.length === 0) {
            return false;
        } else {
            const when = this.bank[0].context.currentTime;
            for (const chain of this.bank) { 
                if (chain.free > when) return true; 
            }
            return false;
        }
    }

    /**
     * play and hold a note until `releaseNote` is called
     * @param note MIDI note to play
     * @param dest Optional audio destination node. If not provided, will play to AudioContext.destination
     */
    playNote(note : Note | number, dest? : AudioNode) {
        if (!dest) {
            const audio = TunePadAudio.init();
            dest = audio.context.destination;
        }
        const n : Note = (typeof note === "number") ? new Note(note) : note;
        let generator = this._allocateGenerator(dest.context, dest.context.currentTime!);
        if (generator) {
            generator.cancelNotes();
            generator.playNote(n, dest);
            this.notes.push(new SynthEvent(n, generator));
        }
    }

    /**
     * Release (stop playing) a note started with `playNote`
     * @param note
     */
    releaseNote(note: Note | number) {
        const n : number = (typeof note === "number") ? note : note.note;
        this.notes.forEach((event) => {
            if (event.note.note === n) {
                this._release(event);
            }
        });
    }

    /**
     * Immediately release all notes that are currently being played by `playNote`
     */
    releaseAll() {
        this.notes.forEach((event) => { this._release(event); });
    }

    /**
     * Release a sustained note event
     */
    private _release(event : SynthEvent) {
        if (event.released) return;
        event.released = true;
        event.chain.releaseNote();
        const timeout = Math.ceil(event.chain.release * 1000) + 100;
        setTimeout(() => {
            this.notes = this.notes.filter((e) => e !== event);
            event.chain.disconnect();
            this._releaseGenerator(event.chain);
        }, timeout);
    }


    /// play and hold a custom sound until releaseNote is called
    ///   note: note to be played (pitch and duration)
    ///   dest: ultimate audio destination
    /*
    playSound(note : Note, soundURL : string, dest : AudioNode) : SynthEvent {
        const generator = new SynthChain.sound(dest.context, soundURL);
        generator.playNote(note, dest);
        const event = new SynthEvent(note, generator);
        this.notes.push(event);
        return event;
    }
    */


    /**
     * Schedule a note to be played in the future.
     * @param note note to be scheduled.
     * @param start when to play the note in beats (using synth's tempo setting)
     * @param delta time before the start of the next measure (in beats). if negative, it means to skip the beginning of a loop
     * @param dest optional audio destination. By default it plays to AudioContext.destination
     */
    scheduleNote(note: Note | number, start: number, delta: number = 0, dest?: AudioNode): SynthChain | undefined {
        // make sure we have an audio destination
        if (!dest) {
            const audio = TunePadAudio.init();
            dest = audio.context.destination;
        }

        // make sure we have a note value
        const n : Note = (typeof note === "number") ? new Note(note) : note;

        // convert from beats to seconds
        const now = dest.context.currentTime;
        const duration = n.duration * (60 / this.bpm);
        start = (start + delta) * (60 / this.bpm);

        // allocate generator that's free at the note start time
        const generator = this._allocateGenerator(dest.context!, now + start);
        generator?.scheduleNote(n, start, duration, dest);
        return generator;
    }

/**
    scheduleSound(note: Note, soundURL: string, dest: AudioNode, start: number, delta: number = 0): SynthChain | null {
        const now = dest.context.currentTime;
        const duration = note.duration * (60 / this.bpm);
        start = (start + delta) * (60 / this.bpm);

        const generator = SynthChain.sound(dest.context!, soundURL);
        const release = generator.scheduleNote(note, start, duration, dest);
        this.sound_gens.push(generator);
        return generator;
    }
*/


    /** cancel all scheduled notes */
    cancelAllNotes() {
        for (const chain of this.bank) {
            this._releaseGenerator(chain);
        }
        for (const chain of this.sound_gens) {
            chain.cancelNotes();
        }
        this.sound_gens = [ ];
    }


    /// batch schedule notes and effects using an audio trace
    ///   dest: ultimate audio destination
    ///   start: the start time for the note in beats
    ///   delta: time before the start of the next measure (in beats)
    ///          when this note is to be scheduled. if negative, it means
    ///          to skip the beginning of a loop
    scheduleNotes(trace : MusicTrace, dest : AudioNode, delta : number) {
        const now = dest.context.currentTime;
        const offset = Math.max(0, -delta);

        //-------------------------------------------------
        // cleanup old effects
        //-------------------------------------------------
        for (let i=0; i < this._effects.length; i++) {
            const fx = this._effects[i];
            if (fx.free > 0 && fx.free < now) {
                fx.disconnect();
                delete this._effects[i];
            }
        }
        this._effects = this._effects.filter(e => (typeof e !== 'undefined'));

        //-------------------------------------------------
        // cleanup previously scheduled sound generators
        //-------------------------------------------------
        for (let i=0; i < this.sound_gens.length; i++) {
            const chain = this.sound_gens[i];
            if (chain.free < now) {
                delete this.sound_gens[i];
            }
        }
        this.sound_gens = this.sound_gens.filter(e => (typeof e !== 'undefined'));

        //-------------------------------------------------
        // schedule new notes
        //-------------------------------------------------
        const estack = new Array<SynthEffect>();
        const rootFx : SynthEffect = new EmptyEffect(dest.context);
        rootFx.beats = trace.beats;
        estack.push(rootFx);
        this._effects.push(rootFx);
        rootFx.connect(dest, this.bpm, delta);

        for (const t of trace.trace) {
            if (t.command == TraceEvent.PUSH_FX) {

                // TODO: don't allow duplicate effects in the stack?
                const parent = estack[estack.length - 1];
                const fx = SynthEffect.createEffect(t, dest.context);
                fx.connect(parent.node, this.bpm, delta);
                estack.push(fx);
                this._effects.push(fx);
            }
            else if (t.command == TraceEvent.POP_FX) {
                estack.pop();
            }
            else if (t.command == TraceEvent.PLAY && t.end >= offset) {
                const last = estack[estack.length - 1];
                const gen = this.scheduleNote(t.note, t.time, delta, last.node);
                estack.forEach((fx) => {
                    fx.afterEffect(gen, t.time, t.note.duration, this.bpm, delta);
                });
            }
            /*
            else if (t.command == TraceEvent.SOUND && t.end >= offset && t['sound-url'] is String) {
                const gen = scheduleSound(t.note, t['sound-url'], estack.last.node, t.time, delta);
                estack.forEach((fx) { fx.afterEffect(gen, t.time, t.note.duration, bpm, delta); });
            }
            */
        }
    }


    /**
     * Experimental. Generate MIDI output events 
     * @param trace 
     * @param delta time before the start of the next measure (in beats) 
     * when this note is to be scheduled. if negative, skip the beginning of a loop
     * @param port which MIDIOutput port to send messages to
     * @param gain adjust output velocity of all notes (number >= 0.0)
     */
    scheduleMidiNotes(trace : MusicTrace, delta : number, port : MIDIOutput, gain : number = 1.0) {
        const now = window.performance.now();
        const offset = Math.max(0, -delta);
        for (const t of trace.trace) {
            if (t.command === TraceEvent.PLAY && t.end >= offset) {

                const note = t.note.clone();
                note.gain *= gain;

                // convert from beats to milliseconds
                const duration = t.note.duration * (60 / this.bpm) * 1000;
                const start = now + (t.time + delta) * (60 / this.bpm) * 1000;
                const noteOn = [ 0x90, Math.round(note.note), note.velocity ];
                const noteOff = [ 0x80, Math.round(note.note), 0 ];

                port.send(noteOn, start);
                port.send(noteOff, start + duration);
            }
        }
    }

    /**
     * Send a single NOTE_ON event to a MIDI output port
     */
    playMidiNote(note : Note | number, port : MIDIOutput) {
        const n : Note = (typeof note === "number") ? new Note(note) : note;
        const noteOn = [ 0x90, Math.round(n.note), n.velocity ];
        port.send(noteOn, window.performance.now());
    }

    /**
     * Send a single NOTE_OFF event to a MIDI output port
     */
    releaseMidiNote(note : Note | number, port : MIDIOutput) {
        const n : Note = (typeof note === "number") ? new Note(note) : note;
        const noteOff = [ 0x80, Math.round(n.note), 0 ];
        port.send(noteOff, window.performance.now());
    }

    /**
     * Sets the MIDI output "program" or instrument voice
     */
    setMidiProgram(port : MIDIOutput, voice : number) {
        if (voice >= 0 && voice <= 0x7f) {
            port.send([ 0xC0, voice ]);
        }
    }

    /**
     * Send NOTE_OFF to all possible midi note values
     */
    cancelAllMidiNotes(port : MIDIOutput) {
        const now = window.performance.now();
        for (let note = 0; note <= 0x7f; note++) {
            port.send([ 0x80, note, 0 ], now);
        }
        if ("clear" in port && typeof port['clear'] === 'function') {
            port.clear();
        }
    }


    /**
     * Set the pitch bend "wheel" to the given number of cents.
     * This only applies to currently scheduled or playing notes.
     */
    pitchBend(cents : number) {
        this.notes.forEach((event) => event.chain.pitchBend(cents));
    }

    
    /**
     * Load a patch by name (for built-in patches), by URL, or by using a custom patch object.
     * * Create custom patches at https://tunepad.com/patchworks and use File -> Export.
     * * URLs must resolve to a valid patch JSON object. Any links to audio samples should be relative to the URL path.
     * @returns true iff the patch and all resources were successfully loaded.
     */
    async loadPatch(patch : SynthPatchRef) : Promise<boolean> {
        if (isPatch(patch)) {
            return await this._loadPatchData(patch);
        } 
        else if (patch instanceof URL) {
            return await this._loadPatchURL(patch);
        }
        else {
            switch (patch) {
                case "simple-saw":
                    return await this._loadPatchData(SimpleSawPatch);
                case "simple-sine":
                    return await this._loadPatchData(SimpleSinePatch);
                case "simple-square":
                    return await this._loadPatchData(SimpleSquarePatch);
                case "simple-tri":
                    return await this._loadPatchData(SimpleTriPatch);
                case "filtered-saw":
                    return await this._loadPatchData(FilteredSaw);
                case "wobbly-square":
                    return await this._loadPatchData(WobblySquare);
                default:
                    return await this._loadPatchData(SimpleSinePatch);
            }
        }
    }

    /**
     * Attempt to load a patch by fetching a URL
     * @param url should point to a valid patch JSON object
     * @returns true iff patch is successfully loaded
     */
    private async _loadPatchURL(url : string | URL) : Promise<boolean> {
        let response = await fetch(url);
        let json = await response.json();
        if (isPatch(json)) {
            return await this._loadPatchData(json, url.toString());
        } else {
            this._loadPatchData(SimpleSinePatch);
            return false;
        }
    }


    private async _loadPatchData(json : SynthPatch, url : string = './') : Promise<boolean> {
        const path = url.split('/').slice(0, -1).join('/') + "/";
        this.patch = json;
        this.parameters = [ ];
        this._destroyAllGenerators();
        this.sound_gens = [];

        for (const node of this.patch.nodes) {
            if (Array.isArray(node["samples"])) {

                const samples : PitchedSample[] = node['samples']
                    .filter(s => isPitchedSample(s))
                    .sort((a, b) => a.step - b.step);
                samples.forEach(s => { 
                    s.sample = path + s.sample;
                    SoundLoader.loadAudioBuffer(s.sample);
                });
                node['samples'] = samples;
            }
            else if (node['type'] === 'reverb') {
                await SoundLoader.loadCustomSound(node['impulse']);
            }
            else if (node['type'] === 'buffer source') {
                await SoundLoader.loadCustomSound(node['buffer']);
            }
        }
        if (Array.isArray(this.patch['parameters'])) {
            for (const config of this.patch['parameters']) {
                this.parameters.push(SynthParameter.fromJSON(config));
            }
        }
        return true;
    }


    /**
     * Update parameter value for all playing and scheduled notes
     */
    updateParameter(pname : string, value : any) {

        let nodeId = -1;
        for (let param of this.parameters) {
            if (param.name === pname) {
                nodeId = param.nodeId;
                break;
            }
        }
        if (nodeId < 0) return;

        /// update any node instances in active tone generators
        this.bank.forEach((chain) => { chain.updateParameter(nodeId, pname, value); });

        /// update the patch itself to match the new parameter value
        for (const node of this.patch.nodes) {
            if (node['id'] == nodeId) node[pname] = value;
        }
    }

    /**
     * Set attack value for the current synth patch in seconds (>= 0)
     */
    public set attack(A : number) {
        this.bank.forEach((chain) => { if (chain.out) chain.out.A = Math.max(0.0, A) });
        this.patch.nodes
            .filter((n) => n.type === 'out')
            .forEach((n) => (n as ADSREnvelope).A = Math.max(0.0, A));
    }

    /**
     * Set decay value for the current synth patch in seconds (>= 0)
     */
    public set decay(D : number) {
        this.bank.forEach((chain) => { if (chain.out) chain.out.D = Math.max(0.0, D) });
        this.patch.nodes
            .filter((n) => n.type === 'out')
            .forEach((n) => (n as ADSREnvelope).D = Math.max(0.0, D));
    }

    /**
     * Set sustain value for the current synth patch [0.0, 1.0]
     */
    public set sustain(S : number) {
        this.bank.forEach((chain) => { if (chain.out) chain.out.S = clamp(S, 0.0, 1.0) });
        this.patch.nodes
            .filter((n) => n.type === 'out')
            .forEach((n) => (n as ADSREnvelope).S = clamp(S, 0.0, 1.0));
    }

    /**
     * Set release value for the current synth patch in seconds (>= 0)
     */
    public set release(R : number) {
        this.bank.forEach((chain) => { if (chain.out) chain.out.R = Math.max(0.0, R) });
        this.patch.nodes
            .filter((n) => n.type === 'out')
            .forEach((n) => (n as ADSREnvelope).R = Math.max(0.0, R));
    }

    /**
     * Set the output volume of the current patch in decibels [-50.0, 5.0]dB
     */
    public set volume(dB : number) {
        this.bank.forEach((chain) => { chain.out?.updateParameter('level', clamp(dB, -50.0, 5.0)); });
        this.patch.nodes
            .filter((n) => n.type === 'out')
            .forEach((n) => n.level = clamp(dB, -50.0, 5.0));
    }


    /*

  /// update connector gain level
  void updateConnectorLevel(int nodeId, int connectorId, num dB) {
    bank.forEach((chain) { chain.updateConnectorLevel(nodeId, connectorId, dB); });
    if (patch['routing'] is List) {
      for (Map conn in patch['routing']) {
        if (conn['id'] == connectorId) {
          conn['level'] = dB;
        }
      }
    }
  }


  /// ask the synthesizer to keep analyzer nodes attached to the given node connector
  void attachAnalyzer(int nodeId, int connectorId, int fftSize, int channels) {
    _analyzers[connectorId] = {
      'nodeId' : nodeId,
      'connectorId' : connectorId,
      'fftSize' : fftSize,
      'channels' : channels
    };
  }

  void detachAnalyzer(int nodeId, int connectorId) {
    bank.forEach((chain) { chain.detachAnalyzer(nodeId, connectorId); });
    _analyzers.remove(connectorId);
  }


  /// collects time domain data from all attached analyzers at the given connector
  void getFloatTimeDomainData(int nodeId, int connectorId, int channel, Float32List buff) {
    buff.fillRange(0, buff.length, 0);  // zero out list
    bank.forEach((chain) {
      if (chain.free > 0) {
        chain.getFloatTimeDomainData(nodeId, connectorId, channel, buff);
      }
    });
  }
*/

    /// checkout a tone generator to play a sound
    private _allocateGenerator(context : BaseAudioContext, when : number) : SynthChain | undefined {
        if (this.bank.length > 0 && this.bank[0].context != context) {
            this._destroyAllGenerators();
        }

        for (const chain of this.bank) {
            if (chain.free < when && chain.context == context) {
                this._analyzers.forEach((m) => {
                    if (chain.free == 0) {
                        chain.attachAnalyzer(m['nodeId'], m['connectorId'], m['fftSize'], m['channels']);
                    }
                });
                return chain;
            }
        }


        if (this.bank.length < Synthesizer.MAX_GENERATORS) {
            const chain = new SynthChain(context);
            chain.loadPatch(this.patch);
            this.bank.push(chain);
            this._analyzers.forEach((a) => {
                chain.attachAnalyzer(a['nodeId'], a['connectorId'], a['fftSize'], a['channels']);
            });
            return chain;
        } else {
            return undefined;
        }
    }


    private _releaseGenerator(generator: SynthChain) {
        generator.cancelNotes();
        this._analyzers.forEach((m) => {
            generator.detachAnalyzer(m['nodeId'], m['connectorId']);
        })
    }


    private _destroyAllGenerators() {
        this.bank.forEach((chain) => { chain.destroy(); });
        this.bank = [ ];
    }
}

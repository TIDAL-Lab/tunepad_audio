import { Note } from "./note";
import { MusicTrace } from "./trace";
import { SynthChain } from "./chain";
import { SynthParameter } from "./param";
export interface SynthPatch {
    name: string;
    nodes: Array<any>;
    routing: Array<any>;
    version: string;
    format: string;
    parameters: Array<any>;
}
/**
 * List of built-in patch names
 */
export type BuiltinPatchName = ("simple-sine" | "simple-saw" | "simple-square" | "simple-tri" | "filtered-saw" | "wobbly-square");
export type SynthPatchRef = BuiltinPatchName | SynthPatch | URL;
/**
 * Polyphonic audio synthesizer.
 */
export declare class Synthesizer {
    /** allow a maximum of 24 simultaneous notes */
    static readonly MAX_GENERATORS = 24;
    /** tempo (beats per minute) */
    get bpm(): number;
    set bpm(tempo: number);
    private _bpm;
    /** list of currently scheduled or playing notes */
    private notes;
    /** the patch is a chain of samples and audio nodes that produce notes */
    private patch;
    /** name of the active patch */
    get voice(): string;
    /** bank of tone generators that we can check out to play notes */
    private bank;
    /** list of generators scheduled to play notes */
    private sound_gens;
    /** shortcut parameters that can be adjusted by user */
    parameters: SynthParameter[];
    /** optional analyzer node for visualizing audio stream */
    private _analyzer?;
    private _analyzers;
    private _effects;
    /**
     * Create a new synthesizer
     * @param patch optional name of the patch to load (e.g. "grand_piano")
     */
    constructor(patch?: SynthPatchRef);
    /**
     * Is the synth currently playing a sound?
     */
    get isPlaying(): boolean;
    /**
     * play and hold a note until `releaseNote` is called
     * @param note MIDI note to play
     * @param dest Optional audio destination node. If not provided, will play to AudioContext.destination
     */
    playNote(note: Note | number, dest?: AudioNode): void;
    /**
     * Release (stop playing) a note started with `playNote`
     * @param note
     */
    releaseNote(note: Note | number): void;
    /**
     * Immediately release all notes that are currently being played by `playNote`
     */
    releaseAll(): void;
    /**
     * Release a sustained note event
     */
    private _release;
    scheduleNote(note: Note, dest: AudioNode, start: number, delta?: number): SynthChain | undefined;
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
    cancelAllNotes(): void;
    scheduleNotes(trace: MusicTrace, dest: AudioNode, delta: number): void;
    /**
     * Experimental. Generate MIDI output events
     * @param trace
     * @param delta time before the start of the next measure (in beats)
     * when this note is to be scheduled. if negative, skip the beginning of a loop
     * @param port which MIDIOutput port to send messages to
     * @param gain adjust output velocity of all notes (number >= 0.0)
     */
    scheduleMidiNotes(trace: MusicTrace, delta: number, port: MIDIOutput, gain?: number): void;
    /**
     * Sets the MIDI output "program" or instrument voice
     */
    setMidiProgram(port: MIDIOutput, voice: number): void;
    /**
     * Send noteOff to all possible midi note values
     */
    cancelAllMidiNotes(port: MIDIOutput): void;
    /**
     * Set the pitch bend "wheel" to the given number of cents.
     * This only applies to currently scheduled or playing notes.
     */
    pitchBend(cents: number): void;
    /**
     * Load a patch by name (for built-in patches), by URL, or by using a custom patch object.
     * * Create custom patches at https://tunepad.com/patchworks and use File -> Export.
     * * Builtin patches include
     *   * "simple-sine"
     *   * "simple-saw"
     *   * "simple-square"
     *   * "simple-tri"
     *   * "filtered-saw"
     *   * "wobbly-square"
     * * URLs must resolve to a valid patch JSON object. Any links to audio samples should be relative to the URL path.
     * @returns true iff the patch and all resources were successfully loaded.
     */
    loadPatch(patch: SynthPatchRef): Promise<boolean>;
    /**
     * Attempt to load a patch by fetching a URL
     * @param url should point to a valid patch JSON object
     * @returns true iff patch is successfully loaded
     */
    private _loadPatchURL;
    private _loadPatchData;
    /**
     * Return a synthesizer node (modular synth node) matching the given
     * node id number. node from the first tone generator will be used.
     * return undefined if there are not tone generators or no matching nodes
     */
    private getNodeById;
    /**
     * Update parameter value for all playing and scheduled notes
     */
    updateParameter(pname: string, value: any): void;
    /**
     * Set attack value for the current synth patch in seconds (>= 0)
     */
    set attack(A: number);
    /**
     * Set decay value for the current synth patch in seconds (>= 0)
     */
    set decay(D: number);
    /**
     * Set sustain value for the current synth patch [0.0, 1.0]
     */
    set sustain(S: number);
    /**
     * Set release value for the current synth patch in seconds (>= 0)
     */
    set release(R: number);
    /**
     * Set the output volume of the current patch in decibels [-50.0, 5.0]dB
     */
    set volume(dB: number);
    private _allocateGenerator;
    private _releaseGenerator;
    private _destroyAllGenerators;
}
//# sourceMappingURL=synth.d.ts.map
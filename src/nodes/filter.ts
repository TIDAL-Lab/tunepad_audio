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
import { Note } from "../note";
import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
import { toNum, toStr, toBool, clamp } from "../utils";


export class SynthFilterNode extends SynthNode {

    /// audio nodes
    filter : BiquadFilterNode;

    /// keyboard tracking enabled (adjust frequency based on source note pitch)
    tracking = true;
    ratio = 1.0;

    /// configurable parameters
    frequency = 350.0;    // hz default value of 350.0;
    Q = 1.0;              // range: 0.0001 to 1000 (default 1.0)
    gain = 0.0;           // decibels range: -40 to 40 (default 0.0)
    detune = 0;           // cents with default of 0
    type = "lowpass";


    /// list of all valid filter types
    static FILTERS : string[] = [
        "lowpass", "highpass", "bandpass", 
        "allpass", "lowshelf", "highshelf", 
        "peaking", "notch", 'allpass'
    ];


    constructor(context: BaseAudioContext, config: any) {
        super(context, config);

        // set up audio node chain
        this.filter = context.createBiquadFilter();
        this.filter.connect(this.level);

        // set up parameters
        this.Q = clamp(toNum(config['Q'], 1.0), 0.0001, 1000);
        this.gain = clamp(toNum(config['gain'], 0.0), -40, 40);
        this.type = toStr(config['filter type'], 'lowpass');
        this.detune = toNum(config['detune'], 0);
        this.frequency = clamp(toNum(config['frequency'], 350.0), 0, 16700);
        this.tracking = toBool(config['tracking'], true);
        this.ratio = toNum(config['tracking ratio'], 1.0);

        this.addModulator('Q', toNum(config['Q-mod'], 1.0), this.filter.Q);
        this.addModulator('gain', toNum(config['gain-mod'], 5), this.filter.gain);
        this.addModulator('frequency', toNum(config['frequency-mod'], 1000), this.filter.frequency);


        // set up filter node parameters
        this.filter.Q.value = this.Q;
        this.filter.gain.value = this.gain;
        this.filter.type = this.type as BiquadFilterType;
        this.filter.detune.value = this.detune;
        this.filter.frequency.value = this.frequency;
    }


    playNote(note : Note) {
        // keyboard tracking: set the frequency to be relative to the pitch
        const f = this.tracking ? (note.frequency * this.ratio) + this.frequency : this.frequency;
        const now = this.context.currentTime;

        this.filter.Q?.setValueAtTime(this.Q, now);
        this.filter.gain?.setValueAtTime(this.gain, now);
        this.filter.detune?.setValueAtTime(this.detune, now);
        this.filter.frequency?.setValueAtTime(f, now);
    }


    scheduleNote(note: Note, when: number, duration: number, release: number) {
        const offset = (when < 0) ? -when : 0;
        when = (when < 0) ? 0 : when;
        const now = this.context.currentTime!;
        const f = this.tracking ? (note.frequency * this.ratio) + this.frequency : this.frequency;

        this.filter.Q?.setValueAtTime(this.Q, when + now);
        this.filter.gain?.setValueAtTime(this.gain, when + now);
        this.filter.detune?.setValueAtTime(this.detune, when + now);
        this.filter.frequency?.setValueAtTime(f, when + now);
    }


    cancelNotes() {
        super.cancelNotes();
        this.filter.Q?.cancelScheduledValues(0);
        this.filter.gain?.cancelScheduledValues(0);
        this.filter.detune?.cancelScheduledValues(0);
        this.filter.frequency?.cancelScheduledValues(0);
    }


    destroy() {
        super.destroy();
        this.filter.disconnect();
    }


    connect(source: SynthConnector, dest: string) {
        if (dest === 'audio') {
            source.level.connect(this.filter);
        } else {
            super.connect(source, dest);
        }
    }


    /// update a node parameter by name
    updateParameter(pname: string, newValue: any) {
        const now = this.context.currentTime;
        if (pname === 'filter type' && SynthFilterNode.FILTERS.includes(newValue)) {
            this.type = toStr(newValue, 'lowpass');
            this.filter.type = this.type as BiquadFilterType;
        } else if (pname === 'Q') {
            this.Q = clamp(toNum(newValue, this.Q), 0.0001, 1000);
            this.filter.Q.cancelScheduledValues(0);
            this.filter.Q.setValueAtTime(this.Q, now);
            this.filter.Q.value = this.Q;
        } else if (pname === 'gain') {
            this.gain = clamp(toNum(newValue, this.gain), -40, 40);
            this.filter.gain.cancelScheduledValues(0);
            this.filter.gain.setValueAtTime(this.gain, now);
            this.filter.gain.value = this.gain;
        } else if (pname === 'detune') {
            this.detune = toNum(newValue, this.detune);
            this.filter.detune?.cancelScheduledValues(0);
            this.filter.detune?.setValueAtTime(this.detune, now);
        } else if (pname === 'frequency') {
            this.frequency = clamp(toNum(newValue, this.frequency), 0, 16700);
            this.filter.frequency?.cancelScheduledValues(0);
            this.filter.frequency?.setValueAtTime(this.frequency, now);
            this.filter.frequency.value = this.frequency;
        } else if (pname === 'tracking') {
            this.tracking = toBool(newValue, this.tracking);
        } else if (pname === 'ratio') {
            this.ratio = toNum(newValue, this.ratio);
        } else {
            super.updateParameter(pname, newValue);
        }
    }

/*
  Future<Float32List> getVisualizationData() {
    const int fbins = 12 * 11; // 11 octaves
    Float32List f_array = Float32List(fbins);  // frequency bins
    Float32List m_array = Float32List(fbins);  // magnitude
    Float32List p_array = Float32List(fbins);  // phase
    for (int i=0; i<fbins; i++) {
      f_array[i] = Note(i - 12).frequency.toDouble();
    }
    filter.getFrequencyResponse(f_array, m_array, p_array);
    return Future.sync(() => m_array);
  }
  */
}

/*
 * TunePad
 *
 * Michael S. Horn
 * Northwestern University
 *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */
import { Note } from "../note";
import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
import { toNum } from "../utils";


export class SynthDelayNode extends SynthNode {

    audioIn: GainNode;
    delayIn: GainNode;

    /// midi triggered gates for gain nodes
    gates = new Array<any>();

    /// delay time parameter
    delayTime = 0.1;



    constructor(context: BaseAudioContext, config: any) {
        super(context, config);

        this.delayTime = toNum(config['delay'], 0.1);
        this.audioIn = context.createGain();
        this.delayIn = context.createGain();

        this.addModulator('delay', toNum(config['delay-mod'], 0.5), this.delayIn.gain!);
        /*
        this.delay = context.createDelay();
    
        delay.delayTime?.value = delayTime;
        delay.connectNode(level);
        addModulator('delay', toNum(config['delay-mod'], 0.5), delay.delayTime!);
        */
    }


    connect(source: SynthConnector, dest: string) {
        if (dest == 'audio') {
            source.level.connect(this.audioIn);
        } else if (dest == 'delay') {
            source.level.connect(this.delayIn);
        } else {
            super.connect(source, dest);
        }
    }


    /// update a node parameter by name
    updateParameter(pname: string, newValue: any) {
        if (pname == 'delay') {
            this.delayTime = toNum(newValue, this.delayTime);
            this.gates.forEach((gate) => {
                gate['delay'].delayTime.linearRampToValueAtTime(this.delayTime, this.context.currentTime + 0.1);
            });
        } else {
            super.updateParameter(pname, newValue);
        }
    }


    playNote(note: Note) {
        const gate = this.context.createGain();
        gate.gain.value = 1.0;
        gate.gain.setValueAtTime(1.0, 0);

        const delay = this.context.createDelay();
        delay.delayTime.setValueAtTime(this.delayTime, 0);

        this.audioIn.connect(gate);
        this.delayIn.connect(delay.delayTime);
        gate.connect(delay);
        delay.connect(this.level);
        this.gates.push({
            'free': -1,
            'gate': gate,
            'delay': delay
        });

        this._freeGates();
    }


    /// release the note (key up / note off)
    releaseNote() {
        this._freeGates();
        this.gates.forEach((gate) => {
            if (gate['free'] < 0) {
                gate['free'] = this.level.context!.currentTime!;
            }
        });
    }


    _freeGates() {
        const now = this.context.currentTime;
        this.gates = this.gates.filter((gate) => {
            if (gate['free'] >= 0 && gate['free'] < now) {
                gate['gate'].disconnect();
                gate['delay'].disconnect();
                return false;
            } else {
                return true;
            }
        });
    }


    /// schedule a note to be played in the future
    scheduleNote(note: Note, when: number, duration: number, release: number) {
        const now = this.context.currentTime;
        const free = now + when + duration + release;

        //-------------------------------------------------
        // create a gated delay node that is only open
        // while the note is playing
        //-------------------------------------------------
        const gate = this.context.createGain();
        gate.gain.value = 0;
        gate.gain.setValueAtTime(0, 0);
        gate.gain.setValueAtTime(1.0, Math.max(now, now + when));
        gate.gain.setValueAtTime(0.0, free);

        const delay = this.context.createDelay();
        delay.delayTime.setValueAtTime(this.delayTime, now);

        this.audioIn.connect(gate);
        this.delayIn.connect(delay.delayTime);
        gate.connect(delay);
        delay.connect(this.level);

        this.gates.push({
            'free': free,
            'gate': gate,
            'delay': delay
        });

        this._freeGates();
    }


    destroy() {
        super.destroy();
        this.gates.forEach((gate) => {
            gate['gate'].disconnect();
            gate['delay'].disconnect();
        });
        this.gates = [];
        this.audioIn.disconnect();
        this.delayIn.disconnect();
    }


    cancelNotes() {
        this.gates.forEach((gate) => {
            gate['gate'].disconnect();
            gate['delay'].disconnect();
        });
        this.gates = [];
    }
}

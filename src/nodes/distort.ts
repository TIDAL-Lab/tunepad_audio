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
import { SynthNode } from "./node";
import { SynthConnector } from "./connector";
import { toNum, toStr } from "../utils";

export class SynthDistortionNode extends SynthNode {

    /// pre gain
    gain: GainNode;

    /// creates distortion effects
    dist: WaveShaperNode;

    param = 0.0;
    curve = 'tanh';

    constructor(context: BaseAudioContext, config: any) {
        super(context, config);
        this.param = toNum(config['param'], this.param);
        this.curve = toStr(config['curve'], this.curve);
        this.dist = new WaveShaperNode(context);
        this.dist.curve = this._makeCurve();
        this.dist.oversample = '4x';
        this.gain = new GainNode(context);
        this.gain.gain.value = toNum(config["pre-gain"], 1.0);
        this.gain.connect(this.dist);
        this.dist.connect(this.level);
    }


    connect(source: SynthConnector, dest: string) {
        if (dest === 'audio') {
            source.level.connect(this.gain);
        } else {
            super.connect(source, dest);
        }
    }

    destroy() {
        super.destroy();
        this.gain.disconnect();
        this.dist.disconnect();
    }


    /// update a node parameter by name
    updateParameter(pname: string, newValue: any) {
        super.updateParameter(pname, newValue);
        if (pname === 'param') {
            this.param = toNum(newValue, this.param);
            this.dist.curve = this._makeCurve();
        } else if (pname === 'curve') {
            this.curve = toStr(newValue, this.curve);
            this.dist.curve = this._makeCurve();
        } else if (pname === 'pre-gain') {
            this.gain.gain.value = toNum(newValue, 1.0);
        }
    }


    // in: continuous function -> out: discretized version
    _makeCurve(): Float32Array {
        const buff = new Float32Array(512);
        const f = this._curve(this.curve);
        for (let i = 0; i < buff.length; i++) {
            const x = mix(-1, 1, i / (buff.length - 1));
            buff[i] = f(x, this.param);
        }
        return buff;
    }


    _curve(name: string) {
        switch (name) {
            case 'tanh': return _tanh;
            case 'sigmoid': return _sigmoid;
            case 'sin': return _sine;
            case 'sine': return _sine;
            case 'steep sin': return _steep_sine;
            case 'steep sine': return _steep_sine;
            default: return _tanh;
        }
    }
}



// classic, soft clip
function _tanh(x: number, p: number): number {
    const c = 5;
    const b = 1 + c - p * c;
    const e2x = Math.pow(Math.E, b * x);
    return (e2x - 1) / (e2x + 1);
}

// from the web, soft clip
function _sigmoid(x: number, p: number): number {
    const deg = Math.PI / 180;
    const k = p * 50;
    return (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
}

// funky
function _sine(x: number, p: number): number {
    const loops = 1 + p * 5;
    return Math.sin(x * (loops * 19.8) / (2 * Math.PI));
}

function _steep_sine(x: number, p: number): number {
    const c = 19.8 / 2 * Math.PI;
    return mix(Math.pow(Math.sin(x * c), 5), Math.sin(x * c), p);
}

/// aka lerp, linearly interpolate b/w a and b
function mix(a: number, b: number, interp: number) {
    return a + interp * (b - a);
}
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
import { clamp } from "./utils";
import { GrowableAudioBuffer } from "./buffer";


/**
 * Stores a compressed/reduced version of an audio buffer with just enough information to 
 * render a waveform visualization. 
 */
export class WaveformData {

    private waveform = new Array<Array<number>>();

    // source audio sample rate (hardcoded for now)
    readonly sampleRate = 44100;

    // each datapoint of the visualization represents 256 audio samples;
    readonly waveQuantum = 128;

    // waveform visualization sample rate (e.g. draw one bar for every N seconds of audio)
    get waveRate() { return this.sampleRate / this.waveQuantum; }

    get isEmpty() { return this.waveform.length == 0; }

    // length of the waveform in seconds
    get duration() { return this.waveform.length / this.waveRate; }

    private _wavelines : SVGGElement;
    private _wavepath : SVGPathElement;
    private _top_path = new Array<string | number>();
    private _bottom_path = new Array<string | number>();


    /**
     * Create a new empty waveform
     */
    public constructor() {
        this._wavelines = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        this._wavepath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    }


    /**
     * Appends one waveform sample representing 256 underlying audio samples (waveQuantum)
     */
    public appendSample(sample : Array<number>) {
        if (sample.length >= 2) {
            this.waveform.push(sample);
            const time = this.duration;
            const y1 = Math.sign(sample[1]) * clamp(Math.sqrt(Math.abs(sample[1])), 0, 1);
            const y2 = Math.sign(sample[0]) * clamp(Math.sqrt(Math.abs(sample[0])), 0, 1);
            const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
            line.setAttribute('x1', `${time}`);
            line.setAttribute('x2', `${time}`);
            line.setAttribute('y1', `${y1}`);
            line.setAttribute('y2', `${y2}`);
            line.classList.add('waveline');
            this._wavelines.append(line);
            this._top_path.push("L", time, y1);
            this._bottom_path.unshift("L", time, y2);
        }
    }


    /**
     * Append the given audio data to this waveform.
     */
    public appendBuffer(buffer : AudioBuffer | GrowableAudioBuffer) {
        const left = buffer.getChannelData(0);
        const right = (buffer.numberOfChannels > 1) ? buffer.getChannelData(1) : left;
        const stride = this.waveQuantum;
        let amin = 0, amax = 0;
        for (let i = 0; i < buffer.length; i++) {
            amin = Math.min(amin, Math.min(left[i], right[i]));
            amax = Math.max(amax, Math.max(left[i], right[i]));
            if (((i+1) % stride) === 0) {
                this.appendSample([ amin, amax ]);
                amax = 0.0;
                amin = 0.0;
            }
        }
    }


    /**
     * Create a new buffer from the given AudioBuffer object
     */
    public static fromBuffer(buffer : AudioBuffer | GrowableAudioBuffer) : WaveformData {
        const wave = new WaveformData();
        wave.appendBuffer(buffer);
        return wave;
    }


    public get wavepath() : SVGPathElement {
        const d = [ "M", 0, 0, ...this._top_path, ...this._bottom_path, "Z" ].join(' ');
        this._wavepath.setAttribute("d", d);
        return this._wavepath;
    }

    public get wavelines() : SVGGElement {
        return this._wavelines;
    }
}

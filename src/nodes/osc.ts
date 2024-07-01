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
import { EffectCurve } from './curve';
import { SynthNode } from './node';
import { toStr, toNum, toBool, clamp } from '../utils';
import { Note } from '../note';


//-----------------------------------------------------------------------
// Oscillator Node: simple built-in waveforms
//-----------------------------------------------------------------------

export class SynthOscNode extends SynthNode {

    /// generates the carrier or modulator wave
    osc : OscillatorNode;

    /// creates alternative wave shapes
    shaper : WaveShaperNode;

    /// pre-gain helps make sure we don't harm anyone's hearing
    gain : GainNode;

    /// frequency of the oscillator (for fixed frequency)
    frequency = 440.0;  // Hz

    /// frequency multiplier for relative frequency mode
    multiplier = 1.0;

    /// the detune setting of the osc from the designer ui
    detune = 0.0;

    /// if true, the frequency is relative to the note being played
    relative = true;

    /// name of waveform from ui selector
    waveform = 'sine';

    static BasicWaveforms = [ "sine", "square", "triangle", "sawtooth" ];
    static PeriodicWaveforms = [
        "cello", "flute", "reed", "brass",
        "glass", "vibraphone", "camel",
        "organ 1", "organ 2", "organ 3", "soft saw", "soft square",
        "buzz 1", "buzz 2" 
    ];

    static ShaperWaveforms = [ "pitched noise", "exp sin", "hump" ];

    static Waveforms = [
        ... SynthOscNode.BasicWaveforms,
        ... SynthOscNode.PeriodicWaveforms,
        ... SynthOscNode.ShaperWaveforms
    ];


    constructor(context : BaseAudioContext, config : any) {
        super(context, config);
        this.waveform = toStr(config['waveform'], 'sine');
        this.frequency = toNum(config['frequency'], this.frequency);
        this.detune = toNum(config['detune'], 0.0);
        this.relative = toBool(config['relative'], true);
        this.multiplier = toNum(config['multiplier'], this.multiplier);

        this.osc = context.createOscillator();
        this.gain = new GainNode(context);
        this.shaper = context.createWaveShaper();

        this.addModulator('detune', toNum(config['detune-mod'], 500), this.osc.detune);
        this.addModulator('frequency', toNum(config['frequency-mod'], 1000), this.osc.frequency);
        this.addModulator('amplitude', toNum(config['amplitude-mod'], 1.0), this.level.gain);

        this.gain.gain.value = 0.3;
        if (!SynthOscNode.Waveforms.includes(this.waveform)) this.waveform = 'sine';
        this.osc.frequency.setValueAtTime(90, 0);
        this.osc.type = 'sine';
        this.osc.start();
        this.osc.connect(this.gain);
        this.shaper.connect(this.gain);  // no input by default
        this.gain.connect(this.level);

        this._updateWaveform(this.waveform);
    }


    _updateWaveform(waveform : string) {
        if (SynthOscNode.Waveforms.includes(waveform)) this.waveform = waveform;

        this.osc.type = 'sine';
        if (SynthOscNode.BasicWaveforms.includes(waveform)) {
            this.osc.type = waveform as OscillatorType;
            this.osc.disconnect();
            this.osc.connect(this.gain);
        }
        else if (SynthOscNode.PeriodicWaveforms.includes(waveform)) {
            this.osc.setPeriodicWave(this._createPeriodicWave(waveform));
            this.osc.disconnect();
            this.osc.connect(this.gain);
        }
        else if (SynthOscNode.ShaperWaveforms.includes(waveform)) {
            this.shaper.curve = this._createWaveShaper(waveform);
            this.osc.disconnect();
            this.osc.connect(this.shaper);
            if (waveform === 'pitched noise') {
                this.osc.type = 'sawtooth';
            } else {
                this.osc.type = 'sine';
            }
        }
    }


    _createWaveShaper(waveform : string) : Float32Array {
        var buffer = new Float32Array(256);
        var bufferFun; // domain & range: -1 -> 1
        switch(waveform) {
            case 'exp sin':
                bufferFun = (x : number) => Math.pow(x, 5);
                break;
            case 'hump':
                bufferFun = (x : number) => (x < 0 ? 0 : x) - 0.5;
                break;
            case 'pitched noise':
            default:
                bufferFun = (x : number) => Math.random() * 2 - 1;
                break;
        }
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = bufferFun(2 * i / buffer.length - 1);
        }
        return buffer;
    }


    _createPeriodicWave(waveform : string) : PeriodicWave {
        let real = new Array<number>();

        switch (waveform) {
            // spec says real[0] is supposed to be DC offset but WebAudio ignores it >:o
            // I handle it at the end of this func with a ConstSignalNode
            case 'cello':
                //real = [-0.15, 1, 0.5, .1, .4, .2, .3, .45, .4, .3, .125, 0.01];
                real = [0.0, 1.0, 0.5, 0.3, 0.5, 0.35, 0.2, 0.2, .1, 0.15, 0.15, 0.15];
                break;
            case 'flute':
                real = [0.0, 0.5, 0.05, 0.3, 0.1];
                break;
            case 'reed':
                real = [-0.15, 0.5, 1.0, 0.4, 0.6, 0.3, 0.25, 0.2];
                break;
            case 'brass':
                real = [0.0, 0.8, 0.8, 0.85, 0.9, 0.8, 0.85, 0.7, 0.6, 0.4, 0.3, 0.25, 0.2, 0.1];
                break;
            case 'glass':
                real = [0.0, 1.0, 0.0, 0.25, 0.0, 0.5, 0.0, 0.75, 0.0, 0.8];
                break;
            case 'vibraphone':
                real = [0.0, 6, 19, 0.8, 13, 3];
                break;
            case 'camel':
                real.push(0);
                for (let i = 1; i < 20; i++) { real.push(1 / Math.pow(i, 2)); }
                break;
            case 'soft saw': // first 20 harmoics of saw wave
                real.push(-0.1);
                for (let i = 1; i < 20; i++) { real.push(1 / i); }
                break;
            case 'soft square':
                real.push(0);
                for (let i = 1; i < 50; i++) { real.push(1 / i * (i % 2)); }
                break;
            case 'organ 1': // these are basically drawbars...
                real = [-0.1, 1.0, 1.0, 1.0];
                break;
            case 'organ 2':
                real = [-0.1, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8];
                break;
            case 'organ 3':
                real = [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.8, 0.8, 0.8];
                break;
            case 'buzz 1':
                real.push(0);
                let n = 1;
                for (let i = 1; i < 100; i++) {
                    if (i % 3 == 0 || i % 4 == 0) {
                        real.push(1.0 / n);
                        n++;
                    } else {
                        real.push(0);
                    }
                }
                break;
            case 'buzz 2':
            default:
                real.push(0);
                n = 1;
                for (let i = 1; i < 100; i++) {
                    if (i % 5 == 0 || i % 2 == 0) {
                        real.push(0.5 / n);
                        n++;
                    } else {
                        real.push(0);
                    }
                }
                break;
        }
        return this.osc.context.createPeriodicWave(real, new Float32Array(real.length));
    }


    playNote(note : Note) {
        let f = this.relative ? note.frequency * this.multiplier : this.frequency;
        f = clamp(f, 0, 23999);
        this.osc.frequency?.setValueAtTime(f, this.context.currentTime);
        this.osc.detune?.setValueAtTime(this.detune, this.context.currentTime);
    }


    scheduleNote(note : Note, when : number, duration : number, release : number) {
        const offset = (when < 0) ? -when : 0;
        when = (when < 0) ? 0 : when;
        let f = this.relative ? note.frequency * this.multiplier : this.frequency;
        f = clamp(f, 0, 23999);
        this.osc.frequency?.setValueAtTime(f, when + this.context.currentTime);
        this.osc.detune?.setValueAtTime(this.detune, when + this.context.currentTime);
    }


    cancelNotes() {
        super.cancelNotes();
        this.osc.frequency?.cancelScheduledValues(0);
        this.osc.detune?.cancelScheduledValues(0);
    }


    destroy() {
        super.destroy();
        this.osc.stop();
        this.osc.disconnect();
        this.gain.disconnect();
        this.shaper.disconnect();
    }


    pitchBend(cents : number) {
        const when = this.context.currentTime;
        this.osc.detune?.setTargetAtTime(this.detune + cents, when, 0.1);
    }


    /// bend the pitch of a note by the given number of cents (hundredths of a half step)
    /// The main parameter is an array of floating-point numbers representing the curve the
    /// note will change along its duration. The specified values are spaced equally along this duration.
    ///    start - start time of the bend in seconds
    ///    cents - pitch bend value curve over time
    schedulePitchBend(start : number, cents : EffectCurve) {
        cents.apply(this.osc.detune, start, this.context, this.detune);
    }


    /// update a node parameter by name
    updateParameter(pname : string, newValue : any) {
        if (pname === 'waveform') {
            this._updateWaveform(newValue);
        } else if (pname == 'relative') {
            this.relative = toBool(newValue, true);
        } else if (pname == 'frequency') {
            this.frequency = toNum(newValue, this.frequency);
            this.osc.frequency?.setValueAtTime(this.frequency, this.context.currentTime);
        } else if (pname == 'multiplier') {
            if (this.relative) {
                let f = this.osc.frequency.value / this.multiplier;
                this.multiplier = toNum(newValue, this.multiplier);
                if (this.multiplier > 0) f *= this.multiplier;
                f = clamp(f, 0, 23999);
                this.osc.frequency?.setValueAtTime(f, this.context.currentTime);
            } else {
                this.multiplier = toNum(newValue, this.multiplier);
            }
        } else if (pname == 'detune') {
            this.detune = toNum(newValue, this.detune);
            this.osc.detune?.setValueAtTime(this.detune, this.context.currentTime);
        } else {
            super.updateParameter(pname, newValue);
        }
    }

/*
  Future<Float32List> getVisualizationData() async {
    SynthOscNode wavegen = SynthOscNode(context, { 'waveform' : waveform, 'level' : 1.0 });
    AnalyserNode analyzer = AnalyserNode(context);
    GainNode gain = GainNode(context);

    analyzer.fftSize = 256;
    analyzer.smoothingTimeConstant = 0;
    gain.gain?.value = 0.0;
    wavegen.gain.gain?.value = 0.5;
    wavegen.level.gain?.value = level.gain?.value;

    var buff = Float32List(analyzer.frequencyBinCount!);
    wavegen.level.connectNode(analyzer);
    analyzer.connectNode(gain);
    gain.connectNode(context.destination!);
    wavegen.playNote(Note(66));
    await Future.delayed(const Duration(milliseconds : 100));
    analyzer.getFloatTimeDomainData(buff);
    wavegen.releaseNote();
    analyzer.disconnect();
    wavegen.destroy();
    return buff;
  }
  */
}

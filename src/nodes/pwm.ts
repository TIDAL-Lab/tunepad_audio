/*
 * TunePad
 *
 * Dillon Hall and Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
 * Copyright 2021, Michael S. Horn
 *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */
import { SynthNode } from "./node";
import { EffectCurve } from "./curve";
import { toNum, toBool, clamp } from "../utils";
import { Note } from "../note";

//-----------------------------------------------------------------------
// Oscillator Node: simple built-in waveforms
//-----------------------------------------------------------------------

export class SynthPWMNode extends SynthNode {

  /// generates the carrier wave
  driver : OscillatorNode;

  /// creates alternative wave shapes
  shaper : WaveShaperNode;

  /// controls width of pulse
  csn : ConstantSourceNode;

  /// pre-gain helps make sure we don't harm anyone's hearing
  gain : GainNode;

  /// frequency of the oscillator (for fixed frequency)
  frequency = 220.0;  // Hz

  /// frequency multiplier for relative frequency mode
  multiplier = 1.0;

  /// the detune setting of the osc from the designer ui
  detune = 0.0;

  /// if true, the frequency is relative to the note being played
  relative = true;


  constructor(context : BaseAudioContext, config : any) {
    super(context, config);
    var squareCurve = new Float32Array(512);
    for (let i = 0; i < squareCurve.length/2; i++ ) {
      squareCurve[i] = -1.0;
      squareCurve[i+Math.floor(squareCurve.length/2)] = 1.0;
    }

    this.driver = new OscillatorNode(context);
    this.driver.type = 'sawtooth';
    this.gain = new GainNode(context);
    this.shaper = new WaveShaperNode(context);
    this.shaper.curve = squareCurve;
    this.csn = new ConstantSourceNode(context);

    this.addModulator('pulse width', 1.0, this.csn.offset!);
    this.addModulator('detune', toNum(config['detune-mod'], 400), this.driver.detune!);
    this.addModulator('frequency', toNum(config['frequency-mod'], 100), this.driver.frequency!);
    this.addModulator('amplitude', toNum(config['amplitude-mod'], 1.0), this.level.gain!);

    this.driver.connect(this.shaper);
    this.csn.connect(this.shaper);
    this.shaper.connect(this.gain);
    this.gain.connect(this.level);

    this.csn.offset.value = toNum(config['pulse width'], 0.0);
    this.frequency = toNum(config['frequency'], this.frequency);
    this.detune = toNum(config['detune'], this.detune);
    this.relative = toBool(config['relative'], this.relative);

    this.gain.gain.value = 0.3;
    this.driver.frequency.value = this.frequency;
    this.driver.detune.value = this.detune;

    this.csn.start();
    this.driver.start();
  }


  playNote(note : Note) {
    let f = this.relative ? note.frequency * this.multiplier : this.frequency;
    f = clamp(f, 0, 23999);
    this.driver.frequency.setValueAtTime(f, this.context.currentTime);
    this.driver.detune.setValueAtTime(this.detune, this.context.currentTime);
  }

  scheduleNote(note : Note, when : number, duration : number, release : number) {
    const offset = (when < 0) ? -when : 0;
    when = (when < 0) ? 0 : when;
    let f = this.relative ? note.frequency * this.multiplier : this.frequency;
    f = clamp(f, 0, 23999);
    this.driver.frequency.setValueAtTime(f, when + this.context.currentTime);
    this.driver.detune.setValueAtTime(this.detune, when + this.context.currentTime);
  }


  cancelNotes() {
    super.cancelNotes();
    this.driver.frequency.cancelScheduledValues(0);
    this.driver.detune.cancelScheduledValues(0);
  }


  destroy() {
    super.destroy();
    this.csn.stop();
    this.csn.disconnect();
    this.driver.stop();
    this.driver.disconnect();
    this.gain.disconnect();
    this.shaper.disconnect();
  }


  pitchBend(cents : number) {
    const when = this.context.currentTime;
    this.driver.detune.setTargetAtTime(this.detune + cents, when, 0.1);
  }


  /// bend the pitch of a note by the given number of cents (hundredths of a half step)
  /// The main parameter is an array of floating-point numbers representing the curve the
  /// note will change along its duration. The specified values are spaced equally along this duration.
  ///    start - start time of the bend in seconds
  ///    cents - pitch bend value curve over time
  schedulePitchBend(start : number, cents : EffectCurve) {
    cents.apply(this.driver.detune, start, this.context, this.detune);
  }


  /// update a node parameter by name
  updateParameter(pname : string, newValue : any) {
    if (pname === 'relative') {
      this.relative = toBool(newValue, true);
    } else if (pname == 'frequency') {
      this.frequency = toNum(newValue, this.frequency);
      this.driver.frequency.setValueAtTime(this.frequency, this.context.currentTime);
    } else if (pname === 'multiplier') {
      if (this.relative) {
        let f = this.driver.frequency.value / this.multiplier;
        this.multiplier = toNum(newValue, this.multiplier);
        if (this.multiplier > 0) f *= this.multiplier;
        f = clamp(f, 0, 23999);
        this.driver.frequency.setValueAtTime(f, this.context.currentTime);
      } else {
        this.multiplier = toNum(newValue, this.multiplier);
      }
    } else if (pname === 'detune') {
      this.detune = toNum(newValue, this.detune);
      this.driver.detune.setValueAtTime(this.detune, this.context.currentTime);
    } else if (pname === 'pulse width') {
      this.csn.offset.value = toNum(newValue, 0.0);
    } else {
      super.updateParameter(pname, newValue);
    }
  }

/*
  async getVisualizationData() : Promise<Float32Array> {
    const wavegen = new SynthPWMNode(this.context, { 'pulse width' : 0.0, 'level' : 1.0 });
    const analyzer = new AnalyserNode(this.context);
    const gain = new GainNode(this.context);

    analyzer.fftSize = 512;
    analyzer.smoothingTimeConstant = 0;
    this.gain.gain.value = 0.0;
    wavegen.gain.gain.value = 0.5;
    wavegen.csn.offset.value = this.csn.offset.value;
    wavegen.level.gain.value = this.level.gain.value;

    var buff = new Float32Array(analyzer.frequencyBinCount);
    wavegen.level.connect(analyzer);
    analyzer.connect(gain);
    gain.connect(this.context.destination);
    wavegen.playNote(new Note(66));
    await Future.delayed(const Duration(milliseconds : 100));
    analyzer.getFloatTimeDomainData(buff);
    wavegen.releaseNote();
    analyzer.disconnect();
    wavegen.destroy();
    return buff;
  }
    */
}

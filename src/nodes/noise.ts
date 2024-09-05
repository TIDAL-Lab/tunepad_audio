/*
 * TunePad
 *
 * Dillon Hall and Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
  *
 * This project was funded by the National Science Foundation (grant DRL-1612619).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */

import { SynthNode } from './node';
import { toStr } from '../utils';

//-----------------------------------------------------------------------
// White, Pink, and Brown noise
//-----------------------------------------------------------------------

export class SynthNoiseNode extends SynthNode {

    noise = 'white';

    white : AudioBuffer;
    pink : AudioBuffer;
    brown : AudioBuffer;

    source : AudioBufferSourceNode;
    gain : GainNode;

    get buffer() : AudioBuffer {
        switch (this.noise) {
            case 'pink': return this.pink;
            case 'brown': return this.brown;
            default: return this.white;
        }
    }

    static readonly NOISE_TYPES = [ 'white', 'pink', 'brown' ];


    constructor(context : BaseAudioContext, config : any) {
        super(context, config);
        this.noise = toStr(config['noise'], this.noise);

        /// build noise buffers
        const rate = context.sampleRate;
        const samples = rate * 2;

        this.white = context.createBuffer(1, samples, rate);
        this.pink = context.createBuffer(1, samples, rate);
        this.brown = context.createBuffer(1, samples, rate);

        const wbuff = this.white.getChannelData(0);
        const pbuff = this.pink.getChannelData(0);
        const bbuff = this.brown.getChannelData(0);

        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
        for (let i = 0; i < samples; i++) {
            // white noise
            wbuff[i] = Math.random() * 2 - 1;

            // pink noise algorithm from https://noisehack.com/generate-noise-web-audio-api/
            let w = Math.random();
            b0 = 0.99886 * b0 + w * 0.0555179;
            b1 = 0.99332 * b1 + w * 0.0750759;
            b2 = 0.96900 * b2 + w * 0.1538520;
            b3 = 0.86650 * b3 + w * 0.3104856;
            b4 = 0.55000 * b4 + w * 0.5329522;
            b5 = -0.7616 * b5 - w * 0.0168980;
            pbuff[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
            pbuff[i] *= 0.11; // (roughly) compensate for gain
            b6 = w * 0.115926;

            // brown noise algorithm
            bbuff[i] = (last + (0.02 * w)) / 1.02;
            last = bbuff[i];
            bbuff[i] *= 3.5;
        }

        /// build audio chain
        this.gain = new GainNode(context);
        this.gain.gain.value = 0.3;
        this.gain.connect(this.level);

        this.source = new AudioBufferSourceNode(context);
        this.source.buffer = this.buffer;
        this.source.loop = true;
        this.source.start();
        this.source.connect(this.gain);
    }


    destroy() {
        super.destroy();
        this.source.stop();
        this.source.disconnect();
        this.gain.disconnect();
    }


    /// update a node parameter by name
    updateParameter(pname : string, newValue : any) {
        super.updateParameter(pname, newValue);
        if (pname === 'noise') {
            this.noise = toStr(newValue, this.noise);
            this.source.disconnect();
            this.source = new AudioBufferSourceNode(this.context);
            this.source.buffer = this.buffer;
            this.source.loop = true;
            this.source.start();
            this.source.connect(this.gain);
        }
    }
/*
  Future<Float32List> getVisualizationData() async {
    var wavegen = SynthNoiseNode(context, { 'noise' : noise, 'level' : 1.0 });
    var analyzer = AnalyserNode(context);
    var gain = GainNode(context);

    analyzer.fftSize = 256;
    gain.gain?.value = 0.0;
    wavegen.level.gain?.value = 2.0;

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

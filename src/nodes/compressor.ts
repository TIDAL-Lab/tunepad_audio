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
import { toNum, clamp } from "../utils";


export class SynthCompressorNode extends SynthNode {

    compressor: DynamicsCompressorNode;

    constructor(context: BaseAudioContext, config: any) {
        super(context, config);
        this.compressor = context.createDynamicsCompressor();
        this.compressor.connect(this.level);
        this.compressor.threshold.value = toNum(config['threshold'], -24);
        this.compressor.knee.value = toNum(config['knee'], 30);
        this.compressor.ratio.value = toNum(config['ratio'], 12);
        this.compressor.attack.value = toNum(config['attack'], .003);
        this.compressor.release.value = toNum(config['release'], .25);
    }


    connect(source: SynthConnector, dest: string) {
        if (dest === 'audio') {
            source.level.connect(this.compressor);
        } else {
            super.connect(source, dest);
        }
    }

    destroy() {
        super.destroy();
        this.compressor.disconnect();
    }


    /// update a node parameter by name
    updateParameter(pname: string, newValue: any) {
        super.updateParameter(pname, newValue);
        if (pname === 'threshold') {
            this.compressor.threshold.value = clamp(toNum(newValue, -24), -100, 0);
        } else if (pname == 'knee') {
            this.compressor.knee.value = clamp(toNum(newValue, 30), 0, 40);
        } else if (pname == 'ratio') {
            this.compressor.ratio.value = clamp(toNum(newValue, 12), 1, 20);
        } else if (pname == 'release') {
            this.compressor.release.value = clamp(toNum(newValue, 0.25), 0, 1);
        } else if (pname == 'attack') {
            this.compressor.attack.value = clamp(toNum(newValue, 0.003), 0, 1);
        }
    }
}

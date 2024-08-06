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
import { toNum, dBToGain } from "../utils";

export class SynthStereoNode extends SynthNode {

    merger: ChannelMergerNode;

    leftGain: GainNode;
    rightGain: GainNode;


    constructor(context: BaseAudioContext, config: any) {
        super(context, config);
        this.merger = context.createChannelMerger(2);
        this.leftGain = new GainNode(context);
        this.rightGain = new GainNode(context);

        let db = toNum(config['left-level'], 0.0);
        this.leftGain.gain.setValueAtTime(dBToGain(db), 0);

        db = toNum(config['right-level'], 0.0);
        this.rightGain.gain?.setValueAtTime(dBToGain(db), 0);

        this.leftGain.connect(this.merger, 0, 0);
        this.rightGain.connect(this.merger, 0, 1);
        this.merger.connect(this.level);

        this.addModulator('left-level', toNum(config['left-level-mod'], 0.5), this.leftGain.gain!);
        this.addModulator('right-level', toNum(config['right-level-mod'], 0.5), this.rightGain.gain!);
    }


    connect(source: SynthConnector, dest: string) {
        if (dest === 'left') {
            source.level.connect(this.leftGain);
        } else if (dest === 'right') {
            source.level.connect(this.rightGain);
        } else {
            super.connect(source, dest);
        }
    }

    destroy() {
        super.destroy();
        this.merger.disconnect();
        this.leftGain.disconnect();
        this.rightGain.disconnect();
    }


    /// update a node parameter by name
    updateParameter(pname: string, newValue: any) {
        super.updateParameter(pname, newValue);
        if (pname === 'left-level') {
            let db = toNum(newValue, 0.0);
            this.leftGain.gain.setValueAtTime(dBToGain(db), 0);
        } else if (pname == 'right-level') {
            let db = toNum(newValue, 0.0);
            this.rightGain.gain.setValueAtTime(dBToGain(db), 0);
        }
    }
}

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
import { toNum } from "../utils";


export class SynthPannerNode extends SynthNode {

    panner: StereoPannerNode;


    constructor(context: BaseAudioContext, config: any) {
        super(context, config);
        this.panner = new StereoPannerNode(context);
        this.panner.pan.setValueAtTime(toNum(config['pan'], 0.0), 0);
        this.panner.connect(this.level);
        this.addModulator('pan', toNum(config['pan-mod'], 0.5), this.panner.pan);
    }


    connect(source: SynthConnector, dest: string) {
        if (dest === 'audio') {
            source.level.connect(this.panner);
        } else {
            super.connect(source, dest);
        }
    }



    destroy() {
        super.destroy();
        this.panner.disconnect();
    }


    /// update a node parameter by name
    updateParameter(pname: string, newValue: any) {
        super.updateParameter(pname, newValue);
        if (pname === 'pan') {
            this.panner.pan.setValueAtTime(toNum(newValue, 0.0), 0);
        }
    }
}

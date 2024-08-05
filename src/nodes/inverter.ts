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


//-----------------------------------------------------------------------
// Inverter Node
//-----------------------------------------------------------------------

export class SynthInverterNode extends SynthNode {

    inverter: GainNode;


    constructor(context: BaseAudioContext, config: any) {
        super(context, config);
        this.inverter = context.createGain();
        this.inverter.gain.value = -1;
        this.inverter.gain.setValueAtTime(-1, 0);
        this.inverter.connect(this.level);
    }

    connect(source: SynthConnector, dest: string) {
        source.level.connect(this.inverter);
    }

    destroy() {
        super.destroy();
        this.inverter.disconnect();
    }
}

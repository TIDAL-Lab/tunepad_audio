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
import { SynthNode } from './node';
import { Note } from "../note";

//-----------------------------------------------------------------------
// Random Signal Node
//-----------------------------------------------------------------------

export class SynthRandomSignalNode extends SynthNode {

  /// generates the randomly changing signal
  csn : ConstantSourceNode;


    constructor(context: BaseAudioContext, config: any) {
        super(context, config);
        this.csn = new ConstantSourceNode(context);
        this.csn.offset.value = 2 * Math.random() - 1;
        this.csn.connect(this.level);
        this.csn.start();
    }

    playNote(note : Note) {
        const v = 2 * Math.random() - 1;
        this.csn.offset.setValueAtTime(v, this.context.currentTime!);
    }

    scheduleNote(note : Note, when : number, duration : number, release : number) {
        const v = 2 * Math.random() - 1;
        const offset = (when < 0) ? -when : 0;
        when = (when < 0) ? 0 : when;
        this.csn.offset.setValueAtTime(v, when + this.context.currentTime!);
    }

    destroy() {
        super.destroy();
        this.csn.stop();
        this.csn.disconnect();
    }
}

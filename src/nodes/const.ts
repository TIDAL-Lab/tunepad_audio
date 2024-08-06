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
import { toNum } from '../utils';

//-----------------------------------------------------------------------
// Constant Signal Node
//-----------------------------------------------------------------------

export class SynthConstNode extends SynthNode {

  /// generates the carrier or modulator wave
  csn : ConstantSourceNode;


  constructor(context: BaseAudioContext, config : any) {
    super(context, config);
    this.csn = context.createConstantSource();
    this.csn.offset.value = toNum(config['signal'], 1.0);
    this.csn.connect(this.level);
    this.csn.start();
  }

  destroy() {
    super.destroy();
    this.csn.stop();
    this.csn.disconnect();
  }

  /// update a node parameter by name
  updateParameter(pname : string, newValue : any) {
    super.updateParameter(pname, newValue);
    if (pname === 'signal') {
      this.csn.offset.setValueAtTime(toNum(newValue, 1.0), this.context.currentTime!);
    }
  }
}

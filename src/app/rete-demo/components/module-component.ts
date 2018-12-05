import { Component, Output, Input } from 'rete';
import { numSocket, fileSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class ModuleComponent extends Component {

  constructor() {
    super('Number');
  }

  builder(node) {
    const in1 = new Input('file', 'File', fileSocket);
    const out1 = new Output('num', 'Number', numSocket);

    return node.addInput(in1).addControl(new NumControl(this.editor, 'num')).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs[0] = node.data.num;
  }
}
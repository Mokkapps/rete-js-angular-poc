import { Component, Output, Input } from 'rete';
import { fileSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class FileComponent extends Component {

  constructor() {
    super('File');
  }

  builder(node) {
    const out1 = new Output('file', 'File', fileSocket);

    return node.addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs[0] = node.data.num;
  }
}
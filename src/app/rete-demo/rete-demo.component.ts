import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NodeEditor, Engine } from 'rete';
import * as ConnectionPlugin from 'rete-connection-plugin';
import * as VueRenderPlugin from 'rete-vue-render-plugin';

import { NumComponent } from './components/number-component';
import { AddComponent } from './components/add-component';
import { ModuleComponent } from './components/module-component';
import { FileComponent } from './components/file-component';

@Component({
  selector: 'app-rete-demo',
  templateUrl: './rete-demo.component.html',
  styleUrls: ['./rete-demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReteDemoComponent implements AfterViewInit {
  @ViewChild('nodeEditor')
  el: ElementRef;

  editor = null;

  constructor() {}

  async ngAfterViewInit() {
    const self = this;

    const container = this.el.nativeElement;

    const components = [new NumComponent(), new AddComponent(), new ModuleComponent(), new FileComponent()];

    const editor = new NodeEditor('demo@0.2.0', container);
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);

    const engine = new Engine('demo@0.2.0');

    components.map(c => {
      editor.register(c);
      engine.register(c);
    });

    const n1 = await components[0].createNode({ num: 2 });
    const n2 = await components[0].createNode({ num: 0 });
    const add = await components[1].createNode();
    const module = await components[2].createNode();
    const file = await components[3].createNode();

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [500, 240];

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);
    editor.addNode(module);
    editor.addNode(file);

    editor.connect(
      n1.outputs.get('num'),
      add.inputs.get('num1')
    );
    editor.connect(
      n2.outputs.get('num'),
      add.inputs.get('num2')
    );

    editor.on(
      'process nodecreated noderemoved connectioncreated connectionremoved',
      async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
        console.log('New Editor state', editor.toJSON());
      }
    );

    editor.view.resize();
    editor.trigger('process');
  }
}

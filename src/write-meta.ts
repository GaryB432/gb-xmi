import * as fs from 'fs';
import * as path from 'path';
import * as builder from 'xmlbuilder';

import { Document } from './document';
import { XmiClass } from './elements/class';
import { XmiClassifier } from './elements/classifier';
import { XmiComponent } from './elements/component';

async function main() {
  const doc = new Document('Fun Document');
  const componentPackage = doc.addPackage('Components');
  const classifierPackage = doc.addPackage('Classifiers');

  const kvp: Map<string, XmiClassifier> = new Map();

  const info = {
    classifiers: [
      {
        generals: ['Classifier'],
        name: 'Class',
        isAbstract: true,
      },
      {
        generals: ['NamedElement'],
        name: 'Classifier',
        isAbstract: true,
      },
      {
        generals: ['Class'],
        name: 'Component',
      },
      {
        generals: ['NamedElement'],
        name: 'Dependency',
      },
      {
        generals: ['NamedElement'],
        name: 'Feature',
        isAbstract: true,
      },
      {
        generals: ['Classifier'],
        name: 'Interface',
      },
      {
        generals: [],
        name: 'NamedElement',
        isAbstract: true,
      },
      {
        generals: ['Feature'],
        name: 'Operation',
      },
      {
        generals: ['NamedElement'],
        name: 'Package',
      },
      {
        generals: ['NamedElement'],
        name: 'Parameter',
      },
      {
        generals: ['Feature'],
        name: 'Property',
      },
      {
        generals: ['Dependency'],
        name: 'Usage',
      },
    ],
  };

  info.classifiers
    .map(t => ({
      comp: new XmiComponent(t.name),
      fier: new XmiClass(t.name, t.isAbstract),
    }))
    .forEach(c => {
      kvp.set(c.comp.name, c.fier);
      classifierPackage.addClassifier(c.fier);
      componentPackage.addComponent(c.comp);
    });

  info.classifiers.forEach(c => {
    c.generals.forEach(g => {
      kvp.get(c.name)!.generals.push(kvp.get(g)!);
    });
  });

  await doc.writeFile(path.resolve(__dirname, '..', '__tests__', 'meta.xmi'));
}
main();

// PS: C:\gb-xmi>node node_modules/typescript/bin/tsc;node .\lib\write-meta.js;cat .\__tests__\meta.xmi

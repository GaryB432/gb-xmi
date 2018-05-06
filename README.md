# gb-xmi

[![Build Status](https://travis-ci.org/GaryB432/gb-xmi.svg?branch=master)](https://travis-ci.org/GaryB432/gb-xmi)
[![npm version](https://badge.fury.io/js/gb-xmi.svg)](https://badge.fury.io/js/gb-xmi)

This library is for generating [XML METADATA INTERCHANGE document](https://www.omg.org/spec/XMI/About-XMI/)s from javascript.

##  Installing

> npm install gb-xmi --save

## Using

```ts
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
      },
      {
        generals: ['NamedElement'],
        name: 'Classifier',
      },
      {
        generals: ['Class'],
        name: 'Component',
      },
    ],
  };

  info.classifiers
    .map(t => ({ comp: new XmiComponent(t.name), fier: new XmiClass(t.name) }))
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

  await doc.writeFile('meta.xmi');
}
main();

// PS: C:\gb-xmi>node node_modules/typescript/bin/tsc;node .\lib\write-meta.js;cat .\__tests__\meta.xmi
```

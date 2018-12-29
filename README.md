# gb-xmi

[![Build Status](https://travis-ci.org/GaryB432/gb-xmi.svg?branch=master)](https://travis-ci.org/GaryB432/gb-xmi)
[![npm version](https://badge.fury.io/js/gb-xmi.svg)](https://badge.fury.io/js/gb-xmi)

This library is for generating [XML METADATA INTERCHANGE document](https://www.omg.org/spec/XMI/About-XMI/)s from javascript.

##  Installing

> npm install gb-xmi --save

## Using

```ts

import { Document, XmiClassifier, XmiComponent, XmiClass } from 'gb-xmi';

async function main(): Promise<string> {
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

  return await doc.end();
}

console.log(await main());

```

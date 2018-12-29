import { XmiPackage } from '../src/elements/package';


import { Document } from '../src/document';
import { XmiClass } from '../src/elements/class';
import { XmiClassifier } from '../src/elements/classifier';
import { XmiComponent } from '../src/elements/component';

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

  return  await doc.end();
}

it('Should get xmiType', () => {
  var sut = new XmiPackage('subject');
  expect(sut.name).toBe('subject');
  // expect(sut.xmiType).toBe('xmi:class');
});

it('Should not blow', async () => {
  const actual = await main();
  expect(actual).toContain('packagedElement');
})

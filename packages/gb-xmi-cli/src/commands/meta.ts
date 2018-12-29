import { Command, flags } from '@oclif/command';

import { Document, XmiClass, XmiClassifier, XmiComponent } from 'gb-xmi';

async function main(): Promise<string> {
  const doc = new Document('Fun Document');
  const componentPackage = doc.addPackage('Components');
  const classifierPackage = doc.addPackage('Classifiers');

  const kvp: Map<string, XmiClassifier> = new Map();

  const info = {
    classifiers: [
      {
        generals: ['Classifier'],
        isAbstract: true,
        name: 'Class',
      },
      {
        generals: ['NamedElement'],
        isAbstract: true,
        name: 'Classifier',
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
        isAbstract: true,
        name: 'Feature',
      },
      {
        generals: ['Classifier'],
        name: 'Interface',
      },
      {
        generals: [],
        isAbstract: true,
        name: 'NamedElement',
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

  return doc.end();
}

export default class Meta extends Command {
  public static description = 'describe the command here';

  public static flags = {
    force: flags.boolean({ char: 'f' }),
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n', description: 'name to print' }),
  };

  public static args = [{ name: 'file' }];

  public async run() {
    this.parse(Meta);

    this.log(await main());
  }
}

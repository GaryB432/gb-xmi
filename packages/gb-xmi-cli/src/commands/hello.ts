import { Command, flags } from '@oclif/command';

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

export default class Hello extends Command {
  public static description = 'describe the command here';

  public static examples = [
    `$ gb-xmi-cli hello
hello world from ./src/hello.ts!
`,
  ];

  public static flags = {
    force: flags.boolean({ char: 'f' }),
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n', description: 'name to print' }),
  };

  public static args = [{ name: 'file' }];

  public async run() {
    const { args, flags: flagz } = this.parse(Hello);

    const xx = await main();

    console.log(xx);

    const name = flagz.name || 'world';
    this.log(`hello ${name} from .\\src\\commands\\hello.ts`);
    if (args.file && flagz.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}

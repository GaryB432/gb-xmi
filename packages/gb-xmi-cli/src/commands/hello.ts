import { Command, flags } from '@oclif/command';

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

    const name = flagz.name || 'world';
    this.log(`hello ${name} from .\\src\\commands\\hello.ts`);
    if (args.file && flagz.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}

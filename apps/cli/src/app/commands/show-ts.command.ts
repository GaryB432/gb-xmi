/* This is a generated file. Make changes to cli.config.json and run "nx sync cli" */
/* NO IT IS NOT */

import type {
  IClass,
  IModel,
  IOperation,
  IParamter,
  IProperty
} from '@gb-xmi/xmi';
import * as chalk from 'chalk';
import * as ts from 'typescript';
import { CommandArgs } from './show-ts.types';

class TestCompilerHost implements ts.CompilerHost {
  constructor(private readonly code: string) {}
  fileExists = () => true;
  getCanonicalFileName = () => 'tbd.ts';
  getCurrentDirectory = () => '';
  getDefaultLibFileName = () => 'lib.d.ts';
  getDirectories = () => [];
  getNewLine = () => '\n';
  readFile = () => null;
  useCaseSensitiveFileNames = () => true;
  writeFile = () => {};
  getSourceFile(filename: string): ts.SourceFile {
    return ts.createSourceFile(filename, this.code, ts.ScriptTarget.ES5, true);
  }
}

const model: IModel = {
  packages: { main: { classes: {} } },
};

function kindToString(kind: ts.SyntaxKind): string {
  // return ts.SyntaxKind[kind];
  switch (kind) {
    case ts.SyntaxKind.NumberKeyword: {
      return 'number';
    }
    case ts.SyntaxKind.VoidKeyword: {
      return 'void';
    }
  }
  return 'unknown';
}

export async function showTsCommand({
  file,
  opts,
}: CommandArgs): Promise<void> {
  // const filename= file;
  if (opts.verbose) {
    console.log({ outname: file, opts });
  }
  if (opts.dryRun) {
    console.log(chalk.yellowBright('Dry Run. Nothing written.'));
  } else {
    // const content = ts.sys.readFile(file);
    const content = `export class Cat {
      whiskers: number = 0;
      private color: string | undefined;
      meow(duration: number, volume: number): void {
        console.log('tbd');
      }
    }
    `;
    if (!content) {
      console.log(file);
      throw new Error('file not found');
    }

    const config: ts.CompilerOptions = {
      noResolve: true,
      target: ts.ScriptTarget.ES5,
    };
    // const sourceText = `interface X { x: string }`;
    const program = ts.createProgram(
      [file],
      config,
      new TestCompilerHost(content)
    );
    const ast = program.getSourceFile(file);

    // const classes: ts.ClassDeclaration[] = [];

    for (const cn of ast.getChildAt(0).getChildren()) {
      if (ts.isClassDeclaration(cn)) {
        const classDefinition: IClass = {
          ownedOperation: {},
          attribute: {},
          isAbstract: false,
          visibility: 'public',
        };
        const className = cn.name.escapedText as string;
        console.log(className);
        for (const mem of cn.members) {
          const memberName = mem.name as ts.Identifier;
          switch (mem.kind) {
            case ts.SyntaxKind.PropertyDeclaration: {
              const member = mem as ts.PropertyDeclaration;
              const prop: IProperty = {
                isReadOnly: false,
                visibility: 'public',
                multi: false,
                isStatic: false,
                typeName: kindToString(member.type.kind),
              };
              classDefinition.attribute[memberName.escapedText as string] =
                prop;
              if (opts.verbose) {
                console.log(
                  chalk.yellow('prop'),
                  memberName.escapedText,
                  prop.typeName
                );
              }
              break;
            }
            case ts.SyntaxKind.MethodDeclaration: {
              const member = mem as ts.MethodDeclaration;
              const parameters: Record<string, IParamter> = {};
              for (const mf of member.parameters) {
                const pn = mf.name as ts.Identifier;
                parameters[pn.escapedText as string] = {
                  direction: 'inout',
                  multi: false,
                  typeName: kindToString(mf.type.kind),
                };
              }
              const operation: IOperation = {
                isQuery: false,
                isAbstract: false,
                isReadOnly: false,
                parameters,
                visibility: 'public',
                isStatic: false,
                typeName: kindToString(member.type.kind),
              };
              classDefinition.ownedOperation[memberName.escapedText as string] =
                operation;
              if (opts.verbose) {
                console.log(
                  chalk.green('method'),
                  memberName.escapedText,
                  operation.typeName
                );
              }
              break;
            }
          }
        }
        model.packages.main.classes[className] = classDefinition;
      }
    }
    console.log(JSON.stringify(model, undefined, 2));
    console.log(chalk.bgGreenBright.whiteBright('showTsCommand works'));
  }
}

export class Cat {
  whiskers: number = 0;
  private color: string | undefined;
  meow(duration: number, volume: number): void {
    console.log('tbd');
  }
}

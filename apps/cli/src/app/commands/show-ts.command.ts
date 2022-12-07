/* This is a generated file. Make changes to cli.config.json and run "nx sync cli" */
/* NO IT IS NOT */

import { printMermaid } from '@gb-xmi/reporters';
import { classFromClassElement, IModel, IPackage } from '@gb-xmi/xmi';
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
  writeFile = () => {
    throw new Error('not implemented');
  };
  getSourceFile(filename: string): ts.SourceFile {
    return ts.createSourceFile(filename, this.code, ts.ScriptTarget.ES5, true);
  }
}

const model: IModel = {
  packages: { main: { classes: {} } },
};

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
    const content = ts.sys.readFile(file);
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
      // console.log(ts.SyntaxKind[cn.kind]);

      switch (cn.kind) {
        case ts.SyntaxKind.ClassDeclaration: {
          const d = cn as ts.ClassDeclaration;
          const className = d.name.escapedText as string;
          const classDefinition = classFromClassElement(d);
          model.packages.main.classes[className] = classDefinition;
          break;
        }
        case ts.SyntaxKind.ModuleDeclaration: {
          console.log('module def:');
          const md = cn as ts.ModuleDeclaration;
          if (ts.isIdentifier(md.name)) {
            console.log(md.name.escapedText);
            const p: IPackage = {
              classes: {},
            };
            md.body.forEachChild((d) => {
              if (ts.isClassDeclaration(d)) {
                // console.log(d.name.escapedText);
                const className = d.name.escapedText as string;
                const classDefinition = classFromClassElement(d);
                p.classes[className] = classDefinition;
              }
            });
            console.log(printMermaid(p).join('\n'));
          }
          break;
        }
        default: {
          console.log('tbd');
          break;
        }
      }
    }
    const mermaid = printMermaid(model.packages.main);
    console.log(mermaid.join('\n'));
  }
}

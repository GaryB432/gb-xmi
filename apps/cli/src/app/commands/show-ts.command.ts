/* This is a generated file. Make changes to cli.config.json and run "nx sync cli" */
/* NO IT IS NOT */

import {
  classFromClassElement,
  classFromInterface,
  // IPackage,
} from '@gb-xmi/xmi';
import * as ts from 'typescript';
import { GbCompilerHost } from '../shared';
import { XmiModel, XmiPackage } from '../XmiModel';
import { CommandArgs } from './show-ts.types';

export async function showTsCommand({
  file,
  opts,
}: CommandArgs): Promise<void> {
  if (opts.verbose) {
    console.log({ outname: file, opts });
  }
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
  const program = ts.createProgram([file], config, new GbCompilerHost(content));
  const ast = program.getSourceFile(file);

  const rootPack = new XmiPackage('.');
  const model = new XmiModel('.');
  model.add(rootPack, '.');

  for (const cn of ast.getChildAt(0).getChildren()) {
    switch (cn.kind) {
      case ts.SyntaxKind.InterfaceDeclaration: {
        const d = cn as ts.InterfaceDeclaration;
        rootPack.add(classFromInterface(d), d.name.escapedText as string);
        break;
      }
      case ts.SyntaxKind.ClassDeclaration: {
        const d = cn as ts.ClassDeclaration;
        rootPack.add(classFromClassElement(d), d.name.escapedText as string);
        break;
      }
      case ts.SyntaxKind.ModuleDeclaration: {
        // const xm = new XmiModel('s')
        const md = cn as ts.ModuleDeclaration;
        if (ts.isIdentifier(md.name)) {
          console.log(`## ${md.name.escapedText}`);
          const p = new XmiPackage(md.name.escapedText as string);
          md.body.forEachChild((d) => {
            if (ts.isClassDeclaration(d)) {
              p.add(classFromClassElement(d), d.name.escapedText as string);
            }
          });
          model.add(p, 'xis some name that is here');
          // console.log(mermaidMarkdown(p));
        }
        break;  
      }
      default: {
        console.log(ts.SyntaxKind[cn.kind], 'ignored');
        break;
      }
    }
  }
  // console.log(mermaidMarkdown(rootPack));
  console.log(model.mermaidMarkdown())
  // console.log(JSON.stringify(model, undefined, 2));
}

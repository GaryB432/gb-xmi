/* This is a generated file. Make changes to cli.config.json and run "nx sync cli" */
/* NO IT IS NOT */

import { classFromClassElement, classFromInterface } from '@gb-xmi/xmi';
import * as ts from 'typescript';
import { CompilerHost } from '../CompilerHost';
import { XmiModel, XmiPackage } from '../XmiModel';
import type { CommandArgs } from './show-ts.types';

const model = new XmiModel();
const rootPack = new XmiPackage();

function digestNodeIntoPackage(cn: ts.Node, pack: XmiPackage) {
  switch (cn.kind) {
    case ts.SyntaxKind.InterfaceDeclaration: {
      const d = cn as ts.InterfaceDeclaration;
      pack.add(classFromInterface(d), d.name.escapedText as string);
      break;
    }
    case ts.SyntaxKind.ClassDeclaration: {
      const d = cn as ts.ClassDeclaration;
      pack.add(classFromClassElement(d), d.name.escapedText as string);
      break;
    }
    case ts.SyntaxKind.ModuleDeclaration: {
      const md = cn as ts.ModuleDeclaration;
      if (ts.isIdentifier(md.name)) {
        const p = new XmiPackage();
        md.body.forEachChild((d) => {
          digestNodeIntoPackage(d, p);
        });
        model.add(p, md.name.escapedText as string);
      }
      break;
    }
    default: {
      console.log(ts.SyntaxKind[cn.kind], 'ignored');
      break;
    }
  }
}

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

  const program = ts.createProgram(
    [file],
    {
      noResolve: true,
      target: ts.ScriptTarget.ES5,
    },
    new CompilerHost(content)
  );
  const ast = program.getSourceFile(file);

  for (const cn of ast.getChildAt(0).getChildren()) {
    digestNodeIntoPackage(cn, rootPack);
  }
  model.add(rootPack, '.');
  console.log(model.mermaidMarkdown());
}

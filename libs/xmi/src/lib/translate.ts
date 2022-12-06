import * as ts from 'typescript';
import { IOperation, IParamter, IProperty } from './models';

export function kindToString(kind: ts.SyntaxKind): string {
  // return ts.SyntaxKind[kind];
  switch (kind) {
    case ts.SyntaxKind.NumberKeyword: {
      return 'number';
    }
    case ts.SyntaxKind.VoidKeyword: {
      return 'void';
    }
    case ts.SyntaxKind.StringKeyword: {
      return 'string';
    }
    case ts.SyntaxKind.UnionType: {
      return 'any';
    }
  }
  console.log('hmm 2345p', ts.SyntaxKind[kind]);
  return 'unknown';
}

export function opFromElement(mem: ts.ClassElement): IOperation {
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
  return operation;
}

export function propFromElement(mem: ts.ClassElement): IProperty {
  const member = mem as ts.PropertyDeclaration;
  const prop: IProperty = {
    isReadOnly: false,
    visibility: 'public',
    multi: false,
    isStatic: false,
    typeName: kindToString(member.type.kind),
  };
  return prop;
}

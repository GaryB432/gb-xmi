import * as ts from 'typescript';
import { IOperation, IParamter, IProperty, VisibilityKind } from './models';

const unknownType: ts.TypeNode = ts.factory.createKeywordTypeNode(
  ts.SyntaxKind.UnknownKeyword
);

export function typeNodeToString(node: ts.TypeNode): string {
  switch (node.kind) {
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
    case ts.SyntaxKind.TypeReference: {
      let n = 'unknown';
      node.forEachChild((c) => {
        if (ts.isIdentifier(c)) {
          n = c.escapedText as string;
        }
      });
      return n;
    }
    case ts.SyntaxKind.UnknownKeyword: {
      return 'unknown';
    }
  }
  console.log('unknown type for ', node);
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
      typeName: typeNodeToString(mf.type),
    };
  }
  const operation: IOperation = {
    isQuery: false,
    isAbstract: false,
    isReadOnly: false,
    parameters,
    visibility: 'public',
    isStatic: false,
    typeName: typeNodeToString(member.type),
  };
  return operation;
}

export function propFromElement(mem: ts.ClassElement): IProperty {
  const member = mem as ts.PropertyDeclaration;
  let visibility: VisibilityKind = 'public';
  if (member.modifiers) {
    for (const modf of member.modifiers) {
      if (modf.kind === ts.SyntaxKind.PrivateKeyword) {
        visibility = 'private';
      }
    }
  }
  const prop: IProperty = {
    isReadOnly: false,
    visibility,
    multi: false,
    isStatic: false,
    typeName: typeNodeToString(member.type ?? unknownType),
  };
  return prop;
}

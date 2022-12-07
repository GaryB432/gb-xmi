import * as ts from 'typescript';
import {
  IClass,
  IOperation,
  IParamter,
  IProperty,
  VisibilityKind,
} from './models';

const unknownType: ts.TypeNode = ts.factory.createKeywordTypeNode(
  ts.SyntaxKind.UnknownKeyword
);

export function initializerToTypeName(node: ts.Expression): string {
  switch (node.kind) {
    case ts.SyntaxKind.FirstLiteralToken:
    case ts.SyntaxKind.NumericLiteral: {
      return 'number';
    }
    case ts.SyntaxKind.StringLiteral: {
      return 'string';
    }
    case ts.SyntaxKind.ObjectLiteralExpression: {
      return 'object';
    }
    case ts.SyntaxKind.ArrowFunction: {
      return 'function';
    }
  }
  console.log('unknown initializer', ts.SyntaxKind[node.kind]);
  return 'unknown';
}

export function typeNodeToString(node: ts.TypeNode): string {
  if (!node) {
    throw new Error('node is required');
  }
  switch (node.kind) {
    case ts.SyntaxKind.BooleanKeyword: {
      return 'boolean';
    }
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
      node.forEachChild((c: ts.Identifier | ts.QualifiedName) => {
        switch (c.kind) {
          case ts.SyntaxKind.Identifier: {
            n = c.escapedText as string;
            break;
          }
          case ts.SyntaxKind.QualifiedName: {
            const ns = [];
            c.forEachChild((t: ts.Identifier) => {
              ns.push(t.escapedText);
            });
            n = ns.join('-');
            break;
          }
        }
      });
      return n;
    }
    case ts.SyntaxKind.UnknownKeyword: {
      return 'unknown';
    }
  }
  console.log('unknown type for', ts.SyntaxKind[node.kind]);
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
      typeName: typeNodeToString(mf.type ?? unknownType),
    };
  }
  const operation: IOperation = {
    isQuery: false,
    isAbstract: false,
    isReadOnly: false,
    parameters,
    visibility: 'public',
    isStatic: false,
    typeName: typeNodeToString(member.type ?? unknownType),
  };
  return operation;
}

export function propFromSignature(mem: ts.PropertySignature): IProperty {
  const prop: IProperty = {
    isReadOnly: false,
    visibility: 'public',
    multi: false,
    isStatic: false,
    typeName: typeNodeToString(mem.type ?? unknownType),
  };
  return prop;
}

export function propFromElement(mem: ts.ClassElement): IProperty {
  const member = mem as ts.PropertyDeclaration;
  let visibility: VisibilityKind = 'public';
  let typeName = typeNodeToString(member.type ?? unknownType);
  if (member.initializer) {
    typeName = initializerToTypeName(member.initializer);
  }
  if (member.modifiers) {
    for (const modf of member.modifiers) {
      switch (modf.kind) {
        case ts.SyntaxKind.PrivateKeyword: {
          visibility = 'private';
          break;
        }
        case ts.SyntaxKind.ProtectedKeyword: {
          visibility = 'package';
          break;
        }
      }
    }
  }
  const prop: IProperty = {
    isReadOnly: false,
    visibility,
    multi: false,
    isStatic: false,
    typeName,
  };
  return prop;
}

export function classFromInterface(classDec: ts.InterfaceDeclaration): IClass {
  const classDefinition: IClass = {
    annotation: ['interface'],
    ownedOperation: {},
    attribute: {},
    isAbstract: false,
    visibility: 'public',
  };

  classDec.forEachChild((c) => {
    switch (c.kind) {
      case ts.SyntaxKind.PropertySignature: {
        const ps = c as ts.PropertySignature;
        const pn = ps.name as ts.Identifier;
        classDefinition.attribute[pn.escapedText as string] =
          propFromSignature(ps);
      }
      case ts.SyntaxKind.Identifier: {
      }
    }
  });
  return classDefinition;
}

export function classFromClassElement(classDec: ts.ClassDeclaration): IClass {
  const classDefinition: IClass = {
    ownedOperation: {},
    attribute: {},
    isAbstract: false,
    visibility: 'public',
  };
  for (const mem of classDec.members) {
    const memberName = mem.name as ts.Identifier;
    switch (mem.kind) {
      case ts.SyntaxKind.PropertyDeclaration: {
        const prop: IProperty = propFromElement(mem);
        classDefinition.attribute[memberName.escapedText as string] = prop;
        break;
      }
      case ts.SyntaxKind.MethodDeclaration: {
        const operation: IOperation = opFromElement(mem);
        classDefinition.ownedOperation[memberName.escapedText as string] =
          operation;
        break;
      }
    }
  }
  return classDefinition;
}

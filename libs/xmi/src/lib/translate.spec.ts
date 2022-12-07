import * as ts from 'typescript';
import { factory } from 'typescript';
import { opFromElement, propFromElement, typeNodeToString } from './translate';

describe('Translate', () => {
  test('typeNodeToString', () => {
    expect(
      typeNodeToString(
        factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
      )
    ).toEqual('number');
    expect(
      typeNodeToString(
        factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
      )
    ).toEqual('unknown');
    expect(
      typeNodeToString(
        factory.createTypeReferenceNode(
          factory.createIdentifier('Stuff'),
          undefined
        )
      )
    ).toEqual('Stuff');
    expect(
      typeNodeToString(
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier('SampleModule'),
            factory.createIdentifier('Animal')
          ),
          undefined
        )
      )
    ).toEqual('SampleModule-Animal');
    // expect(typeNodeToString(undefined)).toEqual('unknown');
  });
  test('opFromElement', () => {
    expect(
      opFromElement(
        factory.createMethodDeclaration(
          undefined,
          undefined,
          factory.createIdentifier('meow'),
          undefined,
          undefined,
          [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              factory.createIdentifier('duration'),
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
              undefined
            ),
            factory.createParameterDeclaration(
              undefined,
              undefined,
              factory.createIdentifier('volume'),
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
              undefined
            ),
          ],
          factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
          factory.createBlock(
            [
              factory.createExpressionStatement(
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier('console'),
                    factory.createIdentifier('log')
                  ),
                  undefined,
                  [factory.createStringLiteral('tbd')]
                )
              ),
            ],
            true
          )
        )
      )
    ).toEqual({
      isAbstract: false,
      isQuery: false,
      isReadOnly: false,
      isStatic: false,
      parameters: {
        duration: {
          direction: 'inout',
          multi: false,
          typeName: 'number',
        },
        volume: {
          direction: 'inout',
          multi: false,
          typeName: 'number',
        },
      },
      typeName: 'void',
      visibility: 'public',
    });
  });
  test('propFromElement infer string', () => {
    expect(
      propFromElement(
        factory.createPropertyDeclaration(
          [factory.createModifier(ts.SyntaxKind.PrivateKeyword)],
          factory.createIdentifier('color'),
          undefined,
          factory.createUnionTypeNode([
            factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
          ]),
          factory.createStringLiteral('fun', true)
        )
      )
    ).toEqual({
      isReadOnly: false,
      isStatic: false,
      multi: false,
      typeName: 'string',
      visibility: 'private',
    });
  });
  test('propFromElement package', () => {
    expect(
      propFromElement(
        factory.createPropertyDeclaration(
          [factory.createModifier(ts.SyntaxKind.ProtectedKeyword)],
          factory.createIdentifier('color'),
          undefined,
          factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
          undefined
        )
      )
    ).toEqual({
      isReadOnly: false,
      isStatic: false,
      multi: false,
      typeName: 'string',
      visibility: 'package',
    });
  });
  test('propFromElement qname', () => {
    expect(
      propFromElement(
        factory.createPropertyDeclaration(
          undefined,
          factory.createIdentifier('color'),
          undefined,
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier('SampleModule'),
              factory.createIdentifier('Animal')
            ),
            undefined
          ),
          undefined
        )
      )
    ).toEqual({
      isReadOnly: false,
      isStatic: false,
      multi: false,
      typeName: 'SampleModule-Animal',
      visibility: 'public',
    });
  });
  test('propFromElement qname one', () => {
    expect(
      propFromElement(
        factory.createPropertyDeclaration(
          undefined,
          factory.createIdentifier('color'),
          undefined,
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier('SampleModule'),
              factory.createIdentifier('Animal')
            ),
            undefined
          ),
          undefined
        )
      )
    ).toEqual({
      isReadOnly: false,
      isStatic: false,
      multi: false,
      typeName: 'SampleModule-Animal',
      visibility: 'public',
    });
  });
});

import * as ts from 'typescript';
import { factory } from 'typescript';
import {
  add,
  greet,
  kindToString,
  meaning,
  opFromElement,
  propFromElement,
} from './translate';

describe('Translate', () => {
  test('adds', () => {
    expect(add(2, 3)).toEqual(5);
  });
  test('greets', () => {
    expect(greet('world')).toEqual('translate says: hello to world');
  });
  test('meaning', () => {
    expect(meaning.life).toEqual(42);
  });
  test('kindToString', () => {
    expect(kindToString(4)).toEqual('unknown');
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
  test('propFromElement', () => {
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
          undefined
        )
      )
    ).toEqual({
      isReadOnly: false,
      isStatic: false,
      multi: false,
      typeName: 'unknown',
      visibility: 'public',
    });
  });
});

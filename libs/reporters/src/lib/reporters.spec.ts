import { IPackage } from '@gb-xmi/xmi';
import { mermaidMarkdown } from './reporters';

const catPackage: IPackage = {
  classes: {
    Cat: {
      ownedOperation: {
        meow: {
          isQuery: false,
          isAbstract: false,
          isReadOnly: false,
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
          visibility: 'public',
          isStatic: false,
          typeName: 'void',
        },
      },
      attribute: {
        whiskers: {
          isReadOnly: false,
          visibility: 'public',
          multi: false,
          isStatic: false,
          typeName: 'number',
        },
        color: {
          isReadOnly: false,
          visibility: 'private',
          multi: false,
          isStatic: false,
          typeName: 'unknown',
        },
      },
      isAbstract: false,
      visibility: 'public',
    },
  },
};

describe('reporters', () => {
  test('printMermaid', () => {
    expect(mermaidMarkdown(catPackage).split('\n')).toEqual([
      '```mermaid',
      'classDiagram',
      'class Cat {',
      '  +number whiskers',
      '  -unknown color',
      '  +meow(duration,volume) void',
      '}',
      '```',
    ]);
  });
  test('printMermaid', () => {
    expect(
      mermaidMarkdown({
        classes: {
          Subject: {
            annotation: ['a', 'b'],
            ownedOperation: {},
            attribute: {
              asdf: {
                isReadOnly: false,
                visibility: 'public',
                multi: false,
                isStatic: false,
                typeName: 'number',
              },
            },
            isAbstract: false,
            visibility: 'public',
          },
        },
      }).split('\n')
    ).toEqual([
      '```mermaid',
      'classDiagram',
      'class Subject {',
      '  <<a>>',
      '  <<b>>',
      '  +number asdf',
      '}',
      '```',
    ]);
  });
});

import { IPackage } from '@gb-xmi/xmi';
import { printMermaid, reporters } from './reporters';

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
          visibility: 'public',
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
  it('should work', () => {
    expect(reporters()).toEqual('reporters');
  });
  test('get mermai', () => {
    expect(printMermaid(catPackage)).toEqual([
      'classDiagram',
      'class Cat {',
      '    +number whiskers',
      '    +unknown color',
      '    +meow(duration,volume) void',
      '}',
    ]);
  });
});
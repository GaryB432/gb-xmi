import { IModel } from '../src/lib/models';
import { ModelReader } from '../src/lib/modelReader';

// import { Model } from "gb-uml";

const model: IModel = {
  packages: {
    Stuff: {
      classes: {
        Person: {
          attribute: {
            name: {
              typeName: 'string',
              isReadOnly: false,
              isStatic: false,
              multi: false,
              visibility: 'public',
            },
            home: {
              typeName: 'Address',
              isReadOnly: false,
              isStatic: false,
              multi: false,
              visibility: 'public',
            },
            business: {
              typeName: 'Address',
              isReadOnly: false,
              isStatic: false,
              multi: false,
              visibility: 'public',
            },
          },
          ownedOperation: {
            move: {
              typeName: 'void',
              isQuery: true,
              isAbstract: false,
              isStatic: false,
              parameters: {
                newAddress: {
                  typeName: 'Address',
                  multi: false,
                  direction: 'inout',
                },
                validated: {
                  typeName: 'boolean',
                  multi: false,
                  direction: 'inout',
                },
              },
              isReadOnly: false,
              visibility: 'public',
            },
          },
          isAbstract: false,
          visibility: 'public',
        },
        Address: {
          attribute: {
            street: {
              typeName: 'string',
              isReadOnly: false,
              isStatic: false,
              multi: true,
              visibility: 'public',
            },
            city: {
              typeName: 'string',
              isReadOnly: false,
              isStatic: false,
              multi: false,
              visibility: 'public',
            },
            state: {
              typeName: 'string',
              isReadOnly: false,
              isStatic: false,
              multi: false,
              visibility: 'public',
            },
            zip: {
              typeName: 'string',
              isReadOnly: false,
              isStatic: false,
              multi: false,
              visibility: 'public',
            },
          },
          ownedOperation: {},
          isAbstract: false,
          visibility: 'public',
        },
      },
    },
  },
};

class TestModelReader extends ModelReader {}

describe('XMI Writer', () => {
  let sut: ModelReader;

  beforeEach(() => {
    sut = new TestModelReader();
  });

  it('should render new package', () => {
    const actual = sut.read('sut', model);
    console.log(actual);
    expect(1 + 2).toEqual(3);
  });
});

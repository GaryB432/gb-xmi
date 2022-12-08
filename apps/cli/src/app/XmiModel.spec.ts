import { IClass, IOperation, IPackage, IProperty } from '@gb-xmi/xmi';
import { XmiModel } from './XmiModel';
// import { XmiModel, XmiPackage } from './XmiModel';

class StubFactory {
  createOperation(params: 0): IOperation {
    return {
      isQuery: false,
      isAbstract: false,
      isReadOnly: false,
      parameters: {},
      visibility: 'package',
      isStatic: false,
      typeName: 'void',
    };
  }
  createProperty(): IProperty {
    return {
      isReadOnly: false,
      isStatic: false,
      multi: false,
      typeName: 'boolean',
      visibility: 'package',
    };
  }
  createClass(props: number, ops: number): IClass {
    const ownedOperation = {};
    const attribute = {};
    for (let i = 0; i < props; i++) {
      ownedOperation[`op${i}`] = this.createOperation(0);
    }
    for (let i = 0; i < ops; i++) {
      attribute[`f${i}`] = this.createProperty();
    }
    return {
      ownedOperation,
      attribute,
      isAbstract: false,
      visibility: 'package',
    };
  }
  createPackage(numClasses: number): IPackage {
    const classes = {};
    for (let i = 0; i < numClasses; i++) {
      classes[`Class${i}`] = this.createClass(1, 1);
    }
    return { classes };
  }
}

const factory = new StubFactory();

describe('XmiModel', () => {
  let xmiModel: XmiModel;
  beforeEach(() => {
    xmiModel = new XmiModel();
    xmiModel.add(factory.createPackage(1), 'P1');
    xmiModel.add(factory.createPackage(1), 'P2');
  });
  test('adds', () => {
    expect(xmiModel).toBeDefined();
  });
  test('printMermaid', () => {
    expect(xmiModel.mermaidMarkdown().split('\n')).toEqual([
      '## P1',
      '```mermaid',
      'classDiagram',
      'class Class0 {',
      '  ~boolean f0',
      '  ~op0() void',
      '}',
      '```',
      '',
      '## P2',
      '```mermaid',
      'classDiagram',
      'class Class0 {',
      '  ~boolean f0',
      '  ~op0() void',
      '}',
      '```',
    ]);
  });
});

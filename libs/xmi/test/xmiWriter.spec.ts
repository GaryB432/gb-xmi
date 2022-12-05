
import { IModel } from '../src/lib/models';
import { XmiWriter } from "../src/lib/XmiWriter";


const model: IModel = {
  packages: {
    "Stuff": {
      classes: {
        "Person": {
          attribute: {
            "name": { typeName: "string", isReadOnly: false, isStatic: false, multi: false, visibility: "public" },
            "home": { typeName: "Address", isReadOnly: false, isStatic: false, multi: false, visibility: "public" },
            "business": { typeName: "Address", isReadOnly: false, isStatic: false, multi: false, visibility: "public" },
          },
          ownedOperation: {
            "move": {
              typeName: "void", isQuery: true, isAbstract: false, isStatic: false,
              parameters: {
                "newAddress": { typeName: "Address", multi: false, direction: "inout" },
                "validated": { typeName: "boolean", multi: false, direction: "inout" },
              },
              isReadOnly: false,
              visibility: "public"
            },
          },
          isAbstract: false,
          visibility: "public",
        },
        "Address": {
          attribute: {
            "street": { typeName: "string", isReadOnly: false, isStatic: false, multi: true, visibility: "public" },
            "city": { typeName: "string", isReadOnly: false, isStatic: false, multi: false, visibility: "public" },
            "state": { typeName: "string", isReadOnly: false, isStatic: false, multi: false, visibility: "public" },
            "zip": { typeName: "string", isReadOnly: false, isStatic: false, multi: false, visibility: "public" },
          },
          ownedOperation: {},
          isAbstract: false,
          visibility: "public",
        },
      },
    },
  }
};

describe("XMI Writer", () => {
  let sut: XmiWriter;

  beforeEach(() => {
    sut = new XmiWriter();
  });

  it("should render new package", () => {
    expect(sut.render())
      .toEqual(`<?xml version="1.0"?><xmi:XMI xmlns:uml="http://www.omg.org/spec/UML/20110701" xmlns:xmi="http://www.omg.org/spec/XMI/20110701" xmlns:mofext="http://www.omg.org/spec/MOF/20110701"><xmi:Documentation exporter="gb-xmi" exporterVersion="1.0"/></xmi:XMI>`);
  });

  it("should render model", () => {
    expect(sut.addModel("asdf", { packages: {} })).toEqual(0);
    expect(sut.render()).not.toContain("uml:Package");
  });

  it("should render model with packages", () => {
    expect(sut.addModel("asdf", model)).toEqual(1);
    expect(sut.render()).toContain("uml:Model");
  });

});

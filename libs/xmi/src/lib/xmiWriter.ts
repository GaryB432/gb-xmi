import { IClass, IModel, IOperation, IPackage, IParamter, IProperty } from "./models";

import * as builder from "xmlbuilder";

interface IAttributeMap {
  [name: string]: any;
}

interface IBuilderObj {
  att(name: string, value?: any): IBuilderObj;
  ele(name: string, attributes?: IAttributeMap, text?: any): IBuilderObj;
  end(options?: any): string;
}

class TypeSpace {
  constructor(private model: IModel) {

  }
  registerName(name: string, internal: boolean) {

  }
}

interface IModelDigester {
  digestModel(modelName: string): void;
  digestPackage(packageName: string, pkg: IPackage): void;
}

export class XmiWriter {

  private static mergeAttributes(a: IAttributeMap, b: IAttributeMap): IAttributeMap {
    for (let xb in b) {
      if (b.hasOwnProperty(xb)) {
        a[xb] = b[xb];
      }
    }
    return a;
  }

  private idCounter: number = 0;

  private root: IBuilderObj;

  constructor() {
    this.root = builder.create("xmi:XMI");
    /*
    <uml:Package xmi:type="uml:Package" xmi:id="_0" name="UML" URI="http://www.omg.org/spec/UML/20110701">
    
    <packageImport xmi:type="uml:PackageImport" xmi:id="_packageImport.0">
    <importedPackage href="http://www.omg.org/spec/UML/20110701/PrimitiveTypes.xmi#_0"/>
    </packageImport>
    */

    this.root.att("xmlns:uml", "http://www.omg.org/spec/UML/20110701");
    this.root.att("xmlns:xmi", "http://www.omg.org/spec/XMI/20110701");
    this.root.att("xmlns:mofext", "http://www.omg.org/spec/MOF/20110701");

    this.root.ele("xmi:Documentation", { exporter: "gb-xmi", exporterVersion: "1.0" });
  }

  public addModel(name: string, model: IModel): number {
    let count = 0;

    const mel = this.root.ele("uml:Model", {
      "name": name,
      "visibility": "public",
      "xmi:type": "uml:Model",
    });

    const ts = new TypeSpace(model);

    this.digestModel(name, model);

    for (let packName in model.packages) {
      if (model.packages.hasOwnProperty(packName)) {
        const pkg = model.packages[packName];
        const pel = mel.ele("packagedElement", this.getPackageAttributes(packName, pkg));
        for (let className in pkg.classes) {
          if (pkg.classes.hasOwnProperty(className)) {
            const cls = pkg.classes[className];
            const cel = pel.ele("packagedElement", this.getClassAttributes(className, cls));

            for (let attName in cls.attribute) {
              if (cls.attribute.hasOwnProperty(attName)) {
                const prop = cls.attribute[attName];
                const prel = cel.ele("ownedElement", this.getPropertyAttributes(attName, prop));
              }
            }

            for (let attName in cls.ownedOperation) {
              if (cls.ownedOperation.hasOwnProperty(attName)) {
                const op = cls.ownedOperation[attName];
                const opel = cel.ele("ownedOperation", this.getOperationAttributes(attName, op));

                for (let paramName in op.parameters) {
                  if (op.parameters.hasOwnProperty(paramName)) {
                    const param = op.parameters[paramName];
                    const propel = opel.ele("ownedParameter", this.getParameterAttributes(paramName, param));
                  }
                }
              }
            }
          }
        }
        count++;
      }
    }
    console.log(this.root.end({ pretty: true }));
    return count;
  }

  public render(options?: any): string {
    return this.root.end(options);
  }

  private digestModel(name: string, model: IModel): void {

    // // interface INameTable {
    // //   elementName: string;
    // //   typeName: string;
    // //   id?: string;
    // // }

    // // const names: INameTable[] = [{ elementName: `model:${name}`, typeName: undefined }];

    // interface TypeNameInfo {
    //   internal: boolean;
    // }

    // interface ISdk { [typeName: string]: TypeNameInfo };


    // for (let packName in model.packages) {
    //   const namess: ISdk = {};
    //   if (model.packages.hasOwnProperty(packName)) {
    //     const pkg = model.packages[packName];
    //     // names.push({ elementName: `package:${packName}`, typeName: undefined });
    //     for (let className in pkg.classes) {
    //       if (pkg.classes.hasOwnProperty(className)) {
    //         const cls = pkg.classes[className];
    //         namess[className] = { internal: true };
    //         // names.push({ elementName: className, typeName: className });
    //         // const xmiAttributes = this.getClassAttributes(className, cls);

    //         for (let attName in cls.attribute) {
    //           if (cls.attribute.hasOwnProperty(attName)) {
    //             const prop = cls.attribute[attName];
    //             if (!namess[prop.typeName]) {
    //               namess[prop.typeName] = { internal: true };
    //             }
    //             // names.push({ elementName: attName, typeName: prop.typeName });
    //           }
    //         }

    //         for (let attName in cls.ownedOperation) {
    //           if (cls.ownedOperation.hasOwnProperty(attName)) {
    //             const op = cls.ownedOperation[attName];
    //             names.push({ elementName: attName, typeName: op.typeName });

    //             for (let paramName in op.parameters) {
    //               if (op.parameters.hasOwnProperty(paramName)) {
    //                 const param = op.parameters[paramName];
    //                 names.push({ elementName: paramName, typeName: param.typeName });
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // // names.forEach((n, i) => n.id = `_gb-xmi.${i}`);
    // // console.log(names);
  }

  private getParameterAttributes(name: string, arg: IParamter): IAttributeMap {
    return this.addId({
      name,
      direction: arg.direction,
      type: this.typeIdForTypeName(arg.typeName),
    });
  }

  private getOperationAttributes(name: string, arg: IOperation): IAttributeMap {
    return this.addId({
      "xmi:type": "uml:Operation",
      "name": name,
      "visibility": arg.visibility,
      "isStatic": arg.isStatic,
      "isReadOnly": arg.isReadOnly,
      "type": this.typeIdForTypeName(arg.typeName),
    });
  }

  private getPropertyAttributes(name: string, arg: IProperty): IAttributeMap {
    return this.addId({
      "xmi:type": "uml:Property",
      "name": name,
      "visibility": arg.visibility,
      "isStatic": arg.isStatic,
      "isReadOnly": arg.isReadOnly,
      "type": this.typeIdForTypeName(arg.typeName),
    });
  }

  private getClassAttributes(name: string, arg: IClass): IAttributeMap {
    return this.addId({
      "name": name,
      "visibility": arg.visibility,
      "isAbtract": arg.isAbstract,
      "xmi:type": "uml:Class",
    });
  }

  private getPackageAttributes(name: string, arg: IPackage): IAttributeMap {
    return this.addId({
      "name": name,
      "visibility": "public",
      "xmi:type": "uml:Package",
    });
  }

  private typeIdForTypeName(name: string): string {
    console.log(name);
    return `___________________${name}_id`;
  }

  private addId(atts: IAttributeMap): IAttributeMap {
    return XmiWriter.mergeAttributes(atts, { "xmi:id": `_gb-xmi.${this.idCounter++}` });
  }

  // public renderParameter(parameter: IParamter): string {
  //   return "";
  // }

}

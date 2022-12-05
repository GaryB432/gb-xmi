import {
  Classifier,
  VisibilityKind,
  ParameterDirectionKind,
} from '@gb-xmi/uml';
import { IModel, IClass, IOperation, IProperty, IPackage } from './models';

// import { Class, DataType, Model, Operation, Parameter, Property, Package } from "./uml/elements";

class DataType {
  name: string;
  visibility: VisibilityKind;
}

class Class extends Classifier {
  name: string;
  isAbstract: boolean;
  visibility: VisibilityKind;
  attribute: any[];
  ownedOperation: any[];
}

class Operation {
  isStatic: boolean;
  name: string;
  visibility: string;
  type: DataType[];
  ownedParameter: any;
}

class Property {
  name: string;
  isDerived: boolean;
  isDerivedUnion: boolean;
  isStatic: boolean;
  isReadOnly: boolean;
  isUnique: boolean;
  visibility: VisibilityKind;
  type: DataType[];
}

class Parameter {
  type: DataType[];
  name: string;
  direction: ParameterDirectionKind;
  isException: boolean;
  isOrdered: boolean;
  isStream: boolean;
  isUnique: boolean;
}

class Package {
  name: string;
  ownedElement: any[];
}

class Model {
  name: string;
  ownedElement: any[];
}

// abstract class AllProps {
// 	direction: ParameterDirectionKind;
// 	isAbstract: boolean;
// 	isDerived: boolean;
// 	isDerivedUnion: boolean;
// 	isException: boolean;
// 	isOrdered: boolean;
// 	isReadOnly: boolean;
// 	isStatic: boolean;
// 	isStream: boolean;
// 	isUnique: boolean;
// 	name: string;
// 	type: XMIDataType;
// 	visibility: VisibilityKind;
// 	xmiId: any;
// 	xmiIype: any;
// }

// abstract class XMINamedElement {

// }
// abstract class XMIFeature {
// 	private isReadOnly: any;
// 	private isStatic: any;
// 	private name: any;
// 	private type: any;
// 	private visibility: any;
// 	private xmiId: any;
// 	private xmiType: any;
// }
// class XMIParameter {
// 	private direction: any;
// 	private isException: any;
// 	private isOrdered: any;
// 	private isStream: any;
// 	private isUnique: any;
// 	private name: any;
// 	private type: any;
// 	private xmiId: any;
// }
// class XMIModel extends XMINamedElement {
// 	private name: any;
// 	private visibility: any;
// 	private xmiId: any;
// 	private xmiType: any;
// }
// class XMIPackage {
// 	private name: any;
// 	private visibility: any;
// 	private xmiId: any;
// }
// class XMIClass {
// 	private isAbstract: any;
// 	private name: any;
// 	private visibility: any;
// 	private xmiId: any;
// 	private xmiType: any;
// }
// class XMIOperation extends XMIFeature {
// }
// class XMIProperty extends XMIFeature {
// 	private isDerived: any;
// 	private isDerivedUnion: any;
// 	private isOrdered: any;
// 	private isUnique: any;
// }
// class XMIDataType {
// 	private name: any;
// 	private visibility: any;
// 	private xmiId: any;
// 	private xmiType: any;
// }

export abstract class ModelReader {
  public read(name: string, model: IModel): Model {
    const umdl = new Model();
    umdl.name = name;
    umdl.ownedElement = [];
    for (let packName in model.packages) {
      if (model.packages.hasOwnProperty(packName)) {
        const pkg = model.packages[packName];
        const upkg = new Package();
        upkg.name = packName;
        upkg.ownedElement = [];

        for (let className in pkg.classes) {
          if (pkg.classes.hasOwnProperty(className)) {
            const cls = pkg.classes[className];
            const ucls = new Class();
            ucls.name = className;
            ucls.isAbstract = cls.isAbstract;
            ucls.visibility = 'Public';
            ucls.attribute = [];
            ucls.ownedOperation = [];

            for (let attName in cls.attribute) {
              if (cls.attribute.hasOwnProperty(attName)) {
                const prop = cls.attribute[attName];
                const udt = new DataType();
                udt.name = prop.typeName;
                const uprop = new Property();
                uprop.name = attName;
                uprop.isDerived = false;
                uprop.isDerivedUnion = false;
                uprop.isStatic = prop.isStatic;
                uprop.isReadOnly = prop.isReadOnly;
                uprop.isUnique = true;
                uprop.visibility = 'Public';
                uprop.type = [udt];
                ucls.attribute.push(uprop);
              }
            }

            for (let attName in cls.ownedOperation) {
              if (cls.ownedOperation.hasOwnProperty(attName)) {
                const op = cls.ownedOperation[attName];
                const udt = new DataType();
                udt.name = op.typeName;
                udt.visibility = 'Public';
                const uop = new Operation();
                // uop.isReadOnly = op.isReadOnly;
                uop.isStatic = op.isStatic;
                uop.name = attName;
                uop.visibility = 'Public';
                uop.type = [udt];

                for (let paramName in op.parameters) {
                  if (op.parameters.hasOwnProperty(paramName)) {
                    const param = op.parameters[paramName];
                    const uparam = new Parameter();
                    const udt = new DataType();
                    udt.name = param.typeName;
                    udt.visibility = 'Public';
                    uparam.type = [udt];
                    uparam.name = paramName;
                    uparam.direction = 'Inout';
                    uparam.isException = false;
                    uparam.isOrdered = false;
                    uparam.isStream = false;
                    uparam.isUnique = false;

                    uop.ownedParameter.push(uparam);
                  }
                }
                ucls.ownedOperation.push(uop);
              }
            }
            upkg.ownedElement.push(ucls);
          }
        }
        umdl.ownedElement.push(upkg);
      }
    }
    return umdl;
  }
}

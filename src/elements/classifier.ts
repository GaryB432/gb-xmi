import { AttrubuteMap } from '../utils';
import { XmiNamedElement } from './namedelement';
import { XmiOperation } from './operation';
import { XmiProperty } from './property';

export interface IClassifierAttributes {}

export abstract class XmiClassifier extends XmiNamedElement {
  public generals: XmiClassifier[] = [];
  public operations: XmiOperation[] = [];
  public properties: XmiProperty[] = [];
  public abstract xmiType(): string;
  public xmi(): AttrubuteMap {
    const atts: AttrubuteMap = {};
    atts['xmi:type'] = this.xmiType();
    atts['name'] = this.name;
    atts['xmi:id'] = this.xmiId;
    atts['visibility'] = 'package';
    return atts;
  }
  // public static primitiveTypeAttributes(tsTypeName: string): AttrubuteMap {
  //     let omgReferences = {
  //         "string": "http://www.omg.org/spec/UML/20110701/PrimitiveTypes.xmi#String",
  //         "number": "http://www.omg.org/spec/UML/20110701/PrimitiveTypes.xmi#Real",
  //         "boolean": "http://www.omg.org/spec/UML/20110701/PrimitiveTypes.xmi#Boolean"
  //     };
  //     return {
  //         "href": omgReferences[tsTypeName],
  //         "name": tsTypeName
  //     };
  // }
}

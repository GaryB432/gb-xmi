import { AttrubuteMap, BuilderElement, ClassifierMap } from '../utils';
import { XmiNamedElement } from './namedelement';

export interface IParameterAttributes {}
export class XmiParameter extends XmiNamedElement {
  constructor(public name: string, public typeName: string) {
    super(name);
  }
  public appendXmi(opElement: BuilderElement, classifiers: ClassifierMap): BuilderElement {
    const atts = this.xmi();

    const ctype = classifiers[this.typeName];

    atts['type'] = !!ctype ? ctype.xmiId : `TS_${this.typeName}`;

    const elem = opElement.ele('ownedParameter', atts);

    return elem;
  }
  public xmi(): AttrubuteMap {
    const atts: AttrubuteMap = {};
    atts['xmi:id'] = this.xmiId;
    atts['name'] = this.name;
    atts['direction'] = this.name === 'return' ? 'return' : 'inout';
    // atts["isStream"] = "false"
    // atts["isException"] = "false"
    // atts["isOrdered"] = "0"
    // atts["isUnique"] = "1"
    return atts;
  }
}

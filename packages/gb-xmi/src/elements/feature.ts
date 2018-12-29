import { AttrubuteMap, BuilderElement, ClassifierMap } from '../utils';
import { XmiNamedElement } from './namedelement';

export interface IFeatureAttributes {}
export abstract class XmiFeature extends XmiNamedElement {
  constructor(public name: string, public typeName: string) {
    super(name);
  }
  public abstract xmiType(): string;
  public abstract xmlNodeName(): string;
  public xmi(): AttrubuteMap {
    const atts: AttrubuteMap = {};
    /* <ownedAttribute
     */
    // atts["isDerived"] = "false";
    // atts["isOrdered"] = "false";
    // atts["isUnique"] = "true";
    // atts["isDerivedUnion"] = "false";

    atts['xmi:type'] = this.xmiType();
    atts['name'] = this.name;
    atts['xmi:id'] = this.xmiId;
    atts['isStatic'] = 'false';
    atts['isReadOnly'] = 'false';
    atts['visibility'] = 'package';
    return atts;
  }
  public appendXmi(classifierElement: BuilderElement, classifiers: ClassifierMap): BuilderElement {
    const atts = this.xmi();

    // if (this.typeName !== "void") {

    const ctype = classifiers[this.typeName];

    atts['type'] = !!ctype ? ctype.xmiId : `TS_${this.typeName}`;

    const elem = classifierElement.ele(this.xmlNodeName(), atts);
    // elem.ele("ownedParameter", {
    //     "xml:id": `${atts["xmi:id"]}_R`,
    //     "name": "return",
    //     "direction": "return",
    //     "type": ctype ? ctype.xmiId : `TS_${this.typeName}`
    // });

    return elem;
  }
}

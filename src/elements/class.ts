import { AttrubuteMap } from '../utils';
import { XmiClassifier } from './classifier';

export interface IClassAttributes {}

export class XmiClass extends XmiClassifier {
  public xmiType(): string {
    return 'uml:Class';
  }
  public xmi(): AttrubuteMap {
    const atts: AttrubuteMap = super.xmi();
    atts['isAbstract'] = 'false';
    return atts;
  }
}

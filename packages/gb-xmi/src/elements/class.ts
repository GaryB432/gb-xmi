import { AttrubuteMap } from '../utils';
import { XmiClassifier } from './classifier';

export interface IClassAttributes {}

export class XmiClass extends XmiClassifier {
  public xmiType(): string {
    return 'uml:Class';
  }
  constructor(name: string, public isAbstract = false) {
    super(name);
  }
  public xmi(): AttrubuteMap {
    return {
      ...super.xmi(),
      ...{ isAbstract: this.isAbstract.toString() },
    };
  }
}

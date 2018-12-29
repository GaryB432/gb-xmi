import { XmiClassifier } from './classifier';

export interface IInterfaceAttributes {}

export class XmiInterface extends XmiClassifier {
  public xmiType(): string {
    return 'uml:Interface';
  }
}

import { XmiFeature } from './feature';
import { XmiParameter } from './parameter';

export interface IOperationAttributes {}

export class XmiOperation extends XmiFeature {
  public parameters: XmiParameter[] = [];
  public xmiType(): string {
    return 'uml:Operation';
  }
  public xmlNodeName(): string {
    return 'ownedOperation';
  }
}

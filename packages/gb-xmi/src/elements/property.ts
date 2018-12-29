import { XmiFeature } from './feature';

export interface IPropertyAttributes {}
export class XmiProperty extends XmiFeature {
  public xmiType(): string {
    return 'uml:Property';
  }
  public xmlNodeName(): string {
    return 'ownedAttribute';
  }
}

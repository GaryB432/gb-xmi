import { AttrubuteMap } from '../utils';
import { XmiNamedElement } from './namedelement';
import { XmiOperation } from './operation';
import { XmiProperty } from './property';

export interface IDependencyAttributes {
  'xmi:type': string;
  'xmi:id': string;
  readonly supplier: string;
  readonly client: string;
  visibility: 'public' | 'private' | 'protected';
  [index: string]: string;
}

export class XmiDependency extends XmiNamedElement {
  public operations: XmiOperation[] = [];
  public properties: XmiProperty[] = [];
  public readonly attributes: IDependencyAttributes;
  constructor(public readonly supplier: XmiNamedElement, public readonly client: XmiNamedElement) {
    super(supplier.name.concat(client.name));
    this.attributes = {
      client: this.client.xmiId,
      supplier: this.supplier.xmiId,
      visibility: 'public',
      'xmi:id': this.xmiId,
      'xmi:type': this.xmiType(),
    };
  }
  public xmi(): IDependencyAttributes {
    return this.attributes;
  }
  protected xmiType(): string {
    return 'uml:Dependency';
  }
}

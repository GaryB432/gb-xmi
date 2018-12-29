import { AttrubuteMap } from '../utils';
import { XmiClass } from './class';

export interface IComponentAttributes {}

export class XmiComponent extends XmiClass {
  public xmiType(): string {
    return 'uml:Component';
  }
  public xmi(): AttrubuteMap {
    const atts: AttrubuteMap = super.xmi();
    atts['visibility'] = 'public';
    return atts;
  }
}

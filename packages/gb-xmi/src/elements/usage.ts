import { XmiDependency } from './dependency';

export interface IUsageAttributes {}
export class XmiUsage extends XmiDependency {
  protected xmiType(): string {
    return 'uml:Usage';
  }
}

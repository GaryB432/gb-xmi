export interface INamedElementAttributes {}
export abstract class XmiNamedElement {
  private static sequence: number = 0;
  public xmiId: string;

  constructor(public name: string) {
    this.xmiId = `_gb-xmi.${XmiNamedElement.sequence++}`;
  }
}

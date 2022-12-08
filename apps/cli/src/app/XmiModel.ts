import { IClass, IModel, IPackage } from '@gb-xmi/xmi';

export class XmiPackage implements IPackage {
  public constructor(private name: string) {}
  classes: Record<string, IClass> = {};
}

export class XmiModel implements IModel {
  public constructor(private name: string) {}
  packages: Record<string, IPackage> = {};
  public add(a: IPackage, name: string): void {
    this.packages[name] = a;
  }
  public greet(name: string): string {
    return `XmiModel says: hello to ${name}`;
  }
}

import { IClass, IModel, IPackage } from '@gb-xmi/xmi';
import { mermaidMarkdown as mm } from '@gb-xmi/reporters';

export class XmiPackage implements IPackage {
  public constructor(private name: string) {}
  classes: Record<string, IClass> = {};
  public add(a: IClass, name: string): void {
    this.classes[name] = a;
  }
}

export class XmiModel implements IModel {
  public constructor(private name: string) {}
  public packages: Record<string, IPackage> = {};
  public add(a: IPackage, name: string): void {
    this.packages[name] = a;
  }
  public greet(name: string): string {
    return `XmiModel says: hello to ${name}`;
  }
  public mermaidMarkdown(): string {
    return Object.values(this.packages).map(mm).join('\n\n');
  }
}

import { IClass, IModel, IPackage } from '@gb-xmi/xmi';
import { mermaidMarkdown } from '@gb-xmi/reporters';

export class XmiPackage implements IPackage {
  classes: Record<string, IClass> = {};
  public add(a: IClass, name: string): void {
    this.classes[name] = a;
  }
}

export class XmiModel implements IModel {
  public packages: Record<string, IPackage> = {};
  public add(a: IPackage, name: string): void {
    this.packages[name] = a;
  }
  public greet(name: string): string {
    return `XmiModel says: hello to ${name}`;
  }
  public mermaidMarkdown(): string {
    return Object.keys(this.packages)
      .map((n) => [`## ${n}`, mermaidMarkdown(this.packages[n])].join('\n'))
      .join('\n\n');
  }
}

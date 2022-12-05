import { IPackage } from '@gb-xmi/xmi';

export function reporters(): string {
  return 'reporters';
}

export function printMermaid(pkg: IPackage): string[] {
  const res: string[] = ['classDiagram'];
  for (const [a, b] of Object.entries(pkg.classes)) {
    res.push(`class ${a} {`);
    for (const [c, d] of Object.entries(b.attribute)) {
      res.push(`    +${d.typeName} ${c}`);
    }
    for (const [e, f] of Object.entries(b.ownedOperation)) {
      res.push(
        `    +${e}(${Object.keys(f.parameters).join(',')}) ${f.typeName}`
      );
    }
    res.push(`}`);
  }
  return res;
}

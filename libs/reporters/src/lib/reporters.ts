import { IPackage } from '@gb-xmi/xmi';

export function printMermaid(pkg: IPackage): string[] {
  const res: string[] = ['classDiagram'];
  for (const [className, classDef] of Object.entries(pkg.classes)) {
    res.push(`class ${className} {`);
    for (const [propName, prop] of Object.entries(classDef.attribute)) {
      res.push(`    +${prop.typeName} ${propName}`);
    }
    for (const [opName, op] of Object.entries(classDef.ownedOperation)) {
      res.push(
        `    +${opName}(${Object.keys(op.parameters).join(',')}) ${op.typeName}`
      );
    }
    res.push(`}`);
  }
  return res;
}

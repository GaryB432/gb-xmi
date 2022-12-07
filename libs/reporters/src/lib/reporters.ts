import { IPackage, VisibilityKind } from '@gb-xmi/xmi';

function printMermaid(pkg: IPackage): string[] {
  const tab = '  ';
  const res: string[] = ['classDiagram'];
  const visTable = new Map<VisibilityKind, string>([
    ['public', '+'],
    ['private', '-'],
    ['package', '~'],
  ]);
  for (const [className, classDef] of Object.entries(pkg.classes)) {
    res.push(`class ${className} {`);
    if (classDef.annotation) {
      res.push(...classDef.annotation.map((a) => `${tab}<<${a}>>`));
    }
    for (const [propName, prop] of Object.entries(classDef.attribute)) {
      const vis = visTable.get(prop.visibility) ?? 'public';
      res.push(`${tab}${vis}${prop.typeName} ${propName}`);
    }
    for (const [opName, op] of Object.entries(classDef.ownedOperation)) {
      res.push(
        `${tab}+${opName}(${Object.keys(op.parameters).join(',')}) ${op.typeName}`
      );
    }
    res.push(`}`);
  }
  return res;
}

export function mermaidMarkdown(pkg: IPackage): string {
  return ['```mermaid', ...printMermaid(pkg), '```'].join('\n');
}

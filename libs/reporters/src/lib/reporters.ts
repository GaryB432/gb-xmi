import type { IPackage, VisibilityKind } from '@gb-xmi/xmi';

function getVisibility(k: VisibilityKind): string {
  const PLUS = '+';
  const visTable = new Map<VisibilityKind, string>([
    ['public', PLUS],
    ['private', '-'],
    ['package', '~'],
  ]);
  return visTable.get(k) ?? PLUS;
}

function printMermaid(pkg: IPackage): string[] {
  const tab = '  ';
  const res: string[] = ['classDiagram'];
  for (const [className, classDef] of Object.entries(pkg.classes)) {
    res.push(`class ${className} {`);
    if (classDef.annotation) {
      res.push(...classDef.annotation.map((a) => `${tab}<<${a}>>`));
    }
    for (const [propName, prop] of Object.entries(classDef.attribute)) {
      res.push(
        `${tab}${getVisibility(prop.visibility)}${prop.typeName} ${propName}`
      );
    }
    for (const [opName, op] of Object.entries(classDef.ownedOperation)) {
      res.push(
        `${tab}${getVisibility(op.visibility)}${opName}(${Object.keys(
          op.parameters
        ).join(',')}) ${op.typeName}`
      );
    }
    res.push(`}`);
  }
  return res;
}

export function mermaidMarkdown(pkg: IPackage): string {
  return ['```mermaid', ...printMermaid(pkg), '```'].join('\n');
}

import ts = require('typescript');

export interface SharedOptions {
  dryRun?: boolean;
  verbose?: boolean;
}

export class GbCompilerHost implements ts.CompilerHost {
  constructor(private readonly code: string) {}
  fileExists = () => true;
  getCanonicalFileName = () => 'tbd.ts';
  getCurrentDirectory = () => '';
  getDefaultLibFileName = () => 'lib.d.ts';
  getDirectories = () => [];
  getNewLine = () => '\n';
  readFile = () => null;
  useCaseSensitiveFileNames = () => true;
  writeFile = () => {
    throw new Error('not implemented');
  };
  getSourceFile(filename: string): ts.SourceFile {
    return ts.createSourceFile(filename, this.code, ts.ScriptTarget.ES5, true);
  }
}

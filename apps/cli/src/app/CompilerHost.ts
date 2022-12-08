import ts = require('typescript');

export class CompilerHost implements ts.CompilerHost {
  public constructor(private readonly code: string) {}

  public fileExists = (): boolean => true;
  public getCanonicalFileName = (): string => 'tbd.ts';
  public getCurrentDirectory = (): string => '';
  public getDefaultLibFileName = (): string => 'lib.d.ts';
  public getDirectories = (): string[] => [];
  public getNewLine = (): string => '\n';
  public getSourceFile(filename: string): ts.SourceFile {
    return ts.createSourceFile(filename, this.code, ts.ScriptTarget.ES5, true);
  }
  public readFile = (_name: string): string | null => null;
  public useCaseSensitiveFileNames = (): boolean => true;
  public writeFile = (): void => {
    throw new Error('not implemented');
  };
}

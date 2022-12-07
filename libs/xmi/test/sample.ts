import ts = require('typescript');

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class Cat {
  whiskers = 0;
  private color: string;
  protected parent: SampleModule.Animal;
  meow(duration: number, volume: number): void {
    console.log(this.color, duration * volume);
  }
}

export module SampleModule {
  export class Animal {
    name: string;
    feet: number;
  }

  class TestCompilerHost implements ts.CompilerHost {
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
      return ts.createSourceFile(
        filename,
        this.code,
        ts.ScriptTarget.ES5,
        true
      );
    }
  }
}

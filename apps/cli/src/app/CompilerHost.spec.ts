import { CompilerHost } from './CompilerHost';

describe('CompilerHost', () => {
  let compilerHost: CompilerHost;
  beforeEach(() => {
    compilerHost = new CompilerHost('asdf');
  });
  test('adds', () => {
    expect(compilerHost.readFile('anything')).toBeNull();
  });
});

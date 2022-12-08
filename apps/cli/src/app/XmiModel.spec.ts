import { XmiModel, XmiPackage } from './XmiModel';

describe('XmiModel', () => {
  let xmiModel: XmiModel;
  beforeEach(() => {
    xmiModel = new XmiModel('tester');
  });
  test('adds', () => {
    xmiModel.add(new XmiPackage('hmmm'), 'sdf');
    expect(xmiModel).toBeDefined();
  });
  test('greets', () => {
    expect(xmiModel.greet('world')).toEqual('XmiModel says: hello to world');
  });
});

import { XmiPackage } from '../src/elements/package';

it('Should get xmiType', () => {
  var sut = new XmiPackage('subject');
  expect(sut.name).toBe('subject');
  // expect(sut.xmiType).toBe('xmi:class');
});

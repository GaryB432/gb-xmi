import { XmiClass } from '../src/elements/class';

it('Should get xmiType', () => {
  var sut = new XmiClass('subject');
  expect(sut.xmiType()).toBe('uml:Class');
});

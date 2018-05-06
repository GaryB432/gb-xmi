import { XmiInterface } from '../src/elements/interface';

it('Should get xmiType', () => {
  var sut = new XmiInterface('subject');
  expect(sut.xmiType()).toBe('uml:Interface');
});

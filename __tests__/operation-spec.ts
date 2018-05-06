import { XmiOperation } from '../src/elements/operation';

it('Should get xmiType', () => {
  var sut = new XmiOperation('subject', 'wtf');
  expect(sut.xmiType()).toBe('uml:Operation');
});

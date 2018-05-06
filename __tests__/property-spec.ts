import { XmiProperty } from '../src/elements/property';

it('Should get xmiType', () => {
  var sut = new XmiProperty('subject', 'hmm');
  expect(sut.xmiType()).toBe('uml:Property');
});

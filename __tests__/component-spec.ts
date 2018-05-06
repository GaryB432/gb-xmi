import { XmiComponent } from '../src/elements/component';

it('Should get xmiType', () => {
  var sut = new XmiComponent('subject');
  expect(sut.xmiType()).toBe('uml:Component');
});

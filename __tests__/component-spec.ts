import { XmiComponent } from '../src/elements/component';

it('Should get xmiType', () => {
  var sut = new XmiComponent('subject');
  expect(sut.xmi()).toEqual({
    isAbstract: 'false',
    name: 'subject',
    visibility: 'public',
    'xmi:id': '_gb-xmi.0',
    'xmi:type': 'uml:Component',
  });
});

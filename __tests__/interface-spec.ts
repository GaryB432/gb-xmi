import { XmiInterface } from '../src/elements/interface';

it('Should get xmiType', () => {
  var sut = new XmiInterface('subject');
  expect(sut.xmi()).toEqual({
    name: 'subject',
    visibility: 'package',
    'xmi:id': '_gb-xmi.0',
    'xmi:type': 'uml:Interface',
  });
});

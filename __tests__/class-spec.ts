import { XmiClass } from '../src/elements/class';

it('Should get xmiType', () => {
  var sut = new XmiClass('subject');
  expect(sut.xmi()).toEqual({
    isAbstract: 'false',
    name: 'subject',
    visibility: 'package',
    'xmi:id': '_gb-xmi.0',
    'xmi:type': 'uml:Class',
  });
});

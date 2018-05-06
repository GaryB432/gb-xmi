import { XmiClass } from '../src/elements/class';

it('Should get xmiType', () => {
  var sut = new XmiClass('subject', true);
  expect(sut.xmi()).toEqual({
    isAbstract: 'true',
    name: 'subject',
    visibility: 'package',
    'xmi:id': '_gb-xmi.0',
    'xmi:type': 'uml:Class',
  });
});

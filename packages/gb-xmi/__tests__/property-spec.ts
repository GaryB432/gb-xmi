import { XmiProperty } from '../src/elements/property';

it('Should get xmiType', () => {
  var sut = new XmiProperty('subject', 'hmm');
  expect(sut.xmi()).toEqual({
    isReadOnly: 'false',
    isStatic: 'false',
    name: 'subject',
    visibility: 'package',
    'xmi:id': '_gb-xmi.0',
    'xmi:type': 'uml:Property',
  });
});

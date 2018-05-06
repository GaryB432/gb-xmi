import { XmiOperation } from '../src/elements/operation';

it('Should get xmiType', () => {
  var sut = new XmiOperation('subject', 'abc');
  expect(sut.xmi()).toEqual({
    isReadOnly: 'false',
    isStatic: 'false',
    name: 'subject',
    visibility: 'package',
    'xmi:id': '_gb-xmi.0',
    'xmi:type': 'uml:Operation',
  });
});

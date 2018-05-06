import { XmiParameter } from '../src/elements/parameter';

it('Should get xmiType', () => {
  var sut = new XmiParameter('subject', 'um');
  expect(sut.xmi()).toEqual({
    direction: 'inout',
    name: 'subject',
    'xmi:id': '_gb-xmi.0',
  });
});

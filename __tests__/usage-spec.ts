import { XmiUsage } from '../src/elements/usage';
import { XmiClass } from '../src/elements/class';

it('Should get xmiType', () => {
  var a = new XmiClass('a');
  var b = new XmiClass('b');
  var sut = new XmiUsage(a, b);
  expect(sut.xmi()).toEqual({
    client: '_gb-xmi.1',
    supplier: '_gb-xmi.0',
    visibility: 'public',
    'xmi:id': '_gb-xmi.2',
    'xmi:type': 'uml:Usage',
  });
});

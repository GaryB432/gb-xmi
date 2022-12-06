import { add, greet, meaning } from './translate';

describe('Translate', () => {
  test('adds', () => {
    expect(add(2, 3)).toEqual(5);
  });
  test('greets', () => {
    expect(greet('world')).toEqual('translate says: hello to world');
  });
  test('meaning', () => {
    expect(meaning.life).toEqual(42);
  });
});

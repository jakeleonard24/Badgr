const tests = require('./addLikeTest');


describe('addLikeTest', () => {
  it('should add one to the input number', () => {
    expect(tests.addLikeTest(2)).toBe(3);
  });
});
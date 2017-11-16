const addLikeTest = require('./addLikeTest');


describe('addLikeTest', () => {
  it('should add one to the input number', () => {
    expect(addLikeTest(2)).toBe(3);
  });
});
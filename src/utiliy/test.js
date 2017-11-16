const tests = require('./addLikeTest');


describe('addLikeTest', () => {
  it('should add one to the input number', () => {
    expect(tests.addLikeTest(2)).toBe(3),
    expect(tests.addLikeTest(3)).toBe(4);
  });
})

describe('minusLikeTest', () => {
  it('should minus one to the input number', () => {
    expect(tests.minusLikeTest(2)).toBe(1),
    expect(tests.minusLikeTest(15)).toBe(14);
  });
})

describe('checkCommentLengthTest', () => {
  it('comment length should be > 0', () => {
    expect(tests.checkCommentLengthTest(1)).toBe(true),
    expect(tests.checkCommentLengthTest(0)).toBe(false);
  });
})


describe('checkPostTypeTest', () => {
  it('check to see if post  is complete', () => {
    expect(tests.checkPostTypeTest('complete')).toBe(true),
    expect(tests.checkPostTypeTest('clete')).toBe(false);
  });
})

describe('checkUserIdTest', () => {
  it('check to see if user id is correct', () => {
    expect(tests.checkUserIdTest(1 , 1)).toBe(true),
    expect(tests.checkUserIdTest(1 , 2)).toBe(false);
  });
})

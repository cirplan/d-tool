import { getMonths } from '../month';

describe('getYearsByStep', () => {
  test('default', () => {
    expect(getMonths()).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
  })
});

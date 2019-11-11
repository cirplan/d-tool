import { getDays, getLunarDays } from '../day';

describe('getDays', () => {
  test('2017-02', () => {
    expect(getDays(2017, 2)).toEqual(expect.arrayContaining(new Array(28).fill(0).map((it, i) => i + 1)));
  })
});

describe('getLunarDays', () => {
  test('2017-02', () => {
    expect(getLunarDays(2017, 2)).toEqual(expect.arrayContaining(new Array(28).fill(0).map((it, i) => i + 1)));
  })
});

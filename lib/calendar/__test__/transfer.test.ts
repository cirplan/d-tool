import { solar2lunar, lunar2solar } from '../transfer';

describe('solar2Lunar', () => {
  test('2019-1-1', () => {
    expect(solar2lunar(2019, 1, 1)).toEqual({ day: 26, month: 11, year: 2018 });
  });

  test('2019-2-5', () => {
    expect(solar2lunar(2019, 2, 5)).toEqual({ day: 1, month: 1, year: 2019 });
  });
});

describe('lunar2solar', () => {
  test('2018-11-26', () => {
    expect(lunar2solar(2018, 11, 26)).toEqual({ day: 1, month: 1, year: 2019 });
  });

  test('2019-1-1', () => {
    expect(lunar2solar(2019, 1, 1)).toEqual({ day: 5, month: 2, year: 2019 });
  });

  test('2019-1-1', () => {
    expect(lunar2solar(2018, 1, 1)).toEqual({ day: 16, month: 2, year: 2018 });
  });
});

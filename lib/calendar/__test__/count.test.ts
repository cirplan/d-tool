import { countDaysByDates, countNextYearDays, countNextYearLunarDays } from '../count';

describe('countDaysByDates', () => {
  test('2019-01-01 2019-01-15', () => {
    expect(countDaysByDates('2019-01-01', '2019-01-15')).toEqual(14);
  });

  test('2018-01-01 2019-01-15', () => {
    expect(countDaysByDates('2018-01-01', '2019-01-15')).toEqual(379);
  });
});

describe('countNextYearDays', () => {
  test('1, 1', () => {
    expect(countNextYearDays(1, 1)).toEqual(50);
  });

  test('5, 20', () => {
    expect(countNextYearDays(5, 20)).toEqual(190);
  });
});

describe('countNextYearLunarDays', () => {
  test('1, 1', () => {
    expect(countNextYearLunarDays(1, 1)).toEqual(74);
  });

  test('5, 1', () => {
    expect(countNextYearLunarDays(5, 1)).toEqual(222);
  });
});

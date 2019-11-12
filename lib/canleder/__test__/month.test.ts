import { getMonths, getLunarMonths, leapMonth, toChinaMonth } from '../month';

describe('getYearsByStep', () => {
  test('default', () => {
    expect(getMonths()).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
  });
});

describe('getLunarMonths', () => {
  test('default', () => {
    expect(getLunarMonths()).toEqual(expect.arrayContaining(['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']));
  });
});

describe('leapMonth', () => {
  test('2019', () => {
    expect(leapMonth(2019)).toEqual(0);
  });

  test('2018', () => {
    expect(leapMonth(2019)).toEqual(0);
  });

  test('2012', () => {
    expect(leapMonth(2012)).toEqual(4);
  });

  test('2009', () => {
    expect(leapMonth(2009)).toEqual(5);
  });
});

describe('toChinaMonth', () => {
  test('1', () => {
    expect(toChinaMonth(1)).toEqual('正');
  });

  test('12', () => {
    expect(toChinaMonth(12)).toEqual('腊');
  });

  function toChinaMonth0() {
    toChinaMonth(0);
  }

  test('0', () => {
    expect(toChinaMonth0).toThrowError(new RangeError('month cannot to be 0'));
  });
});

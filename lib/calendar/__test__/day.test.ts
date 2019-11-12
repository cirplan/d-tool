import { getDays, getLunarDays, toChinaDay } from '../day';

describe('getDays', () => {
  test('2017-02', () => {
    expect(getDays(2017, 2)).toEqual(expect.arrayContaining(new Array(28).fill(0).map((it, i) => i + 1)));
  });
});

describe('getLunarDays', () => {
  test('2017-02', () => {
    expect(getLunarDays(2017, 2)).toEqual(['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '廿十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '卅十']);
  });
});

describe('toChinaDay', () => {
  test('2', () => {
    expect(toChinaDay(2)).toEqual('初二');
  });

  test('10', () => {
    expect(toChinaDay(10)).toEqual('初十');
  });

  test('19', () => {
    expect(toChinaDay(19)).toEqual('十九');
  });

  test('29', () => {
    expect(toChinaDay(29)).toEqual('廿九');
  });

  test('30', () => {
    expect(toChinaDay(30)).toEqual('卅十');
  });
});

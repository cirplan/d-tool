import { lunarInfo } from './year';
import { leapMonth } from './month';

/**
 * 根据年，月获取最后一天
 * @param year
 * @param month
 */
export function getLastDays(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * 根据年，月获取该月天数列表
 * @param year
 * @param month
 */
export function getDays(year: number, month: number): Array<number> {
  return new Array(getLastDays(year, month)).fill(0).map((it, i) => i + 1);
}



/**
 * 根据年，月获取该月农历天数列表
 * @param year
 * @param month
 */
export function getLunarDays(year: number, month: number): Array<string> {
  const _leapMonth = leapMonth(year);
  let lastDay;
  // 闰月
  if (_leapMonth === month) {
    lastDay = leapDays(year);
  } else {
    lastDay = monthDays(year, month);
  }

  return new Array(lastDay).fill(0).map((it, i) => toChinaDay(i + 1));
}

/**
* 返回农历y年闰月的天数 若该年没有闰月则返回0
* @param lunar Year
* @return Number (0、29、30)
*/
export function leapDays(year: number) {
  if (leapMonth(year)) {
    return ((lunarInfo[year - 1900] & 0x10000) ? 30 : 29);
  }
  return (0);
}

/**
  * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
  * @param lunar Year
  * @return Number (-1、29、30)
  * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
  */
export function monthDays(year: number, month: number) {
  return ((lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29);
}

const lunarDayDef = ['初', '十', '廿', '卅'];
const lunarDayDef2 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

/**
* 传入农历日期数字返回汉字表示法
* @param lunar day
* @return Cn string
*/
export function toChinaDay(day: number) {
  var s;
  switch (day) {
    case 10:
      s = '初十'; break;
    case 20:
      s = '廿十'; break;
      break;
    case 30:
      s = '卅十'; break;
      break;
    default:
      s = lunarDayDef[Math.floor(day / 10)];
      s += lunarDayDef2[day % 10];
  }
  return (s);
}

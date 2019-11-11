import { lunarInfo } from './year';

/**
 * 获取月份
 */
export function getMonths(): Array<number> {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}

/**
 * 获取农历月份
 */
export function getLunarMonths() {
  return ['正', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
}

/**
* 返回农历year年闰月是哪个月；若year年没有闰月 则返回0
* @param lunar year
* @return Number (0-12)
*/
export function leapMonth(year: number) {
  return (lunarInfo[year - 1900] & 0xf);
}

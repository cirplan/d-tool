import { lunar2solar } from './transfer';

/**
 * 计算下一年的日期离现在还有多少天
 * @param month number
 * @param day number
 */
export function countNextYearDays (month: number, day: number): number {
  const date = new Date();
  const year = date.getFullYear();
  const nextDate = `${year + 1}-${month}-${day}`;
  const nowDate = `${year}-${date.getMonth() + 1}-${date.getDate()}`;
  return countDaysByDates(nowDate, nextDate);
}

/**
 * 计算下一年农历日期离现在还有多少天
 * @param month
 * @param day
 */
export function countNextYearLunarDays (month: number, day: number): number {
  const date = new Date();
  const year = date.getFullYear();
  const date1 = lunar2solar(year + 1, month, day);
  const nextDate = `${date1.year}-${date1.month}-${date1.day}`;
  const nowDate = `${year}-${date.getMonth() + 1}-${date.getDate()}`;
  return countDaysByDates(nowDate, nextDate);
}

/**
 * 计算两个日期的天数差
 * @param date1 yyyy-mm-dd
 * @param date2 yyyy-mm-dd
 * @returns days number 天数
 * @eg: countDaysByDates('2019-01-01', '2019-01-15') => 14
 */
export function countDaysByDates (date1: string, date2: string): number {
  const d1 = date1.split('-').map(it => parseInt(it));
  const d2 = date2.split('-').map(it => parseInt(it));
  const _d1 = new Date(d1[0], d1[1] - 1, d1[2]);
  const _d2 = new Date(d2[0], d2[1] - 1, d2[2]);
  const time1 = _d1.getTime();
  const time2 = _d2.getTime();
  const dateTime = 1000 * 60 * 60 * 24;
  const days = Math.floor((time1 - time2) / dateTime);
  return Math.abs(days);
}

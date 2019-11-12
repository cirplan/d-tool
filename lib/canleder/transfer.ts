import { lunarYearDays, leapDays, monthDays } from './day';
import { leapMonth } from './month';

/**
 * 新历转旧历
 * @param year
 * @param month
 * @param day
 */
export function solar2lunar(year: number, month: number, day: number) {
  if (year < 1900 || year > 2100) {
    return -1;
  }

  if (year === 1900 && month === 1 && day < 31) {
    return -1;
  }

  const date = new Date(year, month - 1, day);
  let i;
  let temp = 0;

  let offset = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
  for (i = 1900; i < 2101 && offset > 0; i++) {
    temp = lunarYearDays(i);
    offset -= temp;
  }

  if (offset < 0) {
    offset += temp;
    i--;
  }

  // 农历年
  const _year = i;
  const leap = leapMonth(i); // 闰哪个月
  var isLeap = false;

  // 效验闰月
  for (i = 1; i < 13 && offset > 0; i++) {
    // 闰月
    if (leap > 0 && i === (leap + 1) && isLeap === false) {
      --i;
      isLeap = true;
      temp = leapDays(_year); // 计算农历闰月天数
    } else {
      temp = monthDays(_year, i); // 计算农历普通月天数
    }
    // 解除闰月
    if (isLeap === true && i === (leap + 1)) {
      isLeap = false;
    }
    offset -= temp;
  }

  // 闰月导致数组下标重叠取反
  if (offset === 0 && leap > 0 && i === leap + 1) {
    if (isLeap) {
      isLeap = false;
    } else {
      isLeap = true;
      --i;
    }
  }

  if (offset < 0) {
    offset += temp;
    --i;
  }

  // 农历月
  const _month = i;
  // 农历日
  const _day = offset + 1;

  return {
    year: _year,
    month: _month,
    day: _day
  };
}

/**
 * 旧历转新历
 * @param year
 * @param month
 * @param day
 */
export function lunar2solar(year: number, month: number, day: number) {
  let _leapMonth = leapMonth(year);
  let _leapDay = leapDays(year);
  let isLeapMonth = _leapMonth === month;
  // 超出了最大极限值
  if (year == 2100 && month == 12 && day > 1 || year == 1900 && month == 1 && day < 31) {
    return -1;
  }
  let _day = monthDays(year, month);

  if (isLeapMonth) {
    _day = _leapDay;
  }

  //计算农历的时间差
  let offset = 0;
  for (let i = 1900; i < year; i++) {
    offset += lunarYearDays(i);
  }

  let leap = 0;
  let isAdd = false;
  for (var i = 1; i < month; i++) {
    leap = leapMonth(year);
    if (!isAdd) { // 处理闰月
      if (leap <= i && leap > 0) {
        offset += leapDays(year);
        isAdd = true;
      }
    }
    offset += monthDays(year, i);
  }

  //转换闰月农历 需补充该年闰月的前一个月的时差
  if (isLeapMonth) {
    offset += _day;
  }

  //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
  let stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
  let calObj = new Date((offset + day - 31) * 86400000 + stmap);
  let cY = calObj.getUTCFullYear();
  let cM = calObj.getUTCMonth() + 1;
  let cD = calObj.getUTCDate();

  let objDate = new Date(cY, cM - 1, cD);
  let y = objDate.getFullYear();
  let m = objDate.getMonth() + 1;
  let d = objDate.getDate();

  return {
    year: y,
    month: m,
    day: d
  }
}

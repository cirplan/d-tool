/**
 * verify mobile
 * @param {*} mobile
 */
function verifyMobile(mobile) {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile);
}

/**
 * 根据区域从后往前获取年份时间段
 * @param {end} 结束时间
 * @param {step} 时间区域
 */
function getYearsByStep({ end = (new Date()).getFullYear(), step = 5 }) {
    const start = end - step;
    if (start > end) {
        throw new RangeError('start year cannot be greater then the end year.');
    }
    return new Array(step).fill(0).map((y, i) => start + i + 1);
}
/**
  * 农历1900-2100的润大小信息表
  */
const lunarInfo = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
    0x0d520
]; // 2100
/**
 * 天干地支之天干速查表
 */
const Gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
/**
 * 天干地支之地支速查表
 */
const Zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
/**
 * 把年份转换成干支纪年
 * @param year number
 */
function toGanZhiYear(year) {
    let ganKey = (year - 3) % 10;
    let zhiKey = (year - 3) % 12;
    if (ganKey === 0) {
        ganKey = 10; // 如果余数为0则为最后一个天干
    }
    if (zhiKey === 0) {
        zhiKey = 12; // 如果余数为0则为最后一个地支
    }
    return Gan[ganKey - 1] + Zhi[zhiKey - 1];
}
/**
 * 获取农历年份列表
 * @param param0
 */
function getLunarYearByStep({ end = (new Date()).getFullYear(), step = 5 }) {
    const years = getYearsByStep({ end, step });
    return years.map(year => toGanZhiYear(year));
}
const Animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
/**
 * 根据年份大致转换生肖
 * @param year
 */
function getAnimal(year) {
    return Animals[(year - 4) % 12];
}

/**
 * 获取月份
 */
function getMonths() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}
/**
 * 获取农历月份
 */
function getLunarMonths() {
    return ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
}
/**
* 返回农历year年闰月是哪个月；若year年没有闰月 则返回0
* @param lunar year
* @return Number (0-12)
*/
function leapMonth(year) {
    return (lunarInfo[year - 1900] & 0xf);
}
/**
 * 返回中文月份
 * @param month 1 - 12
 */
function toChinaMonth(month) {
    if (month > 12 || month < 1) {
        throw new RangeError(`month cannot to be ${month}`);
    }
    return getLunarMonths()[month - 1];
}

/**
 * 根据年，月获取最后一天
 * @param year
 * @param month
 */
function getLastDays(year, month) {
    return new Date(year, month, 0).getDate();
}
/**
 * 根据年，月获取该月天数列表
 * @param year
 * @param month
 */
function getDays(year, month) {
    return new Array(getLastDays(year, month)).fill(0).map((it, i) => i + 1);
}
/**
 * 根据年，月获取该月农历天数列表
 * @param year
 * @param month
 */
function getLunarDays(year, month) {
    const _leapMonth = leapMonth(year);
    let lastDay;
    // 闰月
    if (_leapMonth === month) {
        lastDay = leapDays(year);
    }
    else {
        lastDay = monthDays(year, month);
    }
    return new Array(lastDay).fill(0).map((it, i) => toChinaDay(i + 1));
}
/**
* 返回农历y年闰月的天数 若该年没有闰月则返回0
* @param lunar Year
* @return Number (0、29、30)
*/
function leapDays(year) {
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
function monthDays(year, month) {
    return ((lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29);
}
const lunarDayDef = ['初', '十', '廿', '卅'];
const lunarDayDef2 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
/**
* 传入农历日期数字返回汉字表示法
* @param lunar day
* @return Cn string
*/
function toChinaDay(day) {
    var s;
    switch (day) {
        case 10:
            s = '初十';
            break;
        case 20:
            s = '廿十';
            break;
        case 30:
            s = '卅十';
            break;
        default:
            s = lunarDayDef[Math.floor(day / 10)];
            s += lunarDayDef2[day % 10];
    }
    return (s);
}
/**
* 返回农历y年一整年的总天数
* @param lunar Year
* @return Number
*/
function lunarYearDays(year) {
    let i;
    let sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
        sum += (lunarInfo[year - 1900] & i) ? 1 : 0;
    }
    return (sum + leapDays(year));
}

/**
 * 新历转旧历
 * @param year
 * @param month
 * @param day
 */
function solar2lunar(year, month, day) {
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
        }
        else {
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
        }
        else {
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
function lunar2solar(year, month, day) {
    const _leapMonth = leapMonth(year);
    const _leapDay = leapDays(year);
    const isLeapMonth = _leapMonth === month;
    // 超出了最大极限值
    if ((year === 2100 && month === 12 && day > 1) ||
        (year === 1900 && month === 1 && day < 31)) {
        throw new RangeError(`${year} ${month} ${day} is outer rang`);
    }
    let _day = monthDays(year, month);
    if (isLeapMonth) {
        _day = _leapDay;
    }
    // 计算农历的时间差
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
    // 转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {
        offset += _day;
    }
    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    const stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    const calObj = new Date((offset + day - 31) * 86400000 + stmap);
    const cY = calObj.getUTCFullYear();
    const cM = calObj.getUTCMonth() + 1;
    const cD = calObj.getUTCDate();
    const objDate = new Date(cY, cM - 1, cD);
    const y = objDate.getFullYear();
    const m = objDate.getMonth() + 1;
    const d = objDate.getDate();
    return {
        year: y,
        month: m,
        day: d
    };
}

export { Animals, Gan, Zhi, getAnimal, getDays, getLastDays, getLunarDays, getLunarMonths, getLunarYearByStep, getMonths, getYearsByStep, leapDays, leapMonth, lunar2solar, lunarInfo, lunarYearDays, monthDays, solar2lunar, toChinaDay, toChinaMonth, toGanZhiYear, verifyMobile };

// 时间处理函数集

/***
 * 格式化时间
 * @param date
 * @param fmt
 * @returns {*}
 */
export function dateFormat(date, fmt) {
  let o = {
    'M+': date.getMonth() + 1,                 //月份
    'd+': date.getDate(),                    //日
    'h+': date.getHours(),                   //小时
    'm+': date.getMinutes(),                 //分
    's+': date.getSeconds(),                 //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

/***
 * 格式化字符串时间
 * @param strDate
 * @param strFormat
 * @returns {*}
 */
export function dateStrFormat(strDate, strFormat) {
  let tmpDate = new Date();
  let longTime = Date.parse(strDate);
  if (isNaN(longTime)) { //IE兼容
    let dates = strDate.split(' ')[0].split('-');
    let times = strDate.split(' ')[1].split(':');

    if (strFormat.indexOf('yyyy') > -1) {
      tmpDate.setFullYear(parseInt(dates[0], 10));
    }
    if (strFormat.indexOf('MM') > -1) {
      tmpDate.setMonth(parseInt(dates[1], 10) - 1);
    }
    if (strFormat.indexOf('dd') > -1) {
      tmpDate.setDate(parseInt(dates[2], 10));
    }
    if (strFormat.indexOf('hh') > -1) {
      tmpDate.setHours(parseInt(times[0], 10));
    }
    if (strFormat.indexOf('mm') > -1) {
      tmpDate.setMinutes(parseInt(times[1], 10));
    }
    if (strFormat.indexOf('ss') > -1) {
      tmpDate.setSeconds(parseInt(times[2], 10));
    }
  } else {
    tmpDate = new Date(longTime);
  }
  return dateFormat(tmpDate, strFormat);
};

/***
 * 获得本周起止时间
 */
export function getCurrentWeek() {
  //起止日期数组
  let startStop = new Array();
  //获取当前时间
  let currentDate = new Date();
  //返回date是一周中的某一天
  let week = currentDate.getDay();
  //返回date是一个月中的某一天
  let month = currentDate.getDate();

  //一天的毫秒数
  let millisecond = 1000 * 60 * 60 * 24;
  //减去的天数
  let minusDay = week !== 0 ? week - 1 : 6;
  //alert(minusDay);
  //本周 周一
  let monday = new Date(currentDate.getTime() - (minusDay * millisecond));
  //本周 周日
  let sunday = new Date(monday.getTime() + (6 * millisecond));
  //添加本周时间
  startStop.push(dateFormat(monday, 'yyyy-MM-dd'));//本周起始时间
  //添加本周最后一天时间
  startStop.push(dateFormat(sunday, 'yyyy-MM-dd'));//本周终止时间
  //返回
  return startStop;
};

/***
 * 获得本月的起止时间
 */
export function getCurrentMonth() {
  //起止日期数组
  let startStop = new Array();
  //获取当前时间
  let currentDate = new Date();
  //获得当前月份0-11
  let currentMonth = currentDate.getMonth();
  //获得当前年份4位年
  let currentYear = currentDate.getFullYear();
  //求出本月第一天
  let firstDay = new Date(currentYear, currentMonth, 1);

  //当为12月的时候年份需要加1
  //月份需要更新为0 也就是下一年的第一个月
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;//就为
  } else {
    //否则只是月份增加,以便求的下一月的第一天
    currentMonth++;
  }
  //一天的毫秒数
  let millisecond = 1000 * 60 * 60 * 24;
  //下月的第一天
  let nextMonthDayOne = new Date(currentYear, currentMonth, 1);
  //求出上月的最后一天
  let lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

  //添加至数组中返回
  startStop.push(dateFormat(firstDay, 'yyyy-MM-dd'));
  startStop.push(dateFormat(lastDay, 'yyyy-MM-dd'));
  //返回
  return startStop;
};

/**
 * 得到本季度开始的月份
 * @param month 需要计算的月份
 ***/
export function getQuarterSeasonStartMonth(month) {
  let quarterMonthStart = 0;
  let spring = 0; //春
  let summer = 3; //夏
  let fall = 6;   //秋
  let winter = 9;//冬
  //月份从0-11
  if (month < 3) {
    return spring;
  }
  if (month < 6) {
    return summer;
  }
  if (month < 9) {
    return fall;
  }
  return winter;
};

/**
 * 获得该月的天数
 * @param year年份
 * @param month月份
 * */
export function getMonthDays(year, month) {
  //本月第一天 1-31
  let relativeDate = new Date(year, month, 1);
  //获得当前月份0-11
  let relativeMonth = relativeDate.getMonth();
  //获得当前年份4位年
  let relativeYear = relativeDate.getFullYear();

  //当为12月的时候年份需要加1
  //月份需要更新为0 也就是下一年的第一个月
  if (relativeMonth === 11) {
    relativeYear++;
    relativeMonth = 0;
  } else {
    //否则只是月份增加,以便求的下一月的第一天
    relativeMonth++;
  }
  //一天的毫秒数
  let millisecond = 1000 * 60 * 60 * 24;
  //下月的第一天
  let nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
  //返回得到上月的最后一天,也就是本月总天数
  return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
};

/**
 * 获得本季度的起止日期
 */
export function getCurrentSeason() {
  //起止日期数组
  let startStop = new Array();
  //获取当前时间
  let currentDate = new Date();
  //获得当前月份0-11
  let currentMonth = currentDate.getMonth();
  //获得当前年份4位年
  let currentYear = currentDate.getFullYear();
  //获得本季度开始月份
  let quarterSeasonStartMonth = getQuarterSeasonStartMonth(currentMonth);
  //获得本季度结束月份
  let quarterSeasonEndMonth = quarterSeasonStartMonth + 2;

  //获得本季度开始的日期
  let quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
  //获得本季度结束的日期
  let quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, getMonthDays(currentYear, quarterSeasonEndMonth));
  //加入数组返回
  startStop.push(dateFormat(quarterSeasonStartDate, 'yyyy-MM-dd'));
  startStop.push(dateFormat(quarterSeasonEndDate, 'yyyy-MM-dd'));
  //返回
  return startStop;
};

/***
 * 得到本年的起止日期
 *
 */
export function getCurrentYear() {
  //起止日期数组
  let startStop = new Array();
  //获取当前时间
  let currentDate = new Date();
  //获得当前年份4位年
  let currentYear = currentDate.getFullYear();

  //本年第一天
  let currentYearFirstDate = new Date(currentYear, 0, 1);
  //本年最后一天
  let currentYearLastDate = new Date(currentYear, 11, 31);
  //添加至数组
  startStop.push(dateFormat(currentYearFirstDate, 'yyyy-MM-dd'));
  startStop.push(dateFormat(currentYearLastDate, 'yyyy-MM-dd'));
  //返回
  return startStop;
};

/**
 * 返回上一个月的第一天Date类型
 * @param year 年
 * @param month 月
 **/
export function getPriorMonthFirstDay(year, month) {
  //年份为0代表,是本年的第一月,所以不能减
  if (month === 0) {
    month = 11;//月份为上年的最后月份
    year--;//年份减1
    return new Date(year, month, 1);
  }
  //否则,只减去月份
  month--;
  return new Date(year, month, 1);
  ;
};

/**
 * 获得上一月的起止日期
 * ***/
export function getPreviousMonth() {
  //起止日期数组
  let startStop = new Array();
  //获取当前时间
  let currentDate = new Date();
  //获得当前月份0-11
  let currentMonth = currentDate.getMonth();
  //获得当前年份4位年
  let currentYear = currentDate.getFullYear();
  //获得上一个月的第一天
  let priorMonthFirstDay = getPriorMonthFirstDay(currentYear, currentMonth);
  //获得上一月的最后一天
  let priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
  //添加至数组
  startStop.push(dateFormat(priorMonthFirstDay, 'yyyy-MM-dd'));
  startStop.push(dateFormat(priorMonthLastDay, 'yyyy-MM-dd'));
  //返回
  return startStop;
};


/**
 * 获得上一周的起止日期
 * **/
export function getPreviousWeek() {
  //起止日期数组
  let startStop = new Array();
  //获取当前时间
  let currentDate = new Date();
  //返回date是一周中的某一天
  let week = currentDate.getDay();
  //返回date是一个月中的某一天
  let month = currentDate.getDate();
  //一天的毫秒数
  let millisecond = 1000 * 60 * 60 * 24;
  //减去的天数
  let minusDay = week !== 0 ? week - 1 : 6;
  //获得当前周的第一天
  let currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
  //上周最后一天即本周开始的前一天
  let priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
  //上周的第一天
  let priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));

  //添加至数组
  startStop.push(dateFormat(priorWeekFirstDay, 'yyyy-MM-dd'));
  startStop.push(dateFormat(priorWeekLastDay, 'yyyy-MM-dd'));

  return startStop;
};

/**
 * 得到上季度的起始日期
 * year 这个年应该是运算后得到的当前本季度的年份
 * month 这个应该是运算后得到的当前季度的开始月份
 * */
export function getPriorSeasonFirstDay(year, month) {
  let quarterMonthStart = 0;
  let spring = 0; //春
  let summer = 3; //夏
  let fall = 6;   //秋
  let winter = 9;//冬
  //月份从0-11
  switch (month) {//季度的其实月份
    case spring:
      //如果是第一季度则应该到去年的冬季
      year--;
      month = winter;
      break;
    case summer:
      month = spring;
      break;
    case fall:
      month = summer;
      break;
    case winter:
      month = fall;
      break;
  }
  return new Date(year, month, 1);
};

/**
 * 得到上季度的起止日期
 * **/
export function getPreviousSeason() {
  //起止日期数组
  let startStop = new Array();
  //获取当前时间
  let currentDate = new Date();
  //获得当前月份0-11
  let currentMonth = currentDate.getMonth();
  //获得当前年份4位年
  let currentYear = currentDate.getFullYear();
  //上季度的第一天
  let priorSeasonFirstDay = getPriorSeasonFirstDay(currentYear, currentMonth);
  //上季度的最后一天
  let priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));
  //添加至数组
  startStop.push(dateFormat(priorSeasonFirstDay, 'yyyy-MM-dd'));
  startStop.push(dateFormat(priorSeasonLastDay, 'yyyy-MM-dd'));
  return startStop;
};

/**
 * 得到去年的起止日期
 * **/
export function getPreviousYear() {
  //起止日期数组
  let startStop = new Array();
  //获取当前时间
  let currentDate = new Date();
  //获得当前年份4位年
  let currentYear = currentDate.getFullYear();
  currentYear--;
  let priorYearFirstDay = new Date(currentYear, 0, 1);
  let priorYearLastDay = new Date(currentYear, 11, 1);
  //添加至数组
  startStop.push(dateFormat(priorYearFirstDay, 'yyyy-MM-dd'));
  startStop.push(dateFormat(priorYearLastDay, 'yyyy-MM-dd'));
  return startStop;
};

/**
 * 获取两个日期相差天数
 * @param strDateStart
 * @param strDateEnd
 * @returns {Number|*}
 */
export function getDiffDays(strDateStart, strDateEnd) {
  let oDate1;
  let oDate2;
  let iDays;
  oDate1 = strDateStart.split('-');
  oDate2 = strDateEnd.split('-');
  let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
  let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
  iDays = parseInt((strDateS - strDateE) / 3600000 / 24);
  return iDays;
};

/**
 * 指定日期向前多少天
 * @param dateStr
 * @param days
 */
export function getBeforeDays(dateStr, days) {
  let now = new Date(dateStr);
  now = new Date((now / 1000 - 86400 * days) * 1000);
  return dateFormat(now, 'yyyy-MM-dd');
};

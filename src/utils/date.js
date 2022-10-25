

import dayjs from 'dayjs';

/**
 * 时间格式化
 * @param {date} date
 * @param {string} format
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

/**
 * 获取剩余的 天 时 分 秒 or 时间差
 * @param {Date} timer 秒
 * @param {Date} currentTimer 秒
 * @returns
 */
export const countDown = (timer, currentTimer) => {
  let timeDiff = null;
  let result = null;
  const d = 86400;
  const h = 3600;
  const m = 60;

  if (timer > currentTimer) {
    timeDiff = timer - currentTimer;
    const dd = Math.floor(timeDiff / d);
    const hh = Math.floor((timeDiff / h) % 24);
    const mm = Math.floor((timeDiff / m) % 60);
    const ss = Math.floor(timeDiff % m);
    // const dd = Math.floor(timer / 60 / 60 / 24)
    // const hh = Math.floor(timer / 60 / 60 % 24)
    // const mm = Math.floor(timer / 60 % 60)
    // const ss = Math.floor(timer % 60)
    result = {
      dd: zeroIze(dd),
      hh: zeroIze(hh),
      mm: zeroIze(mm),
      ss: zeroIze(ss)
    };
  }
  return result;
};

/**
 *
 * @param {*} serverInitTime 服务器时间
 * @param {*} localInitTime 本地服务器初化时间
 * @returns
 */
export const getServerInitTime = (serverInitTime, localInitTime) => {
  const localCurrentTime = Date.now() / 1000;
  return serverInitTime + (localCurrentTime - localInitTime);
};

// 补 0
export const zeroIze = (num) => {
  return num < 10 ? '0' + num : num;
};

/**
 * 时间差
 * @param {*} maxTime 秒
 * @param {*} minTime 秒
 * @returns
 */
export const dateDifference = (maxTime, minTime) => {
  let timeDiff = null;
  let result = { name: '', value: '' };
  const y = 31536000;
  const mm = 2592000;
  const d = 86400;
  const h = 3600;
  const m = 60;
  if (maxTime > minTime) {
    timeDiff = parseInt(maxTime) - parseInt(minTime);
    if (timeDiff >= y) result = { name: 'yy', value: Math.floor(timeDiff / y) };
    else if (timeDiff >= mm)
      result = { name: 'mm', value: Math.floor(timeDiff / mm) };
    else if (timeDiff >= d)
      result = { name: 'dd', value: Math.floor(timeDiff / d) };
    else if (timeDiff >= h)
      result = { name: 'hh', value: Math.floor(timeDiff / h) };
    else if (timeDiff >= m)
      result = { name: 'm', value: Math.floor(timeDiff / m) };
    else result = { name: 'ss', value: Math.floor(timeDiff) };
  }
  return result;
};

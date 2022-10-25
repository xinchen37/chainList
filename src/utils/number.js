import { Decimal } from 'decimal.js';
import { BigNumber } from 'ethers'

// 设置精度
export const toFixed = (num, decimal) => {
  const n = new Decimal(num || 0).toFixed(decimal, Decimal.ROUND_DOWN);
  const value = new Decimal(n).valueOf();
  return value;
};

/**
 * 转16进制
 * @param {*} chainId
 * @returns
 */
export const networkVersionHex = (chainId) =>
  new Decimal(chainId).toHexadecimal();

/**
 * 输入的必须为整数或者小数，小数在指定精度
 */
export const fixedNumber = (value, precision) => {
  if (value) {
    return precision
      ? value
        .replace(/[^\d.]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(
          new RegExp('^(\\d+)((\\.\\d{1,' + precision + '})(\\d)*)?$'),
          '$1$3'
        )
      : value.replace(/[^\d.]/g, '').replace(/\./g, '');
  } else {
    return '';
  }
};

/**
 * 千分化数字字符串
 * @param {String} numberString
 * @param {*} options
 */
export const formatNumber = (numberString = '') => {
  const numberReg = /^(\d+)(\.\d+)?$/;
  const matched = numberReg.exec(numberString);

  let formatNumber = '';

  if (matched) {
    let integerString = matched[1];
    let decimalString = '';
    if (matched[2]) {
      decimalString = matched[2].substring(1);
    }

    let numberArray = [];

    for (let index = 0; index < integerString.length; index++) {
      if (index !== 0 && index % 3 === 0) {
        numberArray.push(`${integerString[integerString.length - 1 - index]},`);
      } else {
        numberArray.push(integerString[integerString.length - 1 - index]);
      }
    }

    formatNumber =
      numberArray.reverse().join('') +
      (decimalString === '' ? '' : '.' + decimalString);
  }

  return formatNumber;
};

// 千分位格式化
export const formatNum = (num, decimal) => {
  const numberString = toFixed(num, decimal);
  const numberZero = new Decimal(numberString).valueOf(); // 去除无用的0
  return formatNumber(numberZero);
};

/**
 * 两个数据百分比
 * @param {*} num
 * @param {*} total
 * @returns
 */
export const toPercent = (num, total, decimal = 2) => {
  const percent = Math.round((num / total) * 10000) / 100;
  const result = toFixed(percent, decimal);
  return result;
};

/**
 * 获取 小数
 * @param num
 * @returns
 */
export const getFragDecimal = (num) => {
  const decimals = new Decimal(num)
    .minus(Decimal.floor(num))
    .toFixed(4, Decimal.ROUND_DOWN);
  return decimals;
};

// gas add 10%
export const calculateGasMargin = (value) => {
  value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}
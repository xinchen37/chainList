/**
 * 字符串截取 省略号拼接
 * @param {String} str
 * @param {Number} start
 * @param {Number} end
 * @returns
 */
export const limitWords = (
  str, 
  start = 10,
  end = -5
) => {
  if (!str) return;
  const preText = str.slice(0, start);
  const nextText = str.slice(end);
  return `${preText}...${nextText}`;
};

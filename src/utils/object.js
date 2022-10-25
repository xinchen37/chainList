/**
 * 获取 object value
 * @param {Object} obj 
 * @param {Array} keys 
 * @returns 
 */
export const getObjVal = (obj, keys = []) => {
  let value = ''
  value = keys.reduce((prev, cur) => {
    let val = prev[cur];
    if (typeof(val) === 'undefined') return ''
    return val
  }, obj)
  return value
}

export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number 复数
 * @param {number} time 时间
 * @param {string} label 标签
 */
function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * times ago
 * @param {number} time 时间
 */
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting 格式化数字
 * like 10000 --> 10k
 * @param {number} num 数字
 * @param {number} digits 小数点后数字的个数
 */
export function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' }, // 1000 000
    { value: 1E3, symbol: 'k' } // 1000
  ]
  for (let i = 0; i < si.length; i++) {
    if (num > si[i].value) {
      // replace 正则 去末位的0
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
    return num.toString()
  }
}

/**
 * 按1000断开 10000 --> '10,000'
 * @param {number} num 数字
 */
export function toThousandFilter (num) {
  //
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {string} str 字符串
 */
export function uppercaseFirst (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatReadingTime(minutes) {
  let cups = Math.round(minutes / 5);
  let bowls = 0;
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍚')
      .join('')}可阅`;
  } else {
    return `${new Array(cups || 1).fill('☕️').join('')}可阅`;
  }
}

// `lang` is optional and will default to the current user agent locale
export function formatPostDate(date) {
  date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${formatYear(year)}年${formatNumber(month)}月${formatNumber(day)}日`
}


function formatYear(n) {
  const arr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  // 把 n 转成 二零一九 返回
  const a = parseInt(n / 1000);
  const b = parseInt((n % 1000) / 100);
  const c = parseInt((n % 100) / 10);
  const d = n % 10;

  // 拆出来的四位数字刚好和数组的索引对应
  // console.log(a, b, c, d)

  return arr[a] + arr[b] + arr[c] + arr[d];
}

function formatNumber(n) {
  const arr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  if (n <= 10) {
    // 几
    return arr[n]
  } 
  else if (n < 20) {
    // 十几
    return '十' + arr[n - 10]
  } 
  else if (n >= 20 && n % 10 === 0) {
    // 几十
    return arr[n / 10] + '十'
  } 
  else {
    // 几十几
    const a = parseInt(n / 10)
    const b = n % 10

    return arr[a] + '十' + arr[b]
  }
}
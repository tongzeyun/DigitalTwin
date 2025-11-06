/**
 * 获取时间格式 ['2024.01.09', '13:26:09']
 */
export function getDayTimeWeek () {
  const date = new Date()

  const dayNum = date.getDay();
  // 数组索引对应 0-6（注意：0 对应星期日）
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return [year + '.' + month + '.' + day, hours + ':' + minutes + ':' + seconds, weekDays[dayNum]]
}

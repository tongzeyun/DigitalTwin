// 基础工具库

/**
 * 权限检查指令
 * @param {*} el DOM元素
 * @param {*} binding 绑定值
 */
export function hasPermi(el, binding) {
  // 简单实现，实际项目中应该根据实际权限系统进行修改
  const { value } = binding
  
  // 模拟权限检查逻辑
  const hasPermission = () => {
    // 这里应该从实际的权限系统中获取用户权限
    // 这里返回 true 表示临时允许所有权限
    return true
  }
  
  if (!hasPermission()) {
    // 如果没有权限，可以隐藏元素或者添加禁用样式
    el.style.display = 'none'
  }
}

// 导出其他可能会用到的工具函数
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  // 简单的日期格式化函数
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

export const deepClone = (obj) => {
  // 简单的深拷贝函数
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  
  const clonedObj = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }
  
  return clonedObj
}

/**
 * 网络请求工具
 * @param {string} url 请求地址
 * @param {Object} options 请求配置
 * @returns {Promise} 返回Promise对象
 */
export async function request(url, options = {}) {
  try {
    // 默认配置
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // 允许携带cookie
    }
    
    // 合并配置
    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    }
    
    // 发送请求
    const response = await fetch(url, config)
    
    // 检查响应状态
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`)
    }
    
    // 尝试解析JSON响应
    const data = await response.json()
    
    // 根据项目实际的响应格式进行处理
    // 假设响应格式为 { code: 0, data: any, message: string }
    if (data.code === 0) {
      return data.data
    } else {
      throw new Error(data.message || '请求处理失败')
    }
  } catch (error) {
    console.error('网络请求错误:', error)
    // 可以在这里添加统一的错误处理逻辑
    throw error
  }
}

// 导出默认对象，支持整体导入
export default {
  hasPermi,
  formatDate,
  deepClone,
  request
}
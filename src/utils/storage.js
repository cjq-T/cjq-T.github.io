// 本地存储工具类
class Storage {
  constructor() {
    this.enabled = this.checkStorage()
  }

  // 检查localStorage是否可用
  checkStorage() {
    try {
      const testKey = '__storage_test__'
      localStorage.setItem(testKey, testKey)
      localStorage.removeItem(testKey)
      return true
    } catch (e) {
      console.warn('localStorage is not available:', e)
      return false
    }
  }

  // 获取存储数据
  get(key, defaultValue = null) {
    if (!this.enabled) return defaultValue
    
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    } catch (e) {
      console.error(`Error getting item from localStorage: ${key}`, e)
      return defaultValue
    }
  }

  // 设置存储数据
  set(key, value) {
    if (!this.enabled) return false
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      console.error(`Error setting item to localStorage: ${key}`, e)
      return false
    }
  }

  // 删除存储数据
  remove(key) {
    if (!this.enabled) return false
    
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      console.error(`Error removing item from localStorage: ${key}`, e)
      return false
    }
  }

  // 清除所有存储数据
  clear() {
    if (!this.enabled) return false
    
    try {
      localStorage.clear()
      return true
    } catch (e) {
      console.error('Error clearing localStorage', e)
      return false
    }
  }

  // 获取所有存储键
  keys() {
    if (!this.enabled) return []
    
    try {
      return Object.keys(localStorage)
    } catch (e) {
      console.error('Error getting keys from localStorage', e)
      return []
    }
  }
}

// 导出单例实例
export const storage = new Storage()
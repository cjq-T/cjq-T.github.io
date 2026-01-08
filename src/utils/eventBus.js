// src/utils/eventBus.js
import { ref, computed } from 'vue'

const events = ref({})

const eventBus = {
  // 注册事件监听器
  on(event, callback) {
    if (!events.value[event]) {
      events.value[event] = []
    }
    events.value[event].push(callback)
  },
  
  // 触发事件
  emit(event, data) {
    if (events.value[event]) {
      events.value[event].forEach(callback => {
        callback(data)
      })
    }
  },
  
  // 移除事件监听器
  off(event, callback) {
    if (events.value[event]) {
      events.value[event] = events.value[event].filter(cb => cb !== callback)
    }
  }
}

export default eventBus
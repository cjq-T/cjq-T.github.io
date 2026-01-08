// src/store/todo.js
import { ref, onMounted } from 'vue'
import { storage } from '../utils/storage'

const useTodoStore = () => {
  // 确保 tasks 初始化为数组
  const tasks = ref([])
  const STORAGE_KEY = 'todo_tasks'

  // 加载任务数据
  const loadTasks = () => {
    try {
      const savedTasks = storage.get(STORAGE_KEY)
      // 确保 savedTasks 是数组
      if (Array.isArray(savedTasks)) {
        tasks.value = savedTasks
        console.log('Tasks loaded from storage:', tasks.value.length)
      } else {
        tasks.value = []
        console.log('No tasks found in storage, initialized empty array')
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
      tasks.value = []
    }
  }

  // 保存任务数据
  const saveTasks = () => {
    try {
      storage.set(STORAGE_KEY, tasks.value)
      console.log('Tasks saved to storage:', tasks.value.length)
    } catch (error) {
      console.error('Error saving tasks:', error)
    }
  }

  // 添加任务
  const addTask = (task) => {
    try {
      const newTask = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        completed: false
      }
      // 确保 tasks.value 是数组
      if (!Array.isArray(tasks.value)) {
        tasks.value = []
      }
      // 使用展开运算符创建新数组，确保触发响应式更新
      tasks.value = [newTask, ...tasks.value]
      saveTasks()
      console.log('Task added:', newTask)
      console.log('Current tasks length:', tasks.value.length)
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // 更新任务
  const updateTask = (updatedTask) => {
    try {
      // 确保 tasks.value 是数组
      if (!Array.isArray(tasks.value)) {
        tasks.value = []
        return
      }
      const index = tasks.value.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        // 使用展开运算符创建新数组，确保触发响应式更新
        const newTasks = [...tasks.value]
        newTasks[index] = { ...newTasks[index], ...updatedTask }
        tasks.value = newTasks
        saveTasks()
        console.log('Task updated:', updatedTask.id)
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  // 删除任务
  const deleteTask = (taskId) => {
    try {
      // 确保 tasks.value 是数组
      if (!Array.isArray(tasks.value)) {
        tasks.value = []
        return
      }
      // 使用 filter 创建新数组，确保触发响应式更新
      tasks.value = tasks.value.filter(task => task.id !== taskId)
      saveTasks()
      console.log('Task deleted:', taskId)
      console.log('Current tasks length:', tasks.value.length)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // 统计信息
  const getStats = () => {
    try {
      // 确保 tasks.value 是数组
      if (!Array.isArray(tasks.value)) {
        tasks.value = []
      }
      const total = tasks.value.length
      const completed = tasks.value.filter(task => task.completed).length
      const pending = total - completed
      
      // 按分类统计
      const byCategory = tasks.value.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1
        return acc
      }, {})
      
      // 按优先级统计
      const byPriority = tasks.value.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1
        return acc
      }, {})
      
      return {
        total,
        completed,
        pending,
        byCategory,
        byPriority
      }
    } catch (error) {
      console.error('Error getting stats:', error)
      return {
        total: 0,
        completed: 0,
        pending: 0,
        byCategory: {},
        byPriority: {}
      }
    }
  }

  // 初始化时加载数据
  onMounted(() => {
    loadTasks()
  })

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getStats
  }
}

export { useTodoStore }
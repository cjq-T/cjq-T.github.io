<template>
  <div class="todo-list">
    <h2>任务清单</h2>
    <TodoFilter 
      :filters="filters" 
      @filter-change="handleFilterChange"
    />
    <div class="task-container">
      <TodoItem 
        v-for="task in displayTasks" 
        :key="task.id" 
        :task="task"
        @update="handleTaskUpdate"
        @delete="handleTaskDelete"
      />
      <div v-if="displayTasks.length === 0" class="empty-state">
        暂无任务
      </div>
    </div>
    <div class="stats">
      <p>总任务数: {{ tasks.length }}</p>
      <p>已完成: {{ completedCount }}</p>
      <p>未完成: {{ pendingCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TodoItem from './TodoItem.vue'
import TodoFilter from './TodoFilter.vue'
import { useTodoStore } from '../store/todo'
import eventBus from '../utils/eventBus'

const todoStore = useTodoStore()

const filters = ref({
  category: 'all',
  priority: 'all',
  status: 'all'
})

// 本地任务数组
const tasks = ref([])

// 从存储直接加载任务
const loadTasksFromStorage = () => {
  try {
    // 直接从 localStorage 加载任务
    const savedTasks = localStorage.getItem('todo_tasks')
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks)
      if (Array.isArray(parsedTasks)) {
        tasks.value = [...parsedTasks]
        console.log('Tasks loaded from localStorage:', tasks.value.length)
      } else {
        tasks.value = []
        console.log('Invalid tasks data in localStorage')
      }
    } else {
      tasks.value = []
      console.log('No tasks found in localStorage')
    }
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error)
    tasks.value = []
  }
}

// 组件挂载时加载任务
onMounted(() => {
  loadTasksFromStorage()
  
  // 注册任务添加事件
  eventBus.on('taskAdded', () => {
    console.log('Task added event received, reloading tasks from storage')
    loadTasksFromStorage()
  })
  
  // 注册任务更新事件
  eventBus.on('taskUpdated', () => {
    console.log('Task updated event received, reloading tasks from storage')
    loadTasksFromStorage()
  })
  
  // 注册任务删除事件
  eventBus.on('taskDeleted', () => {
    console.log('Task deleted event received, reloading tasks from storage')
    loadTasksFromStorage()
  })
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  // 移除事件监听器
  eventBus.off('taskAdded')
  eventBus.off('taskUpdated')
  eventBus.off('taskDeleted')
})

// 过滤任务
const displayTasks = computed(() => {
  return tasks.value.filter(task => {
    if (!task || typeof task !== 'object') return false
    
    const categoryMatch = filters.value.category === 'all' || task.category === filters.value.category
    const priorityMatch = filters.value.priority === 'all' || task.priority === filters.value.priority
    const statusMatch = filters.value.status === 'all' || 
      (filters.value.status === 'completed' && task.completed) || 
      (filters.value.status === 'pending' && !task.completed)
    
    return categoryMatch && priorityMatch && statusMatch
  })
})

// 计算任务统计
const completedCount = computed(() => {
  return tasks.value.filter(task => task && task.completed).length
})

const pendingCount = computed(() => {
  return tasks.value.filter(task => task && !task.completed).length
})

// 处理筛选变化
const handleFilterChange = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters }
}

// 处理任务更新
const handleTaskUpdate = (updatedTask) => {
  try {
    todoStore.updateTask(updatedTask)
    eventBus.emit('taskUpdated', updatedTask)
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

// 处理任务删除
const handleTaskDelete = (taskId) => {
  try {
    todoStore.deleteTask(taskId)
    eventBus.emit('taskDeleted', taskId)
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}
</script>

<style scoped>
.todo-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.todo-list h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.task-container {
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #888;
  font-size: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 2px dashed #e0e0e0;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.stats p {
  margin: 0;
  font-weight: 500;
  color: #495057;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .todo-list {
    padding: 16px;
  }
  
  .stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
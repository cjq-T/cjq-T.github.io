<template>
  <div class="todo-item" :class="{ 'completed': task.completed }">
    <div class="task-header">
      <input 
        type="checkbox" 
        :checked="task.completed" 
        @change="toggleComplete"
        class="status-checkbox"
      />
      <div class="task-info">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>
      <div class="priority" :class="task.priority">
        {{ getPriorityText(task.priority) }}
      </div>
    </div>
    <div class="task-meta">
      <span class="category">{{ task.category }}</span>
      <span class="due-date">{{ formatDate(task.dueDate) }}</span>
      <div class="actions">
        <button @click="emit('update', { ...task, isEditing: true })" class="btn-edit">
          编辑
        </button>
        <button @click="handleDelete" class="btn-delete">
          删除
        </button>
      </div>
    </div>
    <TodoEdit 
      v-if="task.isEditing" 
      :task="task" 
      @save="handleSave" 
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TodoEdit from './TodoEdit.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'delete'])

const getPriorityText = (priority) => {
  const priorityMap = {
    high: '高',
    medium: '中',
    low: '低'
  }
  return priorityMap[priority] || '中'
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN')
}

const toggleComplete = () => {
  emit('update', {
    ...props.task,
    completed: !props.task.completed
  })
}

const handleDelete = () => {
  emit('delete', props.task.id)
}

const handleSave = (updatedTask) => {
  emit('update', { ...updatedTask, isEditing: false })
}

const handleCancel = () => {
  emit('update', { ...props.task, isEditing: false })
}
</script>

<style scoped>
.todo-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  background-color: #f0f9f0;
  opacity: 0.8;
}

.task-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.status-checkbox {
  margin-top: 4px;
}

.task-info {
  flex: 1;
}

.task-info h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
}

.task-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.priority {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.priority.high {
  background-color: #ffebee;
  color: #c62828;
}

.priority.medium {
  background-color: #fff3e0;
  color: #ef6c00;
}

.priority.low {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
}

.category {
  background-color: #e3f2fd;
  padding: 2px 8px;
  border-radius: 10px;
  color: #1565c0;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-edit {
  background-color: #e3f2fd;
  color: #1565c0;
}

.btn-delete {
  background-color: #ffebee;
  color: #c62828;
}
</style>
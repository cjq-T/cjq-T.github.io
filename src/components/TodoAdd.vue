<template>
  <div class="todo-add">
    <h2>添加新任务</h2>
    <form @submit.prevent="handleAddTask">
      <div class="form-group">
        <label for="title">标题</label>
        <input 
          type="text" 
          id="title" 
          v-model="newTask.title" 
          required
          placeholder="输入任务标题"
        />
      </div>
      <div class="form-group">
        <label for="description">描述</label>
        <textarea 
          id="description" 
          v-model="newTask.description"
          rows="3"
          placeholder="输入任务描述"
        ></textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="category">分类</label>
          <select 
            id="category" 
            v-model="newTask.category"
          >
            <option value="work">工作</option>
            <option value="life">生活</option>
            <option value="study">学习</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label for="priority">优先级</label>
          <select 
            id="priority" 
            v-model="newTask.priority"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>
        <div class="form-group">
          <label for="dueDate">截止日期</label>
          <input 
            type="date" 
            id="dueDate" 
            v-model="newTask.dueDate"
          />
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-add">添加任务</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../store/todo'
import eventBus from '../utils/eventBus'

const todoStore = useTodoStore()

const newTask = ref({
  title: '',
  description: '',
  category: 'work',
  priority: 'medium',
  dueDate: '',
  completed: false
})

const handleAddTask = () => {
  try {
    console.log('Adding task:', newTask.value)
    
    // 创建新任务对象
    const taskToAdd = {
      ...newTask.value,
      completed: false
    }
    
    // 添加任务到 store
    todoStore.addTask(taskToAdd)
    
    // 触发任务添加事件
    eventBus.emit('taskAdded', taskToAdd)
    
    // 重置表单
    newTask.value = {
      title: '',
      description: '',
      category: 'work',
      priority: 'medium',
      dueDate: '',
      completed: false
    }
    
    console.log('Task added successfully')
  } catch (error) {
    console.error('Error adding task:', error)
  }
}
</script>

<style scoped>
.todo-add {
  max-width: 800px;
  margin: 0 auto 24px;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.todo-add h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.todo-add form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
}

input, textarea, select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  background-color: #fff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-add {
  padding: 12px 24px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add:hover {
  background-color: #1976d2;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.btn-add:active {
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .todo-add {
    padding: 16px;
  }
  
  .form-row {
    flex-direction: column;
  }
}
</style>
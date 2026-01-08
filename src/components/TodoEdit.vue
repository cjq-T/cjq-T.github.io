<template>
  <div class="todo-edit">
    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label for="title">标题</label>
        <input 
          type="text" 
          id="title" 
          v-model="editedTask.title" 
          required
        />
      </div>
      <div class="form-group">
        <label for="description">描述</label>
        <textarea 
          id="description" 
          v-model="editedTask.description"
          rows="3"
        ></textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="category">分类</label>
          <select 
            id="category" 
            v-model="editedTask.category"
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
            v-model="editedTask.priority"
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
            v-model="editedTask.dueDate"
          />
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">保存</button>
        <button type="button" @click="handleCancel" class="btn-cancel">取消</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel'])

const editedTask = ref({ ...props.task })

const handleSave = () => {
  emit('save', editedTask.value)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.todo-edit {
  margin-top: 12px;
  padding: 16px;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-row {
  display: flex;
  gap: 12px;
}

.form-row .form-group {
  flex: 1;
}

label {
  font-size: 12px;
  font-weight: bold;
  color: #666;
}

input, textarea, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.btn-save, .btn-cancel {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-save {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
}
</style>
<template>
  <div class="todo-filter">
    <h3>筛选条件</h3>
    <div class="filter-row">
      <div class="filter-group">
        <label>分类:</label>
        <div class="filter-options">
          <button 
            v-for="category in categories" 
            :key="category.value"
            @click="updateFilter('category', category.value)"
            :class="{ active: filters.category === category.value }"
          >
            {{ category.label }}
          </button>
        </div>
      </div>
      <div class="filter-group">
        <label>优先级:</label>
        <div class="filter-options">
          <button 
            v-for="priority in priorities" 
            :key="priority.value"
            @click="updateFilter('priority', priority.value)"
            :class="{ active: filters.priority === priority.value }"
          >
            {{ priority.label }}
          </button>
        </div>
      </div>
      <div class="filter-group">
        <label>状态:</label>
        <div class="filter-options">
          <button 
            v-for="status in statuses" 
            :key="status.value"
            @click="updateFilter('status', status.value)"
            :class="{ active: filters.status === status.value }"
          >
            {{ status.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['filter-change'])

const categories = ref([
  { value: 'all', label: '全部' },
  { value: 'work', label: '工作' },
  { value: 'life', label: '生活' },
  { value: 'study', label: '学习' },
  { value: 'other', label: '其他' }
])

const priorities = ref([
  { value: 'all', label: '全部' },
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' }
])

const statuses = ref([
  { value: 'all', label: '全部' },
  { value: 'pending', label: '未完成' },
  { value: 'completed', label: '已完成' }
])

const updateFilter = (filterType, value) => {
  console.log('Update filter:', filterType, value)
  emit('filter-change', { [filterType]: value })
}
</script>

<style scoped>
.todo-filter {
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
}

.filter-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group label {
  font-size: 12px;
  font-weight: bold;
  color: #888;
}

.filter-options {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.filter-options button {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 16px;
  background-color: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.filter-options button:hover {
  border-color: #2196f3;
}

.filter-options button.active {
  background-color: #2196f3;
  color: white;
  border-color: #2196f3;
}
</style>
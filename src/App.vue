<template>
  <div id="app">
    <header>
      <h1>待办任务清单</h1>
    </header>
    <main class="container">
      <TodoAdd />
      <TodoList />
    </main>
  </div>
</template>

<script setup>
import TodoAdd from './components/TodoAdd.vue'
import TodoList from './components/TodoList.vue'
</script>

<style>
/* 可以在此添加额外的全局样式 */
</style>
<script setup>
import Task from "@/components/Task.vue";
import { useAllTasksStore } from  '@/stores/allTasks.js'
import { onMounted } from "vue";

const allTasksStore = useAllTasksStore()
onMounted(() => {
  allTasksStore.getUsersData()
})

</script>

<template>
  <div class="container">
    <h2>Всего активных задач: {{ allTasksStore.activeTasks }}</h2>
    <Task class="tasks" v-for="task in allTasksStore.allTasks" :key="task.id" :task="task" />
  </div>
</template>
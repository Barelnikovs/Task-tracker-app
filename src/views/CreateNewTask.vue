<script setup>
import FormOfNewTask from "@/components/FormOfNewTask.vue";
</script>

<template>
  <div class="container">
    <h2>Создать новую задачу</h2>
    <FormOfNewTask />
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 30px auto;
  background-color: white;
  border-radius: 15px;
  padding: 15px;
  h2 {
    margin-bottom: 10px;
    color: black;
    font-size: 30px;
  }
}
</style>
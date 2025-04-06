<script setup>
import { useAllTasksStore } from "@/stores/allTasks.js";
import { storeToRefs } from "pinia";
import VButton from "@/components/VButton.vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const allTasksStore = useAllTasksStore()
const { newTask } = storeToRefs(allTasksStore);


const submitHandler = () => {
  allTasksStore.addTask();
  router.push('/tasks');
}
</script>

<template>
  <img src="" alt="">
  <form class="form-container" @submit.prevent="submitHandler">

    <label for="name">Название</label>
    <input id="name" v-model.trim="newTask.title" type="text" />

    <label for="deadline">Дата дэдлайна</label>
    <input id="deadline" type="date" v-model="newTask.deadline" />

    <label for="description">Описание</label>
    <textarea id="description" v-model.trim="newTask.description" />

    <VButton :style="allTasksStore.formButtonIsOff ? 'secondary' : 'primary'"
             text-content="Создать"
             :disabled="allTasksStore.formButtonIsOff"
    />

  </form>
</template>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  input, textarea {
    width: 100%;
    margin-bottom: 10px;
    font-size: 20px;
  }
  input {
    height: 32px;
  }
  textarea {
    height: 64px;
    resize: none;
  }
}
</style>
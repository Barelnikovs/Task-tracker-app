<script setup>
import VButton from "@/components/VButton.vue";
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="container">
    <h2>Страница не найдена 😢</h2>
    <p>Похоже, такой страницы не существует.</p>
    <VButton :style="'primary'" text-content="Вернуться обратно" @click="router.push('/tasks')"/>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 15px auto;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2, p {
    color: black;
    margin: 5px;
  }
  button {
    margin: 5px;
  }
}
</style>
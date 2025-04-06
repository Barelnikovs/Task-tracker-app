<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="header">
    <div class="logo">
      <p class="logo__text">Freelance</p>
    </div>
    <div class="nav">
      <router-link to="/tasks" class="nav__item">Все задачи</router-link>
      <router-link to="/create-task" class="nav__item">Создать</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    &__text {
      font-size: 30px;
    }
  }
  .nav {
    display: flex;
    align-items: center;
    &__item {
      font-size: 20px;
      padding: 0 7px;
      color: #000;
      text-decoration: none;
      &.active {
        text-decoration: underline;
        text-decoration-thickness: 3px; /* Толщина */
        text-decoration-color: rgba(12, 136, 37, 0.7);
        text-underline-offset: 4px;
      }
    }
  }
}
</style>
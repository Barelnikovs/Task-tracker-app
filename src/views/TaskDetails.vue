<script setup>
import Status from "@/components/Status.vue";
import VButton from "@/components/VButton.vue";
import { useRoute, useRouter } from 'vue-router'
import { useAllTasksStore } from '@/stores/allTasks.js'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const allTasksStore = useAllTasksStore()
const { updateTaskStatus } = allTasksStore

const viewedTask = computed(() => {
  return allTasksStore.allTasks.find(task => task.id === route.params.taskId)
})
const deadlineToDDMMYYYY = computed(() => {
  return viewedTask.value.deadline ? viewedTask.value.deadline.split('-').reverse().join('.') : '';
})
</script>

<template>
  <div class="container">

    <div class="task" v-if="viewedTask">

      <h2>{{ viewedTask.title }}</h2>
      <hr>
      <div class="status">
        <span>Статус:</span><Status :status="viewedTask.status" />
      </div>
      <div class="deadline">
        <span>Дэдлайн: {{ deadlineToDDMMYYYY }}</span>
      </div>
      <div class="description">
        <span>Описание: {{ viewedTask.description }}</span>
      </div>
      <div class="buttons">
        <VButton
            :style="'default'"
            textContent="Взять в работу"
            @click="updateTaskStatus(viewedTask.id, 'in-process')">
        </VButton>
        <VButton
            :style="'primary'"
            textContent="Завершить"
            @click="updateTaskStatus(viewedTask.id, 'done')">
        </VButton>
        <VButton
            :style="'danger'"
            textContent="Отменить"
            @click="updateTaskStatus(viewedTask.id, 'cancelled')">
        </VButton>

      </div>

    </div>
    <div class="taskNotfound" v-else>
      <h2>Страница не найдена 😢</h2>
      <p>Похоже, такой страницы не существует.</p>
      <VButton :style="'primary'" text-content="Вернуться обратно" @click="router.push('/tasks')"/>
    </div>

  </div>
</template>

<style scoped lang="scss">
.task {
  background-color: white;
  padding: 15px 15px 5px;
  margin-top: 15px;
  border-radius: 10px;
  h2 {
    color: black;
    font-size: 30px;
    margin-bottom: 5px;
  }
  div {
    margin: 15px 0;
  }
  .status, .deadline, .description {
    display: flex;
  }
  .status span {
    margin-right: 10px;
  }
  .buttons button {
    margin-right: 10px;
  }
}
.taskNotfound {
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
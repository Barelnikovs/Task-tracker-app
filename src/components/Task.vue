<script setup>
import { toRefs, computed } from 'vue'
import { RouterLink } from 'vue-router'
import VButton from "@/components/VButton.vue";
import Status from "@/components/Status.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator: (value) => {
      if (typeof value === 'object' || value !== null) {
        const allowedKeys = ['id', 'title', 'status', 'deadline', 'description']
        return Object.keys(value).every(key => allowedKeys.includes(key))
      } else {
        return false
      }
    }
  }
})
const { id, title, status, deadline } = toRefs(props.task);

const deadlineToDDMMYYYY = computed(() => {
  return deadline.value ? deadline.value.split('-').reverse().join('.') : '';
})
</script>

<template>
  <div class="task">

    <div class="task__top-part">
      <p class="task__title">{{ title }}</p>
      <Status :status="status"/>
    </div>
    <hr>
    <div class="task__bottom-part">
      <p class="task__deadline">{{ deadlineToDDMMYYYY }}</p>
      <router-link :to="`/tasks/${id}`" custom #="{ navigate }">
        <VButton :style="'primary'" text-content="Посмотреть" @click="navigate"/>
      </router-link>
    </div>

  </div>
</template>

<style scoped lang="scss">
.task {
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
  &__top-part {
    padding: 5px 15px;
    height: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  &__title {
    font-size: 24px;
  }
  &__bottom-part {
    padding: 15px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__deadline {
    font-size: 14px;
    padding: 5px 0;
    margin-bottom: 10px;
  }
}
</style>
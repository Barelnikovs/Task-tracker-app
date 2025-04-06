<script setup>
import { computed } from "vue";

const props = defineProps({
  status: {
    type: String,
    default: 'active',
    validator(value) {
      return ['active', 'cancelled', 'in-process', 'done'].includes(value);
    }
  }
})
const textContent = computed(() => {
  switch (props.status) {
    case 'active':
      return 'Активно';
    case 'cancelled':
      return 'Отменено';
    case 'in-process':
      return 'Выполняется'
    case 'done':
      return 'Завершено'
  }
});
</script>

<template>
  <p :class="['task__status', status]" >{{ textContent }}</p>
</template>

<style scoped lang="scss">
.task__status {
  border-radius: 12px;
  padding: 0 8px;
  font-size: 14px;
  cursor: default;
  &.active, &.done {
    border: 1px solid #0c8825;
    color: #0c8825;
  }
  &.cancelled {
    border: 1px solid #dc3545;
    color: #dc3545;
  }
  &.in-process {
    border: 1px solid #e15e01;
    color: #e15e01;
  }
}
</style>
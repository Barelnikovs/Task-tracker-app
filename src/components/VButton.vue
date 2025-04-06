<script setup>
const props = defineProps({
  textContent: String,
  disabled: {
    type: Boolean,
    default: false
  },
  style: {
    type: String,
    default: 'default',
    validator(value) {
      return ['primary', 'secondary', 'danger', 'default'].includes(value)
    }
  }
})
const emit = defineEmits(['click'])
</script>

<template>
  <button :class="['btn', style]" @click="emit('click')" :disabled="disabled">{{ textContent }}</button>
</template>

<style scoped lang="scss">
</style>
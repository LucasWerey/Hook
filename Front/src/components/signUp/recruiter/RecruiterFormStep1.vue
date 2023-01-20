<template>
  <div>PH1</div>
  <button @click="handleSubmit">Next</button>
</template>

<script setup lang="ts">
const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit')
}
</script>

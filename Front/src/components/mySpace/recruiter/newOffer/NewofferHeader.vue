<template>
  <div
    class="flex h-10 w-full flex-row items-center justify-between border-b border-b-basic-lightgrey px-4 py-2"
  >
    <h3 class="font-eina1 text-4 font-bold">Déposer une nouvelle offre</h3>
    <IconsBase
      name="close"
      color="darkgrey"
      class="h-6 w-6 cursor-pointer"
      @click="emit('closeModal')"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['closeModal'])
</script>

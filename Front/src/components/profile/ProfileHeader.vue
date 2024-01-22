<template>
  <div class="flex w-full items-center justify-between align-middle">
    <h1 class="text-8 font-800 text-basic-black">{{ title }}</h1>
    <div class="flex cursor-pointer items-center gap-4 px-2">
      <IconsBase name="eye" class="h-6 w-6 text-basic-black" />
      <span class="text-3 font-700 uppercase text-primary-moonstone">prévisualiser mon profil</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    required: true,
    type: String
  }
})

const title = computed(() => props.title)
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-8 text-primary-powder">Description de l'offre</h2>
    <p class="DS-text-body font-eina1">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  offerData: {
    required: true,
    type: Object
  }
})

const offerData = computed(() => props.offerData)
const description = computed(() => offerData.value.details.description)
</script>

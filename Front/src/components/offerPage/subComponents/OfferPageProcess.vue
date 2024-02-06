<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-8 text-primary-powder">Processus de recrutement</h2>
    <ul class="DS-text-body list-inside list-decimal whitespace-pre-line font-eina1">
      <li v-for="(process, index) in processArray" :key="index" class="DS-text-body font-eina1">
        {{ process }}
      </li>
    </ul>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
const props = defineProps({
  offerData: {
    required: true,
    type: Object
  }
})
// @ts-ignore
const offerData = computed(() => props.offerData)
const processArray = [
  'Premier contact via la plateforme Hook',
  'Step 1: Entretien RH de 10min',
  'Step 2: Entretien de motivation avec notre manager Octave',
  'Step 3: Entretien final avec notre CEO'
]
</script>

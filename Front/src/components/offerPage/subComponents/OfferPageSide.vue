<template>
  <div class="flex h-[450px] w-80 flex-col gap-12 rounded-2xl border border-basic-grey p-6">
    <div class="flex w-full flex-col items-center gap-2 text-center">
      <p class="DS-text-body font-eina1 text-basic-darkgrey">Vous avez</p>
      <p class="font-eina1 text-24 font-700 text-success">92%</p>
      <p class="DS-text-body font-eina1 text-basic-darkgrey">
        de compatibilité avec cette entreprise.
      </p>
    </div>
    <div class="flex w-full flex-col gap-4">
      <h3 class="DS-text-preTitle font-eina1 uppercase">détail de la compatibilité</h3>
      <div class="flex flex-col gap-2">
        <div
          class="flex w-full flex-col gap-2"
          v-for="(bar, index) in progressBarData"
          :key="index"
        >
          <div
            class="DS-text-body-bold flex items-center justify-between gap-2 font-eina1 text-primary-moonstone"
          >
            <h4>{{ bar.label }}</h4>
            <span>{{ bar.value + '%' }}</span>
          </div>
          <div class="h-2 w-full rounded bg-primary-lightmoonstone">
            <div class="h-full rounded bg-primary-moonstone" :style="{ width: bar.value + '%' }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
// @ts-nocheck
const props = defineProps({
  offerData: {
    required: true,
    type: Object
  }
})

const progressBarData = [
  { label: 'Personnalité', value: 12 },
  { label: 'Compétence', value: 50 },
  { label: 'Expérience', value: 75 }
]
</script>

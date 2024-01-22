<template>
  <h4 class="font-eina1 text-2 font-700 uppercase">
    Taux de compatibilité<span class="text-error">*</span>
  </h4>
  <div class="flex w-full items-baseline gap-14">
    <div class="relative w-1/2">
      <input
        type="range"
        v-model="value"
        :min="min"
        :max="max"
        @input="updateValue(($event?.target as HTMLInputElement)?.value)"
        class="slider-thumb h-1 w-full appearance-none rounded-lg outline-none"
        :style="`background: linear-gradient(90deg, #58A4B0 0%, #58A4B0 ${((value - min) / (max - min)) * 100}%, #CDCDCD ${((value - min) / (max - min)) * 100}%, #CDCDCD 100%);`"
      />
      <div
        :class="valueLabelClass"
        class="absolute flex h-2 items-center justify-end font-eina1 text-2 font-700 text-primary-moonstone"
        :style="{ width: ((value - min) / (max - min)) * 100 + '%' }"
      >
        {{ value }}%
      </div>
    </div>
    <div class="w-1/2 text-end font-eina1 text-2 font-normal">
      <p>
        Compatibilité minimale des profils suggérés :
        <span class="font-eina1 text-3 font-700 text-success">{{ value }}%</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const min = 0
const max = 100
const value = ref(0)
const emit = defineEmits(['update:value'])

const updateValue = (newValue: string) => {
  value.value = Number(newValue)
  emit('update:value', value.value)
}

const valueLabelClass = computed(() => {
  if (value.value >= 0 && value.value < 10) {
    return 'left-5 -top-1'
  } else if (value.value >= 10 && value.value < 80) {
    return 'left-4 -top-1'
  } else if (value.value >= 80 && value.value <= 100) {
    return 'left-2 -top-1'
  }
  return ''
})
</script>

<style scoped>
.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #ffffff;
  border: 2px solid #58a4b0;
  border-radius: 50%;
  cursor: pointer;
}
.slider-thumb::-moz-range-thumb {
  width: 215x;
  height: 15px;
  background: #ffffff;
  border: 2px solid #58a4b0;
  border-radius: 50%;
  cursor: pointer;
}
</style>

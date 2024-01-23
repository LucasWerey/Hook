<template>
  <div class="flex flex-col gap-2 rounded bg-basic-white p-4">
    <p class="font-eina1 text-4 font-normal text-primary-moonstone">
      {{ text }}
    </p>
    <Button
      :type="'default'"
      :icon="'none'"
      :state="'active'"
      :iconPosition="'none'"
      :styled="'outlined'"
      :isLight="true"
      class="w-full overflow-hidden text-nowrap border-primary-moonstone bg-primary-lightmoonstone uppercase text-primary-moonstone"
    >
      {{ buttonText }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  buttonText: String,
  text: String
})

const text = computed(() => props.text)
const buttonText = computed(() => props.buttonText)
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-8 text-primary-powder">Avantages</h2>
    <ul class="DS-text-body list-inside list-disc whitespace-pre-line font-eina1">
      <li v-for="(benefit, index) in benefitsArray" :key="index" class="DS-text-body font-eina1">
        {{ benefit }}
      </li>
    </ul>
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
const benefits = computed(() => offerData.value.details.benefits)
const benefitsArray = computed(() => benefits.value.split('\n'))
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-8 text-primary-powder">Missions</h2>
    <ul class="DS-text-body list-inside list-disc whitespace-pre-line font-eina1">
      <li v-for="(mission, index) in missionsArray" :key="index" class="DS-text-body font-eina1">
        {{ mission }}
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
const missions = computed(() => offerData.value.details.tasks)
const missionsArray = computed(() => missions.value.split('\n'))
</script>

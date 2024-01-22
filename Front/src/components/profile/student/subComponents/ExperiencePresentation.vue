<!-- ExperienceCard.vue -->
<template>
  <div class="flex w-full flex-col gap-1">
    <div class="flex w-full justify-between">
      <p class="font-eina1 text-3 font-bold">{{ dataInfo.jobName }}</p>
      <div>
        <IconsBase name="pencil" class="h-5 w-5" color="grey" />
        <IconsBase name="trash" class="h-5 w-5" color="grey" />
      </div>
    </div>
    <p class="font-eina1 text-4">{{ dataInfo.companyName }}</p>
    <p class="font-eina1 text-4 font-normal italic text-basic-darkgrey">
      {{ formattedStartDate }} - {{ formattedEndDate }} ({{ duration }} mois)
    </p>
    <p class="font-eina1 text-4 text-primary-powder">{{ dataInfo.location }}</p>
    <p class="font-eina1 text-4 font-normal">{{ dataInfo.description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataInfo: {
    required: true,
    type: Object
  },
  duration: {
    required: true,
    type: Number
  },
  formattedEndDate: {
    required: true,
    type: String
  },
  formattedStartDate: {
    required: true,
    type: String
  }
})

const dataInfo = computed(() => props.dataInfo)
const formattedStartDate = computed(() => props.formattedStartDate)
const formattedEndDate = computed(() => props.formattedEndDate)
const duration = computed(() => props.duration)
</script>

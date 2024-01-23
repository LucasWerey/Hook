<template>
  <div class="flex w-full flex-col gap-1">
    <div class="flex w-full justify-between">
      <p class="font-eina1 text-3 font-bold">{{ jobTitle }}</p>
      <div>
        <IconsBase name="pencil" class="h-5 w-5" color="grey" />
        <IconsBase name="trash" class="h-5 w-5" color="grey" />
      </div>
    </div>
    <p class="font-eina1 text-4">{{ company }}</p>
    <p class="font-eina1 text-4 font-normal italic text-basic-darkgrey">
      {{ formattedStartDate }} - {{ formattedEndDate }} ({{ duration }} mois)
    </p>
    <p class="font-eina1 text-4 text-primary-powder">{{ location }}</p>
    <p class="font-eina1 text-4 font-normal">{{ description }}</p>
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

const jobTitle = computed(() => dataInfo.value.jobTitle)
const company = computed(() => dataInfo.value.company)
const location = computed(() => dataInfo.value.location)
const description = computed(() => dataInfo.value.description)
</script>

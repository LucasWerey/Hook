<template>
  <div class="flex w-full flex-col gap-1">
    <div class="flex w-full justify-between">
      <p class="font-eina1 text-3 font-bold">{{ school }}</p>
      <div>
        <IconsBase name="pencil" class="h-5 w-5" color="grey" />
        <IconsBase name="trash" class="h-5 w-5" color="grey" />
      </div>
    </div>
    <p class="font-eina1 text-4">{{ name }}</p>
    <p class="font-eina1 text-4 font-normal italic text-basic-darkgrey">
      {{ formattedStartDate }} - {{ formattedEndDate }} ({{ duration }} mois)
    </p>
    <p class="font-eina1 text-4 font-normal">{{ description }}</p>
    <p class="font-eina1 text-4 text-primary-moonstone">{{ result }}</p>
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
const name = computed(() => props.dataInfo.name)
const school = computed(() => props.dataInfo.university)
const description = computed(() => props.dataInfo.description)
const result = computed(() => props.dataInfo.result)
console.log(dataInfo.value)
</script>

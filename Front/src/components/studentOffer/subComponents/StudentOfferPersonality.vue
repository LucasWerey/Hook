<template>
  <div class="flex w-full flex-col gap-6" v-if="personalityDetails">
    <div class="flex items-center gap-2">
      <IconsBase name="personStanding" color="powder" class="h-6 w-6" />
      <h2 class="text-center text-8 text-primary-powder">Ma personnalité</h2>
    </div>
    <div class="flex gap-6">
      <NerisSvg :name="personalityDetails.name" />
      <div class="flex max-w-[660px] flex-col gap-2">
        <pre class="whitespace-pre-line font-eina1 text-4 font-bold">{{
          personalityDetails.name
        }}</pre>
        <pre class="whitespace-pre-line font-eina1 text-4 italic text-primary-moonstone">{{
          personalityDetails.subName
        }}</pre>
        <pre class="whitespace-pre-line font-eina1 text-4">{{ personalityDetails.desc }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataStudent: { required: true, type: Object }
})

import NerisSvg from '../../../assets/svg/NerisSvg.vue'

const dataStudent = computed(() => props.dataStudent)
const personality = computed(() => dataStudent.value?.profile?.personality)

const personalityDetails = computed(() => {
  return nerisDesc.find(p => p.name.toLocaleLowerCase() === personality.value)
})
</script>

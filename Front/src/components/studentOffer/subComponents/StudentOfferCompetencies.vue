<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <IconsBase name="brain" color="powder" class="h-6 w-6" />
      <h2 class="text-center text-8 text-primary-powder">Compétences</h2>
    </div>
    <div class="grid w-full grid-cols-2">
      <div class="col-span-1 flex w-2/3 flex-col gap-1">
        <h3 class="font-eina1 text-4 font-bold">Hard skills</h3>
        <div v-for="(hardSkill, index) in hardSkills" :key="index">
          <ul class="list-inside list-disc">
            <li class="whitespace-pre-line font-eina1 text-4">{{ hardSkill }}</li>
          </ul>
        </div>
      </div>
      <div class="col-span-1 flex w-2/3 flex-col gap-1">
        <h3 class="font-eina1 text-4 font-bold">Soft skills</h3>
        <div v-for="(softSkill, index) in softSkills" :key="index">
          <ul class="list-inside list-disc whitespace-pre-line">
            <li class="whitespace-pre-line font-eina1 text-4">{{ softSkill }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataStudent: { required: true, type: Object }
})

const dataStudent = computed(() => props.dataStudent)
const softSkills = computed(() => dataStudent.value?.profile.softSkills)
const hardSkills = computed(() => dataStudent.value?.profile.hardSkills)
</script>

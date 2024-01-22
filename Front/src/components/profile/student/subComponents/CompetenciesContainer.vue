<template>
  <div class="flex min-h-64 w-full flex-col gap-6 rounded-xl bg-basic-white p-6">
    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex w-full items-center gap-2">
        <IconsBase name="brain" class="h-6 w-6" color="powder" />
        <h2 class="text-8 font-500 text-primary-powder">Mes compétences</h2>
      </div>
      <div class="flex items-center gap-4">
        <IconsBase name="plus" class="h-6 w-6" color="powder" />
        <IconsBase name="pencil" class="h-6 w-6" color="powder" />
      </div>
    </div>
    <p class="font-eina1 text-4 font-normal text-basic-darkgrey">
      Hard skills : Compétences spécialisées techniques ou académiques acquises au cours de votre
      formation et de vos expériences professionnelles.
    </p>
    <p class="font-eina1 text-4 font-normal text-basic-darkgrey">
      Soft skills : Compétences sociales et comportementales, telles que la communication et la
      collaboration, qui enrichissent votre approche professionnelle et personnelle.
    </p>
    <div class="flex w-full flex-row gap-4">
      <div class="flex w-1/2 flex-col gap-1">
        <h4 class="font-eina1 text-4 font-bold text-primary-moonstone">Hard skills</h4>
        <ul class="ml-1">
          <li v-for="skill in dataInfo.hardskills" :key="skill.id" class="flex items-center gap-3">
            <div class="h-[6px] w-[6px] rounded-full bg-basic-black" />

            <p class="font-eina1 text-4 font-normal">{{ skill }}</p>
          </li>
        </ul>
      </div>
      <div class="gap1 flex w-1/2 flex-col">
        <h4 class="font-eina1 text-4 font-bold text-primary-moonstone">Soft skills</h4>
        <ul class="ml-1">
          <li v-for="skill in dataInfo.softskills" :key="skill.id" class="flex items-center gap-3">
            <div class="h-[6px] w-[6px] rounded-full bg-basic-black" />
            <p class="font-eina1 text-4 font-normal">{{ skill }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()

const dataInfo = reactive({
  hardskills: studentStore.students[0].profile.hardSkills,
  softskills: studentStore.students[0].profile.softSkills
})
</script>

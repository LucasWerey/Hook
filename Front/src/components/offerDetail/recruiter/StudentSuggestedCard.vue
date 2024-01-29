<template>
  <div
    class="flex min-h-40 min-w-80 flex-row gap-4 rounded-xl bg-basic-white p-4"
    :class="isSuperMatch ? 'super-match border-2 border-warning' : 'border-0'"
  >
    <img :src="avatarUrl" alt="background" class="h-32 w-32 rounded-lg" />
    <div class="flex w-full flex-col justify-between overflow-hidden">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col">
          <h3 class="font-eina1 text-3 font-normal text-basic-black">
            {{ firstname }} <strong class="uppercase"> {{ lastname }}</strong>
          </h3>
          <p class="font-eina1 text-1 text-basic-darkgrey">{{ degree }}</p>
        </div>
        <ChipContainer label="non contaté(e)" />
      </div>
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-1">
          <p class="font-eina1 text-1 text-basic-darkgrey">Suggéré à</p>
          <span
            class="font-eina1 text-3 font-semibold"
            :class="isSuperMatch ? 'text-success' : 'text-warning'"
            >{{ compatibility }}</span
          >
        </div>
        <Button
          type="default"
          class="max-h-[29px] w-full"
          :class="isSuperMatch ? 'border-warning bg-warning ' : 'bg-primary-moonstone'"
          state="active"
          styled="outlined"
          @click="() => emit('seeProfile', props.data)"
        >
          <span class="text-basic-white">Voir le profil</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    required: true,
    type: Object
  }
})


const firstname = computed(() => props.data.userInfo.firstname)
const lastname = computed(() => props.data.userInfo.lastname)
const degree = computed(() => props.data.studentInfo.level)
const compatibility = computed(() => props.data.globalMatch)

const avatarUrl = computed(() => {
  if (firstname) {
    return `https://api.dicebear.com/7.x/micah/svg?seed=${firstname.value}&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf`
  }
  return 'https://api.dicebear.com/7.x/micah/svg?seed=hugo&radius=50&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf'
})

const isSuperMatch = computed(() => parseInt(compatibility.value) >= 90)

const emit = defineEmits(['seeProfile'])
</script>

<style scoped>
.super-match {
  box-shadow: 0px 0px 13px 6px rgba(255, 171, 1, 0.27);
}
</style>

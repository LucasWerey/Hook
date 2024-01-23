<template>
  <div class="flex min-h-64 w-full flex-col gap-6 rounded-xl bg-basic-white p-6">
    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex w-full items-center gap-2">
        <IconsBase name="graduationCap" class="h-6 w-6" color="powder" />
        <h2 class="text-8 font-500 text-primary-powder">Mes formations</h2>
      </div>
      <IconsBase name="plus" class="h-6 w-6" color="powder" />
    </div>
    <div
      v-for="(formation, index) in dataInfo.formations"
      :key="index"
      class="flex w-full flex-col gap-4"
    >
      <FormationPresentation
        :dataInfo="formation"
        :duration="2"
        :formattedEndDate="formation.endDate"
        :formattedStartDate="formatDate(formation.startDate)"
      />
      <div
        v-if="index < dataInfo.formations.length - 1"
        class="h-[0.2px] w-full self-center bg-basic-lightgrey"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()

const dataInfo = computed(() => ({
  formations: studentStore.students[0].profile.formation
}))
const formatDate = (date: Date): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleString('en-US', { month: 'short', year: 'numeric' })
}

/**
const calculateDuration = (startDate: Date, endDate: Date): number => {
  const dateStart = new Date(startDate)
  const dateEnd = new Date(endDate)
  const diff = dateEnd.getTime() - dateStart.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
}*/
</script>

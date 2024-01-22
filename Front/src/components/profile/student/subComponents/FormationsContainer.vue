<template>
  <div class="flex min-h-64 w-full flex-col gap-6 rounded-xl bg-basic-white p-6">
    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex w-full items-center gap-2">
        <IconsBase name="graduationCap" class="h-6 w-6" color="powder" />
        <h2 class="text-8 font-500 text-primary-powder">Mes formations</h2>
      </div>
      <IconsBase name="plus" class="h-6 w-6" color="powder" />
    </div>
    <FormationPresentation
      :dataInfo="dataInfo"
      :duration="2"
      :formattedEndDate="dataInfo.endDate"
      :formattedStartDate="formatDate(dataInfo.startDate)"
    />
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()

const dataInfo = reactive({
  description: studentStore.students[0].profile.description,
  endDate: 'jai pas',
  name: studentStore.students[0].profile.formationName,
  result: studentStore.students[0].profile.schoolResult,
  school: studentStore.students[0].profile.school,
  startDate: studentStore.students[0].profile.schoolStartDate
})

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

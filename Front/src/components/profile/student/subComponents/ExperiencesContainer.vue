<template>
  <div class="flex min-h-64 w-full flex-col gap-6 rounded-xl bg-basic-white p-6">
    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex w-full items-center gap-2">
        <IconsBase name="briefcase" class="h-6 w-6" color="powder" />
        <h2 class="text-8 font-500 text-primary-powder">Mes expériences</h2>
      </div>
      <IconsBase
        name="plus"
        class="h-6 w-6 cursor-pointer"
        @click="emit('addExperience')"
        color="powder"
      />
    </div>
    <div
      v-for="(experience, index) in dataInfo.experiences"
      :key="index"
      class="flex w-full flex-col gap-4"
    >
      <ExperiencePresentation
        :dataInfo="experience"
        :formattedStartDate="formatDate(experience.startDate)"
        :formattedEndDate="formatDate(experience.endDate)"
        :duration="calculateDuration(experience.startDate, experience.endDate)"
        @deleteExperience="() => handleDelete(index)"
      />
      <div
        v-if="index < dataInfo.experiences.length - 1"
        class="h-[0.2px] w-full self-center bg-basic-lightgrey"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()

const dataInfo = computed(() => ({
  experiences: studentStore.students[0].profile.experiences
}))

const formatDate = (dateObj: any): string => {
  if (!dateObj || !dateObj.$date || !dateObj.$date.$numberLong) {
    return ''
  }

  const timestamp = parseInt(dateObj.$date.$numberLong)
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' })
}

const calculateDuration = (startDateObj: any, endDateObj: any): number => {
  if (
    !startDateObj ||
    !startDateObj.$date ||
    !startDateObj.$date.$numberLong ||
    !endDateObj ||
    !endDateObj.$date ||
    !endDateObj.$date.$numberLong
  ) {
    return 0
  }

  const dateStart = new Date(parseInt(startDateObj.$date.$numberLong))
  const dateEnd = new Date(parseInt(endDateObj.$date.$numberLong))
  const diff = dateEnd.getTime() - dateStart.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
}

const handleDelete = async (index: number) => {
  studentStore.students[0].profile.experiences.splice(index, 1)
  const updatedStudent = studentStore.students[0]
  try {
    await updateStudent(studentStore.students[0]._id.$oid, updatedStudent)
  } catch (error) {
    console.log(error)
  }
}

const emit = defineEmits(['addExperience'])
</script>

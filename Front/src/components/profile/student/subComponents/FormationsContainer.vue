<template>
  <div class="flex min-h-64 w-full flex-col gap-6 rounded-xl bg-basic-white p-6">
    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex w-full items-center gap-2">
        <IconsBase name="graduationCap" class="h-6 w-6" color="powder" />
        <h2 class="text-8 font-500 text-primary-powder">Mes formations</h2>
      </div>
      <IconsBase
        name="plus"
        class="h-6 w-6 cursor-pointer"
        @click.prevent="emit('addFormation')"
        color="powder"
      />
    </div>
    <div
      v-for="(formation, index) in dataInfo.formations"
      :key="index"
      class="flex w-full flex-col gap-4"
    >
      <FormationPresentation
        :dataInfo="formation"
        :duration="2"
        :formattedEndDate="formatDate(formation.endDate)"
        :formattedStartDate="formatDate(formation.startDate)"
        @deleteFormation="() => handleDelete(index)"
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
  formations: studentStore.students[0].profile.formations
}))

const formatDate = (dateObj: any): string => {
  if (!dateObj || !dateObj.$date || !dateObj.$date.$numberLong) {
    return ''
  }

  const timestamp = parseInt(dateObj.$date.$numberLong)
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' })
}

const handleDelete = async (index: number) => {
  studentStore.students[0].profile.formations.splice(index, 1)
  const updatedStudent = studentStore.students[0]
  try {
    await updateStudent(studentStore.students[0]._id.$oid, updatedStudent)
  } catch (error) {
    console.error(error)
  }
}

const emit = defineEmits(['addFormation'])
</script>

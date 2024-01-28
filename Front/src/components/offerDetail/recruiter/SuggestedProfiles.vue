<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex w-full gap-2">
      <h2 class="font-eina1 text-4 font-bold uppercase">Profils suggérés</h2>
      <IconsBase name="info" class="cursor-pointer" size="small" color="darkgrey" />
    </div>
    <div class="flex w-full flex-row gap-6">
      <div v-for="student in matchingStudents" :key="student.student_id.$oid">
        <StudentSuggestedCard :data="student" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  offerData: {
    type: Object
  }
})

interface Match {
  globalMatch: string
  student_id: {
    $oid: string
  }
}

const offerDetails = computed(() => {
  if (props.offerData && props.offerData.details) {
    const { compatibility_min } = props.offerData.details
    return { compatibility_min }
  }
  return {}
})

const compatibility_min = computed(() =>
  parseInt(offerDetails.value.compatibility_min.replace('%', ''))
)
const matchs = computed(() => (props.offerData ? props.offerData.matchs : []))

let matchingStudents = ref<any[]>([])

watchEffect(async () => {
  if (matchs.value) {
    const filteredMatches = matchs.value.filter(
      (match: Match) => parseInt(match.globalMatch) >= compatibility_min.value
    )

    const studentInfosPromise = Promise.all(
      filteredMatches.map(async (match: Match) => {
        try {
          const studentInfo = await getStudent(match.student_id.$oid)
          const userInfo = await getUser(match.student_id.$oid)
          return { ...match, studentInfo, userInfo }
        } catch (error) {
          console.error(error)
          return match
        }
      })
    )

    matchingStudents.value = await studentInfosPromise
  }
})
</script>

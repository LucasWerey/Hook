<template>
  <div class="flex min-h-full w-full flex-col gap-6">
    <div class="flex w-full items-end gap-4">
      <InputField
        v-model="searchModel"
        label=""
        placeholder="Rechercher une demande"
        class="max-w[500px] mt-[-24px] w-2/5"
      />
      <Button
        @click="handleSearch"
        class="w-1/5 max-w-[140px] bg-basic-black uppercase"
        styled="fill"
        state="active"
        type="default"
      >
        Rechercher
      </Button>
    </div>
    <div v-if="isStoreReady" class="flex w-full flex-wrap gap-6">
      <DemandCard type="empty" @createDemand="emit('createDemand')" />
      <div v-show="jobsWantedRef.length > 0">
        <DemandCard
          v-for="(demand, index) in jobsWantedRef"
          :key="index"
          type="fill"
          :title="demand.name"
          :location="demand.location"
          :contractType="demand.contract_type"
          :contractDuration="demand.duration"
          :nMatchs="numberOfMatch"
          :notification="0"
          desktopColor="moonstone"
          @seeDemand="() => console.log('see demand')"
        />
      </div>
    </div>
    <div v-show="jobsWantedRef.length === 0" class="flex w-full justify-center">
      <div class="font-eina1 text-4 font-normal">Aucune demande trouvée</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()

const isStoreReady = computed(() => studentStore.students.length > 0)

const searchModel = ref('')

const jobsWanted = computed(() => {
  if (studentStore.students.length > 0 && studentStore.students[0].profile) {
    return studentStore.students[0].profile.jobWanted
  }
  return []
})

const idStudent = computed(() => {
  if (studentStore.students.length > 0) {
    return studentStore.students[0]._id.$oid
  }
  return ''
})

const allOffers = ref<any[]>([])
const numberOfMatch = computed(() => {
  let count = 0
  allOffers.value.forEach(offer => {
    if (offer.matchs.length > 0) {
      offer.matchs.forEach((match: any) => {
        if (match.student_id.$oid === idStudent.value) {
          count++
        }
      })
    }
  })
  return count
})

onMounted(async () => {
  allOffers.value = await getAllOffers()
})

const jobsWantedRef = ref(jobsWanted.value)

watch(searchModel, () => {
  if (searchModel.value === '') jobsWantedRef.value = jobsWanted.value
  handleSearch()
})

watch(jobsWanted, newVal => {
  jobsWantedRef.value = newVal
})

const handleSearch = () => {
  const filteredOffers = jobsWanted.value.filter(offer =>
    JSON.stringify(offer).toLowerCase().includes(searchModel.value.toLowerCase())
  )
  jobsWantedRef.value = filteredOffers
  return filteredOffers
}

const emit = defineEmits(['createDemand'])
</script>

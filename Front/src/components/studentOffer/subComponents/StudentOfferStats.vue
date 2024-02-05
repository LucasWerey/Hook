<template>
  <div class="flex w-full justify-around rounded-2xl border-[1.6px] border-basic-lightgrey p-12">
    <div class="flex flex-col items-center">
      <p class="font-eina1 text-4 text-basic-darkgrey">Vous avez</p>
      <p
        class="font-eina1 text-24 font-bold"
        :class="parseInt(offerMatchs) > 90 ? 'text-success' : 'text-warning'"
      >
        {{ offerMatchs }}
      </p>
      <p class="font-eina1 text-4 text-basic-darkgrey">de compatibilité avec ce candidat</p>
    </div>
    <div class="min-h-full min-w-[2px] bg-basic-verylightgrey" />
    <div class="flex flex-col gap-4">
      <h3 class="font-eina1 text-2 font-bold uppercase">Demande du candidat</h3>
      <div class="grid grid-cols-3 gap-x-8 gap-y-4">
        <div class="flex flex-col gap-1" v-for="(request, index) in candidateRequests" :key="index">
          <h4 class="font-eina1 text-2 font-bold uppercase text-primary-moonstone">
            {{ request.title }}
          </h4>
          <span class="font-eina1 text-4">{{ request.value }}</span>
        </div>
      </div>
    </div>
    <div class="min-h-full min-w-[2px] bg-basic-verylightgrey" />
    <div class="flex flex-col">
      <div class="flex flex-col gap-4">
        <h3 class="font-eina1 text-2 font-bold uppercase">Détail de compatibilité</h3>
        <div class="flex gap-8 font-eina1 text-4 text-primary-moonstone">
          <div
            class="flex flex-col gap-1"
            v-for="(progressBar, index) in progressBars.slice(0, 2)"
            :key="index"
          >
            <div class="flex w-48 justify-between">
              <h4>{{ progressBar.title }}</h4>
              <p>{{ progressBar.value }}%</p>
            </div>
            <div class="h-2 rounded bg-basic-grey">
              <div
                class="h-full rounded bg-primary-moonstone"
                :style="{ width: progressBar.value + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <div class="flex gap-8 font-eina1 text-4 text-primary-moonstone">
          <div
            class="flex flex-col gap-1"
            v-for="(progressBar, index) in progressBars.slice(2)"
            :key="index"
          >
            <div class="flex w-48 justify-between">
              <h4>{{ progressBar.title }}</h4>
              <p>{{ progressBar.value }}%</p>
            </div>
            <div class="h-2 rounded bg-basic-grey">
              <div
                class="h-full rounded bg-primary-moonstone"
                :style="{ width: progressBar.value + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataOffer: { required: true, type: Object },
  dataStudent: { required: true, type: Object }
})

const dataOffer = computed(() => props.dataOffer)
const dataStudent = computed(() => props.dataStudent)
const userId = computed(() => dataStudent.value?._id?.$oid)

function computeOfferMatches(
  offerData: ComputedRef<Record<string, any>>,
  userId: ComputedRef<string>
) {
  if (offerData.value && offerData.value.matchs) {
    const match = offerData.value.matchs.find(
      (match: any) => match.student_id.$oid === userId.value
    )
    return match ? match.globalMatch : null
  }
  return null
}
const offerMatchs = computed(() => computeOfferMatches(dataOffer, userId))

const startDate = new Date(
  parseInt(dataStudent.value.profile.jobWanted[0].startDate.$date.$numberLong)
).toLocaleDateString('fr-FR')

const candidateRequests = [
  { title: 'Poste', value: dataStudent.value.profile.jobWanted[0].name },
  { title: 'Type de contrat', value: dataStudent.value.profile.jobWanted[0].contract_type },
  { title: 'Lieu', value: dataStudent.value.profile.jobWanted[0].location },
  { title: 'A partir du', value: startDate },
  { title: 'Durée', value: dataStudent.value.duration }
]

const progressBars = ref([
  { title: 'Certifications', value: 50 },
  { title: 'Experiences', value: 60 },
  { title: 'Personnalité', value: 70 },
  { title: 'Formations', value: 80 }
])

function assignValue(offerMatchs: string) {
  let total = parseInt(offerMatchs) * progressBars.value.length
  let sum = 0
  for (let i = 0; i < progressBars.value.length - 1; i++) {
    let value
    if (parseInt(offerMatchs) > 80) {
      value = Math.floor(Math.random() * (100 - 60 + 1)) + 60
    } else {
      value = Math.floor(Math.random() * Math.min(total, parseInt(offerMatchs)))
    }
    progressBars.value[i].value = Math.max(0, value)
    total -= value
    sum += progressBars.value[i].value
  }
  if (parseInt(offerMatchs) > 80) {
    progressBars.value[progressBars.value.length - 1].value = Math.max(
      0,
      Math.min(parseInt(offerMatchs) * progressBars.value.length - sum, 100)
    )
  } else {
    progressBars.value[progressBars.value.length - 1].value = Math.max(
      0,
      Math.min(parseInt(offerMatchs) * progressBars.value.length - sum, parseInt(offerMatchs))
    )
  }
  progressBars.value.sort((a, b) => b.value - a.value)
}

watchEffect(() => {
  if (offerMatchs.value) {
    assignValue(offerMatchs.value)
  }
})
</script>

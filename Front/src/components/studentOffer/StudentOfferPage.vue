<template>
  <Loader v-if="loading" />
  <div v-else class="flex h-full w-full flex-col gap-12">
    <IconsBase
      name="moveLeft"
      class="h-10 w-10 cursor-pointer"
      color="darkgrey"
      @click="goToLast"
    />
    <StudentOfferHeader v-if="data.offer && data.user && data.student" :data="data" />
    <hr class="w-full text-basic-lightgrey" />
    <StudentOfferStats
      v-if="data.offer && data.user && data.student"
      :dataStudent="data.student"
      :dataOffer="data.offer"
    />
    <StudentOfferSingularity v-if="data.student" :dataStudent="data.student" />
    <StudentOfferPersonality v-if="data.student" :dataStudent="data.student" />
    <StudentOfferExperiences v-if="data.student" :dataStudent="data.student" />
    <StudentOfferCompetencies v-if="data.student" :dataStudent="data.student" />
    <StudentOfferCertifications v-if="data.student" :dataStudent="data.student" />

    <div class="flex flex-row items-center justify-center gap-12">
      <Button
        type="default"
        state="active"
        styled="fill"
        class="uppercase"
        style="background-color: white; border-color: #ff5656"
      >
        <span class="text-error">Je ne suis pas intéressé</span>
      </Button>
      <Button
        type="default"
        :state="buttonState ? 'active' : 'disabled'"
        styled="fill"
        class="cursor-pointer uppercase"
        @click="onButtonClick"
      >
        Ce profil m'intéresse
      </Button>
    </div>
  </div>
  <SnackBar
    v-if="showSnackbar"
    type="info"
    close="no"
    size="medium"
    class="fixed bottom-10 right-1/2 z-50 translate-x-1/2 md:w-fit"
  >
    Votre intérêt pour ce candidat vient de lui être notifié !
  </SnackBar>
</template>

<script setup lang="ts">
const route = useRoute()
const offerId = computed(() => route.params.offerId)
const studentId = computed(() => route.params.studentId)
const data = ref<Record<string, any>>({
  offer: null,
  student: null,
  user: null
})
const loading = ref(true)
const buttonState = ref(true)
const showSnackbar = ref(false)

onMounted(async () => {
  data.value.offer = await fetchData(offerId.value, getOffer)
  data.value.user = await fetchData(studentId.value, getUser)
  data.value.student = await fetchData(studentId.value, getStudent)
})

const onButtonClick = () => {
  buttonState.value = !buttonState.value
  showSnackbar.value = !showSnackbar.value
  setTimeout(resetSnackbar, 5000)
}

async function fetchData(id: any, fetchFunction: any) {
  try {
    if (id) {
      return await fetchFunction(id)
    }
  } catch (error) {
    const apiError = handleApiError(error)
    console.error(`API Error: ${apiError.status} - ${apiError.message}`)
    return null
  } finally {
    loading.value = false
  }
}

const goToLast = () => {
  router.push(`/myspace/offer/${offerId.value}`)
}

const resetSnackbar = () => {
  showSnackbar.value = false
}
</script>

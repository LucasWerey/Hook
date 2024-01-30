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
    <StudentOfferSingularity :dataStudent="data.student" />
  </div>
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

onMounted(async () => {
  data.value.offer = await fetchData(offerId.value, getOffer)
  data.value.user = await fetchData(studentId.value, getUser)
  data.value.student = await fetchData(studentId.value, getStudent)
})

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
</script>

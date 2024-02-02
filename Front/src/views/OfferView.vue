<template>
  <div class="flex h-full w-full bg-basic-white px-12 py-6 pt-[104px]">
    <OfferPage :offerId="offerId" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
let offerId = ref('')

onMounted(() => {
  offerId.value = Array.isArray(route.params.offerId)
    ? route.params.offerId[0]
    : route.params.offerId
})

const isStudent = ref(false)
const isCompany = ref(false)
const hasToken = ref(false)
let response = ref()
const email = ref('')

const store = useUserTypeStore()
const studentStore = useStudentsStore()
const recruiterStore = useRecruiterStore()

onMounted(async () => {
  try {
    response.value = await getUserInfoFromToken(AuthenticationUtils.getToken() || '')
    email.value = response.value.email
    hasToken.value = true
    if (response.value.statut === 'student') {
      isStudent.value = true
      store.setUserType('student')
      await populateStudentStore(response.value._id.$oid)
      email.value = studentStore.students[0].email
    } else {
      isCompany.value = true
      store.setUserType('recruiter')
      await populateCompanyStoreByAdmin(response.value._id.$oid)
      await populateRecruiterStore(response.value._id.$oid)
      email.value = recruiterStore.recruiters[0].email
      router.push({ name: 'myspace' })
    }
  } catch (error) {
    console.log(error)
    if ((error as any).response && (error as any).response.status === 500) {
      AuthenticationUtils.removeToken()

      router.push({ name: 'login' })
    } else if ((error as any).response && (error as any).response.status === 401) {
      AuthenticationUtils.removeToken()
      router.push({ name: 'login' })
    }
  }
})
</script>

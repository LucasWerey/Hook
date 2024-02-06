<template>
  <div class="flex h-full w-full bg-basic-white px-12 pb-20 pt-[104px]">
    <DemandDetailPage v-if="isStudent" :studentId="studentId" />
  </div>
</template>

<script setup lang="ts">
let response = ref()
let showSnackbar = ref(false)
let errorMessage = ref('')
const email = ref('')
const isStudent = ref(false)
const isCompany = ref(false)
const hasToken = ref(false)

const route = useRoute()
let studentId = ref('')

onMounted(() => {
  studentId.value = Array.isArray(route.params.studentId)
    ? route.params.studentId[0]
    : route.params.studentId
})

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
    }
  } catch (error) {
    if ((error as any).response && (error as any).response.status === 500) {
      AuthenticationUtils.removeToken()
      errorMessage.value = 'Invalid token.'
      router.push({ name: 'login' })
    } else if ((error as any).response && (error as any).response.status === 401) {
      AuthenticationUtils.removeToken()
      errorMessage.value = 'Expired token.'
      router.push({ name: 'login' })
    } else {
      errorMessage.value = (error as Error).message
    }
    showSnackbar.value = true
  }
})
</script>

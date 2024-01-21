<template>
  <div class="flex h-full w-full px-12 py-6">
    <SpaceStudent v-if="isStudent" />
    <SpaceRecruiter v-if="isCompany" />
  </div>
  <!--  <div class="flex w-full flex-col items-center justify-center gap-4 bg-error text-primary-light">
    <p>{{ email }}</p>
    <p>student ? : {{ isStudent }}</p>
    <p>isCompany ? : {{ isCompany }}</p>
    <p>infoUser = {{ isCompany ? recruiterStore.recruiters[0] : studentStore.students[0] }}</p>
    <p>CompanyInfo = {{ isCompany ? companyStore.companies[0] : '' }}</p>
  </div>-->
  <SnackBar v-if="showSnackbar" type="error" size="small" close="no">
    {{ errorMessage }}
  </SnackBar>
</template>

<script setup lang="ts">
let response = ref()
let showSnackbar = ref(false)
let errorMessage = ref('')
const email = ref('')
const isStudent = ref(false)
const isCompany = ref(false)
const hasToken = ref(false)

const store = useUserTypeStore()
const studentStore = useStudentsStore()
const recruiterStore = useRecruiterStore()
// const companyStore = useCompanyStore()

onMounted(async () => {
  try {
    response.value = await getUserInfoFromToken(AuthenticationUtils.getToken() || '')
    console.log(response.value)
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
    console.log(isStudent.value)
  } catch (error) {
    console.log(error)
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

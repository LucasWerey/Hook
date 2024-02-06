<template>
  <div class="flex h-full w-full px-12 pb-20 pt-[104px]">
    <OfferDetailRecruiter v-if="isCompany" :offerId="offerId" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
let offerId = ref('')

onMounted(() => {
  offerId.value = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
})

const isStudent = ref(false)
const isCompany = ref(false)
const hasToken = ref(false)

const userTypeStore = useUserTypeStore()

onMounted(async () => {
  try {
    const response = await getUserInfoFromToken(AuthenticationUtils.getToken() || '')
    hasToken.value = true
    if (response.statut === 'student') {
      isStudent.value = true
      userTypeStore.setUserType('student')
    } else {
      isCompany.value = true
      userTypeStore.setUserType('recruiter')
    }
  } catch (error) {
    console.error(error)
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

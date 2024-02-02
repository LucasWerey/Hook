<template>
  <div class="flex h-full w-full px-12 py-6 pt-[104px]">{{ offerId }}</div>
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

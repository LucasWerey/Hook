<template>
  <div class="w-full flex-1 pt-20">
    <NavBarWelcome v-if="!hasToken" />
    <NavBarStudent v-if="isStudent" />
    <NavBarCompany v-if="isCompany" />
    {{ email }}
  </div>
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

onMounted(async () => {
  try {
    response.value = await getUserInfoFromToken(AuthenticationUtils.getToken() || '')
    console.log(response.value)
    email.value = response.value.email
    hasToken.value = true
    if (response.value.statut === 'student') {
      isStudent.value = true
    } else {
      isCompany.value = true
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

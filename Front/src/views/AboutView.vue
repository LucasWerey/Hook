<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ formattedResponse }}</p>
    <SnackBar
      v-if="showSnackbar"
      type="error"
      close="no"
      size="small"
      class="z-50 absolute bottom-6 left-1/2 -translate-x-1/2"
    >
      {{ errorMessage }}
    </SnackBar>
  </div>
</template>

<script setup lang="ts">
onMounted(async () => {
  console.log(await doesCityExist('pAris'))
})

let response = ref()
let showSnackbar = ref(false)
let errorMessage = ref('')

onMounted(async () => {
  try {
    response.value = await getAllUsers()
  } catch (error) {
    const apiError = handleApiError(error)
    errorMessage.value = apiError.message
    showSnackbar.value = true
  }
})

let formattedResponse = computed(() => JSON.stringify(response.value, null, 2))
</script>

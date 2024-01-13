<template>
  <div>
    <RecruiterSignup v-if="userType === 'recruiter'" />
    <StudentSignup v-else-if="userType === 'student'" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const userType = computed(() => route.query.userType)
onMounted(() => {
  console.log(route.query.userType)
})
</script>

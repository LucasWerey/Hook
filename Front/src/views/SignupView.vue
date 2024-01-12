<template>
  <div>
    <RecruiterSignupView v-if="userType === 'recruiter'" />
    <StudentSignupView v-else-if="userType === 'student'" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import RecruiterSignupView from './RecruiterSignupView.vue'
import StudentSignupView from './StudentSignupView.vue'

const route = useRoute()
const userType = computed(() => route.query.userType)
onMounted(() => {
  console.log(route.query.userType)
})
</script>

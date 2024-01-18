<template>
  <div>
    <component :is="currentSignupComponent" />
  </div>
</template>

<script setup lang="ts">
import RecruiterSignup from '../components/signUp/RecruiterSignup.vue'
import StudentSignup from '../components/signUp/StudentSignup.vue'

const route = useRoute()
const userType = computed(() => route.query.userType)

const currentSignupComponent = computed(() => {
  switch (userType.value) {
    case 'recruiter':
      return RecruiterSignup
    case 'student':
      return StudentSignup
    default:
      return null
  }
})

onMounted(() => {
  console.log(route.query.userType)
})
</script>

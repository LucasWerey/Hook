<template>
  <div class="flex flex-col items-center justify-center h-full w-full background-image">
    <div class="flex flex-col items-center justify-center gap-8 w-2/3">
      <DarkLogo class="w-22" />
      <h1 class="text-6 lg:text-24 text-center text-basic-white font-800">
        {{ homeWords.title }}
      </h1>
      <p class="text-4 lg:text-8 text-center text-basic-white font-400 opacity-80">
        {{ homeWords.description }}
      </p>
      <p class="text-4 lg:text-8 text-center text-primary-charcoal font-700">
        {{ homeWords.ask }}
      </p>
      <div class="flex-col sm:flex-row flex items-center max-w-full justify-center gap-4">
        <Button
          type="default"
          state="active"
          styled="fill"
          class="shadow-md max-w-3/4 max-w-fit sm:max-w-none"
          @click="onRecruiterClick"
        >
          {{ homeWords.recruiter }}
        </Button>
        <Button
          type="default"
          state="active"
          styled="outlined"
          class="border-basic-white shadow-md max-w-fit sm:max-w-none"
          style="color: white"
          @click="onStudentClick"
          >{{ homeWords.student }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DarkLogo from '../assets/DarkLogo.vue'
import router from '../router'

import { useUserTypeStore } from '../stores/userTypeStore'

const userTypeStore = useUserTypeStore()

const onRecruiterClick = () => {
  userTypeStore.setUserType('recruiter')
  router.push({ path: '/signup', query: { userType: 'recruiter' } })
}

const onStudentClick = () => {
  userTypeStore.setUserType('student')
  router.push({ path: '/signup', query: { userType: 'student' } })
}
</script>

<style scoped>
.background-image {
  background-image: url('../assets/Background.png');
  background-size: cover;
}
</style>

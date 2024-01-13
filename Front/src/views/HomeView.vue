<template>
  <div class="background-image flex h-full w-full flex-col items-center justify-center">
    <div class="flex w-2/3 flex-col items-center justify-center gap-8">
      <DarkLogo class="w-22" />
      <h1 class="text-center text-6 font-800 text-basic-white lg:text-24">
        {{ homeWords.title }}
      </h1>
      <p class="font-400 text-center text-4 text-basic-white opacity-80 lg:text-8">
        {{ homeWords.description }}
      </p>
      <p class="text-center text-4 font-700 text-primary-charcoal lg:text-8">
        {{ homeWords.ask }}
      </p>
      <div class="flex max-w-full flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          type="default"
          state="active"
          styled="fill"
          class="max-w-3/4 max-w-fit shadow-md sm:max-w-none"
          @click="onRecruiterClick"
        >
          {{ homeWords.recruiter }}
        </Button>
        <Button
          type="default"
          state="active"
          styled="outlined"
          class="max-w-fit border-basic-white shadow-md sm:max-w-none"
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

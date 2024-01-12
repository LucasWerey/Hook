<template>
  <div class="flex flex-col items-center justify-center h-full w-full background-image">
    <div class="flex flex-col items-center justify-center gap-8 w-2/3">
      <DarkLogo class="w-22" />
      <h1 class="text-6 lg:text-24 text-center text-basic-white font-800">
        {{ wording.title }}
      </h1>
      <p class="text-4 lg:text-8 text-center text-basic-white font-700">
        {{ wording.description }}
      </p>
      <div class="flex-col sm:flex-row flex items-center max-w-full justify-center gap-4">
        <Button
          type="default"
          state="active"
          styled="fill"
          class="shadow-md max-w-3/4 max-w-fit sm:max-w-none"
          @click="onRecruiterClick"
        >
          {{ wording.recruiter }}
        </Button>
        <Button
          type="default"
          state="active"
          styled="outlined"
          class="border-basic-white shadow-md max-w-fit sm:max-w-none"
          style="color: white"
          @click="onStudentClick"
          >{{ wording.student }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DarkLogo from '../assets/DarkLogo.vue'
import router from '../router'

const wording = {
  title: "Trouvez le talent ou l'opportunité qui vous correspond.",
  description:
    "Hook révolutionne le recrutement en mettant l'accent sur la personnalité. Découvrez des candidats authentiques et des entreprises passionnantes, où le talent et l'opportunité se rencontrent harmonieusement.",
  recruiter: 'Je suis un recruteur',
  student: 'Je suis un étudiant'
}

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

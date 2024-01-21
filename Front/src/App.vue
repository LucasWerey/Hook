<template>
  <div id="app" class="max-h-[100dvh]">
    <NavBarWelcome class="fixed z-50" v-if="showNavBar && !isStudent && !isRecruiter" />
    <NavBarStudent class="fixed z-50" v-if="showNavBar && isStudent" />
    <NavBarCompany class="fixed z-50" v-if="showNavBar && isRecruiter" />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import './assets/index.css'

const store = useUserTypeStore()

const isStudent = computed(() => {
  return store.userType === 'student' && router.currentRoute.value.name !== 'home'
})

const isRecruiter = computed(() => {
  return store.userType === 'recruiter' && router.currentRoute.value.name !== 'home'
})

const route = useRoute()
const showNavBar = computed(() => {
  return route.path !== '/login' && route.path !== '/signup'
})
</script>

<style>
body {
  @apply bg-basic-verylightgrey;
}
</style>

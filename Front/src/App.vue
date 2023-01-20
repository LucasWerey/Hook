<template>
  <div id="app" class="h-[100dvh]">
    <NavBarWelcome class="fixed z-50" v-show="showNavBar" />
    <RouterView :class="{ 'pt-20': showNavBar }" />
  </div>
</template>

<script setup lang="ts">
import './assets/index.css'

const route = useRoute()
const showNavBar = computed(() => {
  return route.path !== '/login' && route.path !== '/signup'
})
</script>

<style>
body {
  @apply bg-basic-verylightgrey;
  min-width: 100dvw;
}
</style>

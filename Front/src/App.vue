<template>
  <div id="app" class="w-100 h-[100vh]">
    <NavBarWelcome class="z-50 fixed" v-show="showNavBar" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import './assets/index.css'
import { computed } from 'vue'

const route = useRoute()
const showNavBar = computed(() => {
  return route.path !== '/login' && route.path !== '/signup'
})
</script>

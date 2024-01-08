<template>
  <div id="app" class="w-[100vw] h-[100vh]">
    <NavBar class="z-50" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import './assets/index.css'
</script>

<style>
#app {
  background-image: url('./assets/Background.png');
  background-size: cover;
}
</style>

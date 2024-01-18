<template>
  <div class="relative flex h-20 w-full items-center justify-between bg-basic-white px-8 shadow">
    <div class="flex h-full items-center justify-center gap-2 align-middle">
      <IconsBase name="logo" size="large" @click="onLogoClick" class="cursor-pointer md:w-40" />
      <div class="relative inline-flex h-full items-center gap-8">
        <div
          class="relative flex h-full items-center align-middle text-3 font-700 uppercase text-primary-powder"
        >
          <router-link :to="{ name: 'about' }" active-class="text-primary-moonstone active-route"
            >MON ESPACE</router-link
          >
        </div>
        <div
          class="relative flex h-full items-center align-middle text-3 font-700 uppercase text-primary-powder"
        >
          <router-link :to="{ name: 'home' }" active-class="text-primary-moonstone active-route"
            >message</router-link
          >
        </div>
        <div
          class="relative flex h-full items-center align-middle text-3 font-700 uppercase text-primary-powder"
        >
          <router-link :to="{ name: 'home' }" active-class="text-primary-moonstone active-route"
            >PLANNING</router-link
          >
        </div>
        <div
          class="relative flex h-full items-center align-middle text-3 font-700 uppercase text-primary-powder"
        >
          <router-link :to="{ name: 'home' }" active-class="text-primary-moonstone active-route"
            >Newsletter</router-link
          >
        </div>
      </div>
    </div>
    <div>
      <div class="flex h-full w-full items-center justify-center gap-4 align-middle">
        <IconsBase name="close" size="medium" color="grey" class="cursor-pointer" />
        <hr class="m-0 w-6 rotate-90 border border-basic-lightgrey bg-basic-lightgrey" />
        <div class="flex items-center justify-center gap-4 align-middle">
          <div class="font-eina1 text-4 font-normal text-basic-black">Email@lulu.com</div>
          <Avatar
            type="photo"
            src="https://api.dicebear.com/7.x/micah/svg?seed=Hugo&radius=50&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf"
            alt="avatar photo"
            size="small"
          />
          <IconsBase name="chevronDown" color="darkgrey" class="cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'

const onLogoClick = () => {
  // handle logo click
}
</script>

<style scoped>
.active-route::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.2rem;
  @apply bg-primary-moonstone;
}
</style>

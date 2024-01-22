<template>
  <div class="fixed flex min-h-20 w-full items-center justify-between bg-basic-white px-8 shadow">
    <div class="flex h-full items-center justify-center gap-2 align-middle">
      <IconsBase name="logo" size="large" @click="onLogoClick" class="cursor-pointer md:w-40" />
      <div class="relative inline-flex h-full items-center gap-8">
        <div
          class="relative flex h-full items-center align-middle text-3 font-700 uppercase text-primary-powder"
        >
          <router-link :to="{ name: 'myspace' }" active-class="text-primary-moonstone active-route"
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
      </div>
    </div>
    <div>
      <div class="flex h-full w-full items-center justify-center gap-4 align-middle">
        <IconsBase name="notif" size="medium" color="grey" class="cursor-pointer" />
        <hr class="m-0 w-6 rotate-90 border border-basic-lightgrey bg-basic-lightgrey" />
        <div
          class="flex items-center justify-center gap-4 align-middle"
          @click.prevent="openDropDown"
          ref="dropdownTrigger"
          tabindex="0"
          @blur="isDropdownOpen ? openDropDown : null"
        >
          <div class="cursor-pointer font-eina1 text-4 font-normal text-basic-black">
            {{ data }}
          </div>
          <Avatar
            type="photo"
            :src="avatarUrl"
            alt="avatar photo"
            size="small"
            class="select-none"
          />
          <IconsBase
            name="chevronDown"
            color="darkgrey"
            :rotate="isDropdownOpen ? 180 : 0"
            class="cursor-pointer"
          />
          <transition name="fade">
            <DropDown
              :style="{ width: dropdownWidth + 'px' }"
              class="absolute right-0 top-full"
              v-if="isDropdownOpen"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
const studentStore = useStudentsStore()

const isDropdownOpen = ref(false)

const openDropDown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const data = computed(() => {
  if (studentStore.students.length === 0) return
  return studentStore.students[0].email
})

const avatarUrl = computed(() => {
  if (studentStore.students.length > 0 && studentStore.students[0].firstname) {
    return `https://api.dicebear.com/7.x/micah/svg?seed=${studentStore.students[0].firstname}&radius=50&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf`
  }
  return 'https://api.dicebear.com/7.x/micah/svg?seed=hugo&radius=50&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf'
})

const dropdownTrigger = ref<HTMLElement | null>(null)

const dropdownWidth = computed(() => {
  return dropdownTrigger.value ? dropdownTrigger.value.offsetWidth + 48 : 0
})

onMounted(async () => {
  await nextTick()
  dropdownTrigger.value = document.querySelector('.dropdown-trigger')
})

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

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>

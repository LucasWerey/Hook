<template>
  <div class="flex w-full select-none flex-col bg-basic-white">
    <div
      v-for="(item, index) in menuItems"
      :key="index"
      class="h-12 w-full cursor-pointer border-b border-t border-b-basic-lightgrey border-t-basic-lightgrey px-4 py-3 font-eina1 text-4 font-normal hover:bg-basic-lightgrey"
      :class="item.additionalClass"
      @click="item.action"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
const seeProfile = () => {
  router.push({ name: 'profile' })
}

const disconnect = () => {
  AuthenticationUtils.removeToken()
  router.push({ name: 'home' })
}

const deleteAccount = () => {
  alert('delete account')
}

const menuItems = ref([
  { action: seeProfile, text: 'Voir mon profil' },
  { action: disconnect, text: 'Me déconnecter' },
  { action: deleteAccount, additionalClass: 'text-error', text: 'Supprimer mon compte' }
])
</script>

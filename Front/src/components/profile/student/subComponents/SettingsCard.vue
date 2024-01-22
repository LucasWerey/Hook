<template>
  <div class="flex w-full flex-col gap-2">
    <h2 class="w-full font-eina1 text-2 font-bold uppercase text-basic-darkgrey">Paramètres</h2>
    <div class="flex w-full flex-col rounded-xl bg-basic-white">
      <div
        v-for="option in options"
        :key="option.id"
        class="flex h-14 w-full cursor-pointer items-center gap-4 border-b-2 border-b-basic-lightgrey px-4 text-3 font-700 uppercase"
        :class="option.color"
        @click.prevent="option.action"
      >
        <IconsBase :name="option.icon" class="h-6 w-6" :color="option.iconColor" />
        <p>{{ option.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const editNotifications = () => {
  console.log('editNotifications')
}

const changePassword = () => {
  console.log('changePassword')
}

const logout = () => {
  console.log('logout')
}

const deleteAccount = () => {
  console.log('deleteAccount')
}

type IconName = 'bellRing' | 'lockKeyhole' | 'logout' | 'userRoundx'
type IconColor = 'darkgrey' | 'error'

const options = ref([
  {
    action: editNotifications,
    color: 'text-basic-darkgrey',
    icon: 'bellRing' as IconName,
    iconColor: 'darkgrey' as IconColor,
    id: 1,
    text: 'Gérer mes notifications'
  },
  {
    action: changePassword,
    color: 'text-basic-darkgrey',
    icon: 'lockKeyhole' as IconName,
    iconColor: 'darkgrey' as IconColor,
    id: 2,
    text: 'Modifier mon mot de passe'
  },
  {
    action: logout,
    color: 'text-basic-darkgrey',
    icon: 'logout' as IconName,
    iconColor: 'darkgrey' as IconColor,
    id: 3,
    text: 'me déconnecter'
  },
  {
    action: deleteAccount,
    color: 'text-error',
    icon: 'userRoundx' as IconName,
    iconColor: 'error' as IconColor,
    id: 4,
    text: 'Supprimer mon compte'
  }
])
</script>

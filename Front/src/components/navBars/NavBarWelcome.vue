<template>
  <div class="inline-flex w-full px-8 h-20 bg-basic-white shadow justify-between items-center">
    <IconsBase name="logo" size="large" @click="onClickLogo" class="cursor-pointer md:w-40" />
    <div class="inline-flex">
      <Button type="default" state="active" styled="off" @click="onClickSignUp">
        {{ wording.inscription }}
      </Button>
      <Button
        type="default"
        state="active"
        styled="off"
        class="text-primary-powder"
        @click="onClickLogin"
      >
        {{ wording.connexion }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../../router'

const wording = {
  inscription: 'S’inscrire',
  connexion: 'Se connecter'
}

const onClickLogin = () => {
  router.push('/login')
}

const onClickSignUp = () => {
  router.push('/about')
}

const onClickLogo = () => {
  router.push('/')
}
</script>

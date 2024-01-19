<template>
  <div class="inline-flex h-20 w-full items-center justify-between bg-basic-white px-8 shadow">
    <IconsBase name="logo" size="large" @click="onClickLogo" class="cursor-pointer md:w-40" />
    <div class="inline-flex">
      <Button type="default" state="active" styled="off" @click="onClickSignUp">
        {{ wording.inscription }}
      </Button>
      <Button type="default" state="active" styled="off" @click="onClickLogin">
        {{ wording.connexion }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../../router'

const wording = {
  connexion: 'Se connecter',
  inscription: 'S’inscrire'
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

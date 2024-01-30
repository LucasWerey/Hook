<template>
  <div class="max-h-[208px] max-w-[208px]">
    <Avocat v-if="name === 'Avocat'" />
    <Architecte v-if="name === 'Architecte'" />
    <Mediateur v-if="name === 'Médiateur'" />
    <Protagoniste v-if="name === 'Protagoniste'" />
    <Inspirateur v-if="name === 'Inspirateur'" />
    <Logicien v-if="name === 'Logicien'" />
    <Commandant v-if="name === 'Commandant'" />
    <Innovateur v-if="name === 'Innovateur'" />
    <Logisticien v-if="name === 'Logisticien'" />
    <Defenseur v-if="name === 'Défenseur'" />
    <Directeur v-if="name === 'Directeur'" />
    <Consul v-if="name === 'Consul'" />
    <Virstuose v-if="name === 'Virtuose'" />
    <Aventurier v-if="name === 'Aventurier'" />
    <Entrepreneur v-if="name === 'Entrepreneur'" />
    <Amuseur v-if="name === 'Amuseur'" />
  </div>
</template>

<script setup lang="ts">
// ALL THE SVG USED ARE OWNED BY https://www.16personalities.com

const props = defineProps({
  name: { required: true, type: String }
})

import Avocat from './Avocat.vue'
import Architecte from './Architecte.vue'
import Mediateur from './Mediateur.vue'
import Protagoniste from './Protagoniste.vue'
import Inspirateur from './Inspirateur.vue'
import Logicien from './Logicien.vue'
import Commandant from './Commandant.vue'
import Innovateur from './Innovateur.vue'
import Logisticien from './Logicien.vue'
import Defenseur from './Defenseur.vue'
import Directeur from './Directeur.vue'
import Consul from './Consul.vue'
import Virstuose from './Virtuose.vue'
import Aventurier from './Aventurier.vue'
import Entrepreneur from './Entrepreneur.vue'
import Amuseur from './Amuseur.vue'

const name = computed(() => props.name)
</script>

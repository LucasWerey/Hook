<template>
  <div class="grid h-full w-full grid-cols-12 gap-6 pt-10">
    <div class="col-span-8 col-end-8 h-screen">Yo</div>
    <div class="col-span-3 col-start-10 h-full">
      <OfferPageSide v-if="offerData" :offerData="offerData" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  offerData: {
    required: true,
    type: Object
  }
})
const offerData = computed(() => props.offerData)
</script>

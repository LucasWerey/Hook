<template>
  <div class="grid h-full w-full grid-cols-12 gap-6 py-10">
    <div class="col-span-8 col-end-8 flex flex-col gap-12">
      <OfferPageCPresentation v-if="offerData" :offerData="offerData" />
      <OfferPageDescription v-if="offerData" :offerData="offerData" />
      <OfferPageTasks v-if="offerData" :offerData="offerData" />
      <OfferPageBenefits v-if="offerData" :offerData="offerData" />
      <OfferPageProcess v-if="offerData" :offerData="offerData" />
      <div class="flex w-full flex-row items-center justify-center gap-6">
        <Button
          :type="'default'"
          state="active"
          :styled="'outlined'"
          class="max-w-[288px] cursor-pointer uppercase"
          style="border-color: rgb(255 86 86)"
        >
          <span class="text-error">refuser</span>
        </Button>
        <Button
          :type="'default'"
          :state="buttonState ? 'active' : 'disabled'"
          :styled="'fill'"
          class="max-w-[288px] cursor-pointer uppercase"
          @click="onButtonClick"
        >
          {{ buttonState ? 'accepter' : 'accepté' }}
        </Button>
      </div>
    </div>
    <div class="col-span-3 col-start-10 h-full">
      <OfferPageSide v-if="offerData" :offerData="offerData" />
    </div>
  </div>
  <SnackBar
    v-if="showSnackbar"
    type="info"
    close="yes"
    size="medium"
    class="fixed bottom-10 right-1/2 z-50 translate-x-1/2 md:w-1/3"
  >
    Le processus de recrutement vient de débuter pour cette offre. Nous avons hâte de travailler
    ensemble !
  </SnackBar>
</template>

<script setup lang="ts">
const props = defineProps({
  offerData: {
    required: true,
    type: Object
  }
})

const showSnackbar = ref(false)
const buttonState = ref(true)
const offerData = computed(() => props.offerData)

const onButtonClick = () => {
  buttonState.value = !buttonState.value
  showSnackbar.value = !showSnackbar.value
  setTimeout(resetSnackbar, 5000)
}

const resetSnackbar = () => {
  showSnackbar.value = false
}
</script>

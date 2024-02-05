import OfferPageHeaderVue from './subComponents/OfferPageHeader.vue';
<template>
  <div class="flex w-full flex-col gap-10 text-basic-black">
    <div class="flex w-full items-center gap-8">
      <IconsBase
        name="moveLeft"
        class="h-10 w-10 cursor-pointer"
        color="darkgrey"
        @click="goToMyDemand"
      />
    </div>
    <OfferPageHeader v-if="offerData" :offer-data="offerData" />
    <OfferPageBody v-if="offerData" :offer-data="offerData" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  offerId: {
    required: true,
    type: String
  }
})

const offerId = computed(() => props.offerId)

const router = useRouter()

const goToMyDemand = () => {
  router.back()
}

const offerData = ref()

watch(
  offerId,
  async newOfferId => {
    if (newOfferId) {
      try {
        offerData.value = await getOffer(newOfferId)
      } catch (error) {
        handleApiError(error)
      }
    }
  },
  { immediate: true }
)
</script>

import OfferPageHeaderVue from './subComponents/OfferPageHeader.vue';
<template>
  <div class="flex w-full flex-col gap-12 text-basic-black">
    <div class="flex w-full items-center gap-8">
      <IconsBase
        name="moveLeft"
        class="h-10 w-10 cursor-pointer"
        color="darkgrey"
        @click="goToMyDemand"
      />
    </div>
    <OfferPageHeader />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  offerId: {
    required: true,
    type: String
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const offerId = computed(() => props.offerId)

const router = useRouter()

const goToMyDemand = () => {
  router.back()
}
</script>

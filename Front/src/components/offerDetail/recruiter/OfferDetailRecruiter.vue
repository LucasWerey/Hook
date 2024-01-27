import SuggestedProfilesVue from './SuggestedProfiles.vue';
<template>
  <div class="flex h-12 w-full flex-col gap-12 text-basic-black">
    <div class="flex w-full items-center gap-8">
      <IconsBase
        name="moveLeft"
        class="h-10 w-10 cursor-pointer"
        color="darkgrey"
        @click="goToMyspace"
      />
      <h2 class="self-baseline text-nowrap text-16 font-800">Mon offre</h2>
    </div>
    <OfferPresentation :offerData="data" />
    <SuggestedProfiles />
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

let data = ref(null)

onMounted(async () => {
  data.value = await getOffer(offerId.value)
})

const router = useRouter()

const goToMyspace = () => {
  router.push('/myspace')
}
</script>

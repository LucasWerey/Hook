<template>
  <div class="flex w-full flex-col gap-12 text-basic-black">
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
    <SuggestedProfiles :offerData="data" @see-profile="goToStudentProfile($event)" />
    <OfferProcess />
  </div>
</template>

<script setup lang="ts">
import { Offer } from '../../../utils/offerApiUtils'
const props = defineProps({
  offerId: {
    required: true,
    type: String
  }
})

const offerId = computed(() => props.offerId)

let data = ref<Offer>()

onMounted(async () => {
  //@ts-ignore
  data.value = await getOffer(offerId.value)
})

const router = useRouter()

const goToStudentProfile = (event: any) => {
  router.push({
    name: 'StudentProfileRecruiter',
    params: { offerId: offerId.value, studentId: event.student_id.$oid }
  })
}

const goToMyspace = () => {
  router.push('/myspace')
}
</script>

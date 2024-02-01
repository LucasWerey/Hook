<template>
  <div class="flex w-full flex-col gap-12 text-basic-black">
    <div class="flex w-full items-center gap-8">
      <IconsBase
        name="moveLeft"
        class="h-10 w-10 cursor-pointer"
        color="darkgrey"
        @click="goToMyspace"
      />
      <h2 class="self-baseline text-nowrap text-16 font-800">Ma demande</h2>
    </div>
    <DemandDetailHeader v-if="data && data.profile" :demandInfo="data.profile.jobWanted" />
    <DemandDetailKey />
    <DemandDetailMatchs v-if="matchs" :matchsInfo="matchs" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  studentId: {
    required: true,
    type: String
  }
})

const studentId = computed(() => props.studentId)

let data = ref()
const allOffers = ref<any[]>([])

onMounted(async () => {
  //@ts-ignore
  data.value = await getStudent(studentId.value)
  allOffers.value = await getAllOffers()
})

const router = useRouter()

const goToMyspace = () => {
  router.push('/myspace')
}

interface Match {
  student_id: {
    $oid: string
  }
  globalMatch: string
}

interface Offer {
  details: {
    contract_type: string
    location: string
    position_name: string
  }
  id_company: {
    $oid: string
  }
  matchs: Match[]
}

interface MatchResult {
  contract_type: string
  globalMatch: string | null
  id_company: string
  location: string
  position_name: string
  companyName: string
}

const matchs = ref<MatchResult[]>([])

watchEffect(async () => {
  const offers = allOffers.value.filter((offer: Offer) =>
    offer.matchs.some(({ student_id }) => student_id.$oid === studentId.value)
  )

  matchs.value = await Promise.all(
    offers.map(async (offer: Offer) => {
      const {
        details: { contract_type, location, position_name },
        id_company,
        matchs
      } = offer
      const match = matchs.find(({ student_id }) => student_id.$oid === studentId.value)
      const companyResponse = await getCompany(id_company.$oid)
      const companyName = companyResponse.data.name_company
      return {
        companyName: companyName,
        contract_type,
        globalMatch: match ? match.globalMatch : null,
        id_company: id_company.$oid,
        location,
        position_name
      }
    })
  )
})
</script>

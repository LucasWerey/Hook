<template>
  <div class="flex min-h-full w-full flex-col gap-6">
    <div class="flex w-full items-end gap-4">
      <InputField
        v-model="searchModel"
        label=""
        placeholder="Rechercher une offre"
        class="max-w[500px] mt-[-24px] w-2/5"
      />
      <Button
        @click="handleSearch"
        class="w-1/5 max-w-[140px] bg-basic-black uppercase"
        styled="fill"
        state="active"
        type="default"
      >
        Rechercher
      </Button>
    </div>
    <div class="flex w-full flex-col">
      <div class="font-eina1 text-4 font-normal">Filtrer par :</div>
      <div class="flex flex-col gap-4 md:flex-row">
        <SelectField
          class="text-nowrap"
          :options="typeFilterOptions"
          v-model="typeFilterModel"
          default="type"
          title=""
          @change="handleFilterByType"
        />
        <SelectField
          :options="durationFilterOptions"
          v-model="durationFilterModel"
          default="Durée"
          title=""
        />
        <SelectField
          :options="expirationDateFilterOptions"
          v-model="expDateFilterModel"
          default="Date d'expiration"
          title=""
        />
        <SelectField
          :options="groupFilterOptions"
          v-model="groupFilterModel"
          default="Groupe"
          title=""
        />
      </div>
    </div>
    <div v-if="isStoreReady" class="flex w-full flex-wrap gap-6">
      <OfferCard type="empty" @createOffer="emit('createOffer')" />
      <OfferCard
        v-for="(offer, index) in detailedOffers"
        :key="index"
        type="fill"
        :title="offer.details.position_name"
        :location="offer.details.location"
        :contract-type="offer.details.contract_type"
        :contract-duration="offer.details.contract_duration"
        :id="offer._id.$oid"
        :nCandidates="offer.matchs[0] ? offer.matchs.length : 0"
        :student-names="offer.matchs.map((match: any) => match.studentName).slice(0, 4)"
        :desktopColor="offer.details.color"
        :notification="
          actualNumberOfStudentsMatched.find(
            offerMatchCount => offerMatchCount.id === offer._id.$oid
          )?.newCount || 0
        "
        @seeOffer="() => console.log(companyStore.companies[0])"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const companyStore = useCompanyStore()
const recruiterStore = useRecruiterStore()
const isStoreReady = computed(() => recruiterStore.recruiters.length > 0)
const companyDetailedOffers = computed(() => companyStore.companies[0].detailed_offers)
const detailedOffers = ref(companyDetailedOffers.value)

const typeFilterModel = ref('')
const durationFilterModel = ref('')
const expDateFilterModel = ref('')
const groupFilterModel = ref('')
const searchModel = ref('')

const actualNumberOfStudentsMatched = ref(
  detailedOffers.value.map(offer => ({
    count: offer.matchs.length,
    id: offer._id.$oid,
    newCount: 0
  }))
)

const checkForNewProfiles = async () => {
  // @ts-ignore
  const offers = await getOfferByCompany(companyStore.companies[0]._id.$oid)
  actualNumberOfStudentsMatched.value.forEach((offerMatchCount, index) => {
    const correspondingOffer = offers.find(offer => offer._id.$oid === offerMatchCount.id)
    if (correspondingOffer && offerMatchCount.count < correspondingOffer.matchs.length) {
      actualNumberOfStudentsMatched.value[index].newCount =
        correspondingOffer.matchs.length - offerMatchCount.count
      actualNumberOfStudentsMatched.value[index].count = correspondingOffer.matchs.length
    }
  })
}

setTimeout(() => {
  setInterval(checkForNewProfiles, 60000)
}, 60000)

const typeFilterOptions = [
  { label: 'Stage ou alternance', value: 'stage ou alternance' },
  { label: 'Stage', value: 'stage' },
  { label: 'Alternance', value: 'alternance' }
]

const durationFilterOptions = [
  { label: "Moins d'un mois", value: "Moins d'un mois" },
  { label: '1 à 3 mois', value: '1 à 3 mois' },
  { label: '3 à 6 mois', value: '3 à 6 mois' },
  { label: '6 mois à 1 an', value: '6 mois à 1 an' },
  { label: '1 an ou plus', value: '1 an ou plus' }
]

const groupFilterOptions = [
  {
    label: 'Groupe 1',
    value: 'Groupe 1'
  }
]

const expirationDateFilterOptions = [
  {
    label: "Date d'expiration",
    value: "Date d'expiration"
  }
]

watch(searchModel, () => {
  handleSearch()
})

watch(typeFilterModel, () => {
  handleFilterByType()
})

const handleSearch = () => {
  const filteredOffers = companyDetailedOffers.value.filter(offer =>
    JSON.stringify(offer).toLowerCase().includes(searchModel.value.toLowerCase())
  )
  detailedOffers.value = filteredOffers
  return filteredOffers
}

const handleFilterByType = () => {
  if (typeFilterModel.value === 'type' || typeFilterModel.value === 'stage ou alternance') {
    detailedOffers.value = companyDetailedOffers.value
    return companyDetailedOffers.value
  }
  const filteredOffers = companyDetailedOffers.value.filter(
    offer => offer.details.contract_type === typeFilterModel.value.toLocaleLowerCase()
  )
  detailedOffers.value = filteredOffers
  return filteredOffers
}

const emit = defineEmits(['createOffer'])
</script>

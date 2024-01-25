<template>
  <div class="flex h-full w-full flex-col gap-6">
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
    <div v-if="isStoreReady" class="flex h-full w-full items-center justify-center">
      <p v-for="(offer, index) in detailedOffers" :key="index">{{ offer.details }}</p>
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
  console.log(companyDetailedOffers.value)
  detailedOffers.value = filteredOffers
  return filteredOffers
}
</script>

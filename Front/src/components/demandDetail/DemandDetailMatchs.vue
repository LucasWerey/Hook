<template>
  <div class="flex flex-col gap-2">
    <h2 class="col-span-7 font-eina1 text-4 font-bold uppercase">Vos matchs</h2>
    <div class="grid-template">
      <h3 class="ml-6 text-3 font-bold uppercase text-primary-moonstone">Etat</h3>
      <h3 class="text-3 font-bold uppercase text-primary-moonstone">Intitulé du poste</h3>
      <h3 class="text-3 font-bold uppercase text-primary-moonstone">Logo</h3>
      <h3 class="text-3 font-bold uppercase text-primary-moonstone">Entreprise</h3>
      <h3 class="text-3 font-bold uppercase text-primary-moonstone">Type</h3>
      <h3 class="text-3 font-bold uppercase text-primary-moonstone">Lieu</h3>
      <h3 class="mb-3 text-3 font-bold uppercase text-primary-moonstone">Compatibilité</h3>
      <div
        v-for="(match, index) in mappedMatches"
        :key="index"
        class="grid-template col-span-8 min-h-[72px] bg-basic-verylightgrey px-2"
        :class="{
          'bg-error bg-opacity-10': index === 2,
          ' bg-basic-white': index % 2 !== 0,
          'rounded-t-md': index === 0,
          'rounded-b-md': index === mappedMatches.length - 1
        }"
      >
        <div class="flex items-center">
          <ChipContainer class="flex w-fit items-center self-center" :label="match.status" />
        </div>
        <div class="flex items-center">{{ match.positionName }}</div>
        <div class="flex items-center">
          <img
            :src="getLogoPath(match.companyName)"
            class="w-14 object-contain"
            alt="Company Logo"
          />
        </div>
        <div class="DS-text-body flex items-center font-eina1">{{ match.companyName }}</div>
        <div class="DS-text-body flex items-center font-eina1">{{ match.contractType }}</div>
        <div class="DS-text-body flex items-center font-eina1">{{ match.location }}</div>
        <div
          class="DS-text-body-bold flex items-center font-eina1"
          :class="{
            'text-success': parseInt(match.globalMatch) > 80,
            'text-warning': parseInt(match.globalMatch) <= 80
          }"
        >
          {{ match.globalMatch }}
        </div>
        <div class="flex w-11/12 items-center justify-end">
          <Button
            :type="'default'"
            :icon="'none'"
            :state="'active'"
            :iconPosition="'none'"
            :styled="index === 2 ? 'outlined' : 'fill'"
            :isLight="index % 2 !== 0"
            class="max-w-[139px] uppercase"
            :class="{
              'border-none bg-error ': index === 2
            }"
            :style="{ 'background-color': index % 2 !== 0 ? 'white' : '' }"
            @click="seeOffer(match.offerId)"
          >
            <span :class="index === 2 ? 'text-basic-white' : ''">Voir l'offre</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultLogo from '@/assets/images/companiesLogo/hookLogo.png'

const props = defineProps({
  matchsInfo: {
    required: true,
    type: Object
  }
})

const matchsInfo = computed(() => props.matchsInfo)

const mappedMatches = computed(() => {
  return matchsInfo.value
    .map((match: any, index: number) => ({
      companyName: capitalizeFirstLetter(match.companyName),
      contractType: capitalizeFirstLetter(match.contract_type),
      globalMatch: match.globalMatch,
      id_company: match.id_company,
      location: capitalizeFirstLetter(match.location),
      offerId: match.offerId,
      positionName: capitalizeFirstLetter(match.position_name),
      status: getStatus(index)
    }))
    .sort((a: any, b: any) => {
      const aMatch = Number(a.globalMatch.replace('%', ''))
      const bMatch = Number(b.globalMatch.replace('%', ''))
      return bMatch - aMatch
    })
})

function capitalizeFirstLetter(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const router = useRouter()

const seeOffer = (offerId: string) => {
  router.push({
    name: 'Offer',
    params: { offerId }
  })
}

function getStatus(index: number) {
  if (index === 2) {
    return 'En attente de lecture'
  } else if (index === 0) {
    const interviewDate = new Date('2024-02-12')
    return `Entretien prévu le ${formatDate(interviewDate)}`
  } else if (index === 1) {
    return 'Refusé'
  } else {
    return 'En attente de lecture'
  }
}

function formatDate(dateString: Date) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

const getLogoPath = (name: string) => {
  if (!name) {
    return defaultLogo
  }
  const company = companyLogo.find(company => company.name.toLowerCase() === name.toLowerCase())
  return company ? company.src : 'defaultLogo'
}
</script>

<style scoped>
.grid-template {
  display: grid;
  grid-template-columns: 1.3fr 1.3fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
}
</style>

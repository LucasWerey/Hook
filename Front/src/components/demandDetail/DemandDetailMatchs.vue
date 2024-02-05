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
        <div class="flex items-center">{{ match.state }}</div>
        <div class="flex items-center">{{ match.positionName }}</div>
        <div class="flex items-center"><IconsBase name="logo" class="w-[50px]" /></div>
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
const props = defineProps({
  matchsInfo: {
    required: true,
    type: Object
  }
})

const matchsInfo = computed(() => props.matchsInfo)

const mappedMatches = computed(() => {
  return matchsInfo.value
    .map((match: any) => ({
      companyName: capitalizeFirstLetter(match.companyName),
      contractType: capitalizeFirstLetter(match.contract_type),
      globalMatch: match.globalMatch,
      id_company: match.id_company,
      location: capitalizeFirstLetter(match.location),
      offerId: match.offerId,
      positionName: capitalizeFirstLetter(match.position_name)
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
</script>

<style scoped>
.grid-template {
  display: grid;
  grid-template-columns: 1fr 1.3fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
}
</style>

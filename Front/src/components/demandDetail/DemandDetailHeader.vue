<template>
  <div class="flex h-64 w-full gap-6 rounded-xl bg-basic-verylightgrey p-6">
    <IconsBase name="desktop" class="min-h-40 min-w-40 overflow-hidden" size="large" />
    <div class="flex w-3/5 flex-col justify-between">
      <div class="flex flex-col gap-2">
        <h1 class="DS-text-h3 font-inter">{{ demandDetails.demandTitle }}</h1>
        <div class="flex items-center gap-2">
          <ChipContainer :label="demandDetails.contractType" />
          <ChipContainer :label="demandDetails.duration" />
        </div>
        <div class="flex items-center gap-2">
          <IconsBase name="mapPin" color="darkgrey" class="h-5 w-5" size="small" />
          <p class="font-eina1 text-4 text-basic-darkgrey">{{ demandDetails.location }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex w-fit flex-col gap-2">
          <div class="flex gap-2">
            <h2 class="DS-text-body-bold font-eina1 text-primary-moonstone">
              Votre demande est compétée à {{ demandDetails.progress + '%' }}
            </h2>
            <IconsBase name="info" color="grey" class="h-[15px] w-[15px]" size="small" />
          </div>
          <div class="h-2 w-full rounded bg-primary-lightmoonstone">
            <div
              class="h-full rounded bg-primary-moonstone"
              :style="{ width: demandDetails.progress + '%' }"
            />
          </div>
        </div>
        <div class="flex gap-4">
          <Button
            :type="'default'"
            :state="'active'"
            class="max-h-8 max-w-fit text-nowrap border-none bg-primary-lightmoonstone uppercase"
            :styled="'fill'"
            isLight
          >
            <span class="text-primary-moonstone"> ajouter des mots clés</span>
          </Button>
          <Button
            v-if="demandDetails.transportDuration === ''"
            :type="'default'"
            :state="'active'"
            class="max-h-8 max-w-fit text-nowrap border-none bg-primary-lightmoonstone uppercase"
            :styled="'fill'"
            isLight
          >
            <span class="text-primary-moonstone"> ajouter un temps de transport</span>
          </Button>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-end gap-2">
      <Button
        type="default"
        state="active"
        styled="outlined"
        class="max-h-8 max-w-28 border-none border-basic-verylightgrey bg-basic-white uppercase"
      >
        Modifier
      </Button>
      <Button
        type="default"
        state="active"
        styled="outlined"
        class="max-h-8 max-w-28 border-none border-basic-verylightgrey bg-basic-white uppercase"
      >
        <p class="text-error">SUPPRIMER</p>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  demandInfo: {
    required: true,
    type: Object
  }
})

const demandDetails = computed(() => {
  const info = props.demandInfo[0]
  return {
    contractType: info.contract_type,
    demandTitle: info.name,
    duration: info.duration,
    location: info.location,
    progress: progressCalcul(),
    transportDuration: info.transportDuration
  }
})

const progressCalcul = () => {
  const info = props.demandInfo[0]
  const fields = ['contract_type', 'name', 'duration', 'location', 'transportDuration']
  let filledFields = 0

  fields.forEach(field => {
    if (info[field]) filledFields++
  })

  return Math.floor((filledFields / (fields.length + 1)) * 100)
}
</script>

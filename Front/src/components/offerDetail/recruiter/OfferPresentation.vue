<template>
  <div class="flex w-full gap-2 rounded-xl bg-basic-white p-6">
    <div class="flex w-full gap-6">
      <IconsBase name="desktop" class="h-40 w-40" :color="color" />
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <h1 class="text-8 font-800">{{ position_name }}</h1>
          <div class="flex gap-2">
            <ChipContainer :label="contract_type" />
            <ChipContainer :label="contract_duration" />
          </div>
          <div class="flex items-center gap-1">
            <IconsBase name="mapPin" size="small" color="grey" />
            <p class="font-eina1 text-4 text-basic-darkgrey">{{ location }}</p>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-1">
            <h4 class="font-eina1 text-4 font-bold text-primary-moonstone">
              Votre offre est complétée à {{ progressValue }}%
            </h4>
            <IconsBase name="info" color="grey" class="h-4 w-4 self-start" />
          </div>
          <div class="h-2 w-4/5 rounded bg-primary-lightmoonstone">
            <div
              class="h-full rounded bg-primary-moonstone"
              :style="{ width: progressValue + '%' }"
            ></div>
          </div>
        </div>
        <Button
          :type="'default'"
          :state="'active'"
          class="max-h-8 max-w-96 text-nowrap uppercase"
          :styled="'fill'"
          isLight
        >
          aJOUTER UN NIVEAU D’expérience souhaité
        </Button>
      </div>
    </div>
    <Button
      type="default"
      state="active"
      styled="outlined"
      class="max-h-8 max-w-28 border-0 bg-basic-verylightgrey uppercase"
    >
      Modifier
    </Button>
    <Button
      type="default"
      state="active"
      styled="outlined"
      class="max-h-8 max-w-28 border-0 bg-basic-verylightgrey uppercase text-error"
    >
      <p class="text-error">SUPPRIMER</p>
    </Button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  offerData: Object
})

const offerDetails = computed(() => {
  if (props.offerData && props.offerData.details) {
    const { position_name, contract_duration, contract_type, location, color } =
      props.offerData.details
    return { color, contract_duration, contract_type, location, position_name }
  }
  return {}
})

const position_name = computed(() => offerDetails.value.position_name)
const contract_duration = computed(() => offerDetails.value.contract_duration)
const contract_type = computed(() => offerDetails.value.contract_type)
const location = computed(() => offerDetails.value.location)
const color = computed(() => offerDetails.value.color)

let progressValue = ref(50)
</script>

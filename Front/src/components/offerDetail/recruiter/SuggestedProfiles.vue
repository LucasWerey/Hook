<template>
  <div class="flex w-full gap-2 text-nowrap">
    <h2 class="font-eina1 text-4 font-bold uppercase">Profils suggérés</h2>
    <IconsBase name="info" class="cursor-pointer" size="small" color="darkgrey" />
    {{ matchingStudents }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  offerData: {
    type: Object
  }
})

interface Match {
  globalMatch: string
  // include other properties of match if there are any
}

const offerDetails = computed(() => {
  if (props.offerData && props.offerData.details) {
    const { compatibility_min } = props.offerData.details
    return { compatibility_min }
  }
  return {}
})

const compatibility_min = computed(() =>
  parseInt(offerDetails.value.compatibility_min.replace('%', ''))
)
const matchs = computed(() => (props.offerData ? props.offerData.matchs : []))

const matchingStudents = computed(() => {
  return matchs.value.filter(
    (match: Match) => parseInt(match.globalMatch) >= compatibility_min.value
  )
})
</script>

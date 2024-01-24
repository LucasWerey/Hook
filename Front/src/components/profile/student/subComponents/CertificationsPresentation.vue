<template>
  <div
    class="flex h-full max-h-[270px] w-full max-w-[380px] flex-col gap-2 rounded-[20px] border border-basic-lightgrey bg-basic-white p-6 shadow-sm"
  >
    <div class="flex w-full justify-end gap-4">
      <IconsBase name="pencil" color="grey" class="h-5 w-5 cursor-pointer" />
      <IconsBase name="trash" color="grey" class="h-5 w-5 cursor-pointer" />
    </div>
    <Avatar :type="'initial'" :size="'large'" :src="''" :alt="''"> CC </Avatar>
    <h4 class="self-center font-eina1 text-4 font-bold">{{ info.certificationName }}</h4>
    <div
      class="flex w-full flex-col items-center justify-center gap-1 overflow-hidden text-nowrap align-middle"
    >
      <h5 class="font-eina1 text-4 font-normal">{{ info.issuedBy }}</h5>
      <h5 class="font-eina1 text-4 font-normal italic text-basic-darkgrey">
        Date de délivrance : {{ formattedDate }}
      </h5>
      <h5 class="font-eina1 text-4 font-normal italic text-basic-darkgrey">
        Identifiant de la certification : {{ info.certifId }}
      </h5>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  info: {
    required: true,
    type: Object
  }
})
const info = computed(() => props.info)

const formattedDate = computed(() => {
  const date = new Date(Number(props.info.deliveryDate.$date.$numberLong))
  const formatted = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' }).format(
    date
  )
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
})
</script>

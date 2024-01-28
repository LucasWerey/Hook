<template>
  <h4 class="font-eina1 text-2 font-700 uppercase">Personnaliser mon espace</h4>
  <div class="flex items-center gap-7">
    <IconsBase :color="equivalentColor" name="desktop" class="h-20 w-20" />
    <div class="flex h-full items-center">
      <hr class="h-4/5 border border-basic-grey" />
    </div>
    <SelectField
      title=""
      v-model="type"
      :options="typeOptions"
      :default="typeOptions[0].label"
      class="-mt-4 max-h-[48px] min-w-[279px] max-w-[279px] text-nowrap"
    />

    <SelectField
      title=""
      v-model="colors"
      :options="colorsOptions"
      :default="colorsOptions[0].label"
      class="-mt-4 max-h-[48px] min-w-[279px] max-w-[279px] text-nowrap"
    />
  </div>
</template>

<script setup lang="ts">
type colorType =
  | 'transparent'
  | 'inherit'
  | 'current'
  | 'test'
  | 'basic'
  | 'darkgrey'
  | 'grey'
  | 'lightgrey'
  | 'verylightgrey'
  | 'white'
  | 'primary'
  | 'light'
  | 'charcoal'
  | 'moonstone'
  | 'powder'
  | 'platinum'
  | 'error'
  | 'errorLight'
  | 'lightmoonstone'
  | 'warning'

const type = ref('')
const colors = ref('')
const equivalentColor = ref<colorType>('moonstone')

const typeOptions = ref([{ label: 'Bureautique', value: 'Bureautique' }])
const colorsOptions = ref([
  { equivalent: 'moonstone', label: 'Bleu', value: 'Bleu' },
  { equivalent: 'warning', label: 'Jaune', value: 'Jaune' },
  { equivalent: 'info', label: 'Noir', value: 'Noir' },
  { equivalent: 'error', label: 'Rouge', value: 'Rouge' },
  { equivalent: 'test', label: 'Vert', value: 'Vert' }
])

watch(colors, newColor => {
  const selectedColor = colorsOptions.value.find(option => option.value === newColor)
  if (selectedColor) {
    equivalentColor.value = selectedColor.equivalent as colorType
  }
})
</script>

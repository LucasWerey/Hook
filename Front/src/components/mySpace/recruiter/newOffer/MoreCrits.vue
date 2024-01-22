<template>
  <h4 class="font-eina1 text-2 font-bold uppercase">Quels sont vos critères supplémentaires ?</h4>
  <div class="flex items-center gap-4">
    <CheckBox
      @change="onChange('hobbies')"
      state="unchecked"
      v-model="criteria.hobbies"
      color="transparent"
      size="small"
      class="flex items-center gap-2 font-eina1"
      >Hobbies</CheckBox
    >
    <CheckBox
      @change="onChange('projetsAssociatifs')"
      state="unchecked"
      v-model="criteria.projetsAssociatifs"
      color="transparent"
      size="small"
      class="flex items-center gap-2 font-eina1"
      >Projets associatifs</CheckBox
    >
    <CheckBox
      @change="onChange('sport')"
      state="unchecked"
      v-model="criteria.sport"
      color="transparent"
      size="small"
      class="flex items-center gap-2 font-eina1"
      >Sport</CheckBox
    >
    <CheckBox
      @change="onChange('voyages')"
      state="unchecked"
      v-model="criteria.voyages"
      color="transparent"
      size="small"
      class="flex items-center gap-2 font-eina1"
      >Voyages</CheckBox
    >
    <span class="cursor-pointer font-eina1 text-3 text-basic-grey">+ Ajouter</span>
  </div>
</template>

<script setup lang="ts">
const criteria = ref({
  hobbies: false,
  projetsAssociatifs: false,
  sport: false,
  voyages: false
})

const emit = defineEmits(['update:criteria'])

const onChange = (criteriaName: keyof typeof criteria.value) => {
  criteria.value[criteriaName] = !criteria.value[criteriaName]
  const updatedCriteria = Object.keys(criteria.value).filter(
    key => criteria.value[key as keyof typeof criteria.value]
  )
  emit('update:criteria', updatedCriteria)
}
</script>

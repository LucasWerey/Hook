<template>
  <div>
    <h2 class="text-nowrap text-2 font-bold uppercase">
      Type de contrat recherché <span class="text-error">*</span>
    </h2>
    <div class="flex h-full w-full items-center gap-4 align-middle">
      <input
        type="radio"
        id="stage"
        name="lookForJob"
        value="stage"
        v-model="localModelValue"
        class="cursor-pointer"
      />
      <label
        :class="{ 'font-800': localModelValue === 'stage' }"
        for="stage"
        class="cursor-pointer font-eina1"
        >Stage</label
      >
      <input
        type="radio"
        id="alternance"
        name="lookForJob"
        value="alternance"
        class="cursor-pointer"
        v-model="localModelValue"
      />
      <label
        :class="{ 'font-800': localModelValue === 'alternance' }"
        for="alternance"
        class="cursor-pointer font-eina1"
        >Alternance</label
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

const localModelValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  newValue => {
    localModelValue.value = newValue
  }
)

watch(localModelValue, newValue => {
  emit('update:modelValue', newValue)
})
</script>

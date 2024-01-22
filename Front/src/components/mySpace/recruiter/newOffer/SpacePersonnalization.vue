<template>
  <h4 class="font-eina1 text-2 font-700 uppercase">Personnaliser mon espace</h4>
  <div class="flex items-center gap-7">
    <div class="h-20 w-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="79"
        height="79"
        viewBox="0 0 79 79"
        fill="none"
      >
        <rect width="79" height="79" rx="7" fill="#58A4B01A" />
        <path
          d="M56.033 46.4003V27.2386C56.033 26.1093 55.5802 25.0262 54.7743 24.2277C53.9684 23.4291 52.8753 22.9805 51.7355 22.9805H25.9506C24.8108 22.9805 23.7178 23.4291 22.9118 24.2277C22.1059 25.0262 21.6531 26.1093 21.6531 27.2386V46.4003M56.033 46.4003H21.6531M56.033 46.4003L58.7834 51.8294C58.9491 52.1551 59.0275 52.5176 59.0112 52.882C58.9948 53.2463 58.8843 53.6005 58.6902 53.9104C58.4961 54.2203 58.2248 54.4755 57.9025 54.6517C57.5802 54.8279 57.2176 54.9191 56.8495 54.9166H20.8366C20.4685 54.9191 20.1059 54.8279 19.7836 54.6517C19.4613 54.4755 19.1901 54.2203 18.9959 53.9104C18.8018 53.6005 18.6913 53.2463 18.675 52.882C18.6586 52.5176 18.7371 52.1551 18.9027 51.8294L21.6531 46.4003"
          stroke="#58A4B0"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
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
const type = ref('')
const colors = ref('')

const typeOptions = ref([{ label: 'Bureautique', value: 'Bureautique' }])
const colorsOptions = ref([{ label: 'Bleu', value: 'Bleu' }])
</script>

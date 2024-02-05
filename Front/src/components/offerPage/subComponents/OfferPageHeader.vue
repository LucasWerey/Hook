<template>
  <div class="flex w-full justify-between">
    <div class="flex gap-6">
      <img :src="getLogoPath(companyName)" class="w-40 object-contain" alt="Company Logo" />
      <div class="flex flex-col justify-end gap-2">
        <h1 class="DS-text-h2">{{ title }}</h1>
        <h2 class="text-8 font-500">{{ companyName }}</h2>
        <div class="flex gap-2">
          <ChipContainer :label="contractType" />
          <ChipContainer :label="contractDuration" />
        </div>
        <div class="DS-text-body flex items-center gap-6 font-eina1 text-4 text-basic-darkgrey">
          <div class="flex items-center gap-2">
            <IconsBase name="mapPin" size="small" color="darkgrey" />
            <p>{{ location }}</p>
          </div>
          <div>Rémunération : {{ salary }} brut/mois</div>
          <div>Date d’expiration : {{ convertTimestampToDate(expDate) }}</div>
        </div>
      </div>
    </div>
    <div class="flex h-full items-end">
      <Button :type="'default'" :state="'active'" :styled="'fill'" class="max-w-[288px]">
        Accepter
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultLogo from '@/assets/images/companiesLogo/hookLogo.png'
import { AxiosResponse } from 'axios'

const props = defineProps({
  offerData: {
    required: true,
    type: Object
  }
})

const offerData = computed(() => props.offerData)
const companyId = computed(() => offerData.value.id_company.$oid)

const companyData = ref<AxiosResponse<any, any> | null>(null)

watch(
  companyId,
  async (newCompanyId, oldCompanyId) => {
    if (newCompanyId !== oldCompanyId) {
      try {
        companyData.value = await getCompany(newCompanyId)
      } catch (error) {
        handleApiError(error)
      }
    }
  },
  { immediate: true }
)

const details = computed(() => offerData.value.details)
const title = computed(() => details.value.position_name)
const contractType = computed(() => details.value.contract_type)
const location = computed(() => details.value.location)
const salary = computed(() => details.value.salary)
const contractDuration = computed(() => details.value.contract_duration)
const expDate = computed(() => details.value.exp_date.$date.$numberLong)
const companyName = computed(() => companyData.value?.data.name_company)

const getLogoPath = (name: string) => {
  if (!name) {
    return defaultLogo
  }
  const company = companyLogo.find(company => company.name.toLowerCase() === name.toLowerCase())
  return company ? company.src : 'defaultLogo'
}

function convertTimestampToDate(timestamp: string) {
  const date = new Date(Number(timestamp))
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}
</script>

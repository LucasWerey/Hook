<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <IconsBase name="award" color="powder" class="h-6 w-6" />
      <h2 class="text-center text-8 text-primary-powder">Certifications</h2>
    </div>
    <div class="flex flex-nowrap gap-6">
      <CertifContainer
        v-for="(certification, index) in mappedCertifications"
        :key="index"
        :state="'closed'"
        :image="certification.src"
        :title="certification.certificationName"
        :description="certification.description"
        :date="certification.date"
        :idCertif="certification.id"
        class="max-w-[432px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  dataStudent: { required: true, type: Object }
})

const dataStudent = computed(() => props.dataStudent)
const certifications = computed(() => dataStudent.value?.profile?.certifications)

type Certification = {
  certificationName: string
  description: string
  issuedBy: string
  date: {
    $date: {
      $numberLong: string
    }
  }
  id: string
  src: string
}

const mappedCertifications = computed(() => {
  return certifications.value?.map((certification: Certification) => ({
    certificationName: certification.certificationName,
    date: formatDate(certification.date.$date.$numberLong),
    description: certification.description,
    id: certification.id,
    issuedBy: certification.issuedBy,
    src: certification.src
  }))
})

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const formatDate = (timestamp: string) => {
  const date = new Date(Number(timestamp))
  const formattedDate = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(
    date
  )
  return capitalizeFirstLetter(formattedDate)
}
</script>

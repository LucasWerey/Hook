<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-8 text-primary-powder">Présentation de l’entreprise</h2>
    <div class="flex items-start gap-6">
      <img :src="getLogoPath(companyName)" class="w-20 object-contain" alt="Company Logo" />
      <div class="flex flex-col gap-4">
        <h3 class="text-8">{{ companyName }}</h3>
        <p class="DS-text-body font-eina1">{{ fakeText }}</p>
        <Button
          :type="'default'"
          :state="'active'"
          :styled="'fill'"
          class="w-fit border-none uppercase text-primary-charcoal"
          style="background-color: rgb(236 236 236)"
        >
          Consulter le profil de l’entreprise
        </Button>
      </div>
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
const fakeText = `Chez Captain Hook, nous sommes une équipe d'innovateurs passionnés par la révolution du recrutement grâce à l'intelligence artificielle. Fondée par des experts en technologie et en ressources humaines, notre objectif est de connecter les talents les plus prometteurs aux opportunités qui leur correspondent parfaitement, tout en donnant aux entreprises les outils nécessaires pour des décisions de recrutement éclairées. Notre plateforme analyse minutieusement grâce à l'IA les compétences, les expériences et les comportements des candidats afin de les associer de manière optimale aux offres d'emploi disponibles, ce qui réduit considérablement les délais de recrutement et améliore l'adéquation entre les candidats et les postes. Nous mettons un fort accent sur l'innovation, l'équité et la transparence, favorisant ainsi la diversité et l'inclusion tout au long du processus de recrutement, tout en offrant une expérience utilisateur positive et engageante à chaque étape. Si vous partagez notre passion pour la technologie, les ressources humaines et l'amélioration des processus de recrutement, rejoignez-nous chez Captain Hook. Faites partie d'une équipe dynamique et collaborative qui façonne l'avenir du recrutement avec l'IA. Découvrez comment vous pouvez contribuer à notre mission et faire progresser votre carrière.`

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

const companyName = computed(() => companyData.value?.data.name_company)

const getLogoPath = (name: string) => {
  if (!name) {
    return defaultLogo
  }
  const company = companyLogo.find(company => company.name.toLowerCase() === name.toLowerCase())
  return company ? company.src : 'defaultLogo'
}
</script>

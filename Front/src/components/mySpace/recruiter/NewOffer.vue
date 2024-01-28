<template>
  <div
    class="absolute left-1/2 top-[15%] z-50 flex h-4/5 max-h-[75%] w-full -translate-x-1/2 flex-col items-center overflow-hidden overflow-y-auto rounded-lg bg-basic-white shadow lg:w-[822px]"
  >
    <NewofferHeader @closeModal="emit('closeModal')" />
    <form class="flex w-full flex-col gap-8 overflow-y-auto px-6 py-6" @submit.prevent>
      <InputField
        v-model="formData.lookingForModel"
        :placeholder="'Développeur Web'"
        :label="'Poste Recherché'"
        :hint="'hint'"
        :size="'default'"
        :state="'default'"
        :inputType="'text'"
        :isRequired="true"
        class="w-full"
        @blur="() => console.log('blur')"
      />
      <div class="flex w-full flex-col gap-2">
        <ContractTypeinput v-model="formData.lookForContractTypeModel" />
      </div>
      <div class="flex w-full flex-col gap-6 lg:flex-row">
        <SelectField
          title="Durée*"
          v-model="formData.contractDurationModel"
          :options="newOfferContractDurationOptions"
          default="Selectionner"
          class="max-h-[200px] min-w-[200px] max-w-[200px] text-nowrap"
        />
        <InputField
          label="Localisation"
          v-model="formData.contractLocationModel"
          default="Selectionner"
          class="w-full text-nowrap"
          placeholder="Paris"
          isRequired
        />
      </div>
      <div class="flex w-full flex-col gap-6 lg:flex-row">
        <InputField
          v-model="formData.expirationDateModel"
          :placeholder="'placeholder'"
          :label="`Date d'expiration`"
          :hint="'hint'"
          isDateInput
          isRequired
          :size="'default'"
          state="default"
        />
        <InputField
          v-model="formData.gratificationModel"
          :placeholder="'1000€ - 2000€'"
          :label="'Salaire/gratification'"
          :hint="'hint'"
          :hasIcon="false"
          :isDateInput="false"
          :size="'default'"
          :state="'default'"
          :inputType="'text'"
          :isRequired="true"
          @blur="() => console.log('blur')"
        />
      </div>
      <InputField
        v-model="formData.descriptionModel"
        :placeholder="largeInputPlaceholder"
        :label="`Description de l'offre`"
        :hint="'hint'"
        :hasIcon="false"
        :isDateInput="false"
        :size="'big'"
        :state="'default'"
        :inputType="'text'"
        :isRequired="true"
        class="w-full"
        @blur="() => console.log('blur')"
      />
      <InputField
        v-model="formData.missionModel"
        :placeholder="largeInputPlaceholder"
        :label="`Missions associées`"
        :hint="'hint'"
        :hasIcon="false"
        :isDateInput="false"
        :size="'big'"
        :state="'default'"
        :inputType="'text'"
        :isRequired="true"
        class="w-full"
        @blur="() => console.log('blur')"
      />
      <InputField
        v-model="formData.avantagesModel"
        :placeholder="largeInputPlaceholder"
        :label="`Avantages`"
        :hint="'hint'"
        :hasIcon="false"
        :isDateInput="false"
        :size="'big'"
        :state="'default'"
        :inputType="'text'"
        :isRequired="true"
        class="w-full"
        @blur="() => console.log('blur')"
      />
      <hr class="border-b border-basic-lightgrey" />
      <div class="flex flex-col gap-4">
        <h4 class="font-eina1 text-4 font-bold text-primary-moonstone">Critères Techniques</h4>
        <div class="flex w-full flex-col gap-[1.875rem]">
          <div class="flex min-h-[110px] flex-col gap-4">
            <div class="flex flex-col items-end gap-2 lg:flex-row">
              <InputField
                class="w-3/4"
                v-model="formData.formationsWantedModel"
                placeholder="Ecole d'ingénieur"
                label="Formations souhaitées"
                @keyup.enter="addChipFormation"
              />
              <Button
                type="default"
                styled="fill"
                class="w-1/4"
                state="active"
                @click.prevent="addChipFormation"
                isLight
              >
                Ajouter
              </Button>
            </div>
            <div class="flex w-full flex-row gap-2 overflow-auto">
              <ChipContainer
                v-for="label in formationsWanted"
                :label="label"
                :key="label"
                hasIcon
                iconPosition="trailing"
                @deleteChip="deleteChipFormation(label)"
              />
            </div>
          </div>
          <div class="flex min-h-[110px] flex-col gap-4 lg:flex-row">
            <SelectField
              title="Expériences professionnelles"
              v-model="formData.professionalExperienceDurationModel"
              :options="newOfferProfessionalExperienceDurationOptions"
              :default="newOfferProfessionalExperienceDurationOptions[0].label"
              class="max-h-[200px] min-w-[250px] max-w-[250px] text-nowrap"
            />
            <div class="flex w-full flex-col gap-4">
              <div class="flex flex-col items-end gap-2 lg:flex-row">
                <InputField
                  class="w-full"
                  v-model="formData.certificationsModel"
                  placeholder="Jsp l'ékip"
                  label="Certification souhaitées"
                  @keyup.enter="addChipCertification"
                />
                <Button
                  type="default"
                  styled="fill"
                  class="w-1/4"
                  state="active"
                  @click.prevent="addChipCertification"
                  isLight
                >
                  Ajouter
                </Button>
              </div>
              <div class="flex w-full flex-row gap-2 overflow-auto">
                <ChipContainer
                  v-for="label in certifications"
                  :label="label"
                  :key="label"
                  hasIcon
                  iconPosition="trailing"
                  @deleteChip="deleteChipCertification(label)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h4 class="font-eina1 text-4 font-bold text-primary-moonstone">Critères de personnalité</h4>
        <div class="flex w-full flex-col gap-[1.875rem]">
          <div class="flex min-h-[110px] flex-col gap-4">
            <div class="flex flex-col items-end gap-2 lg:flex-row">
              <InputField
                class="w-3/4"
                v-model="formData.softSkillsModel"
                placeholder="Agilité"
                label="Soft skills"
                @keyup.enter="addChipSoftSkill"
              />
              <Button
                type="default"
                styled="fill"
                class="w-1/4"
                state="active"
                @click.prevent="addChipSoftSkill"
                isLight
              >
                Ajouter
              </Button>
            </div>
            <div class="flex w-full flex-row gap-2 overflow-auto">
              <ChipContainer
                v-for="label in softSkills"
                :label="label"
                :key="label"
                hasIcon
                iconPosition="trailing"
                @deleteChip="deleteChipSoftSkill(label)"
              />
            </div>
          </div>
          <div class="flex min-h-[110px] flex-col gap-4">
            <div class="flex flex-col items-end gap-2 lg:flex-row">
              <InputField
                class="w-3/4"
                v-model="formData.hardSkillsModel"
                placeholder="Soudure"
                label="Hard skills"
                @keyup.enter="addChipHardSkill"
              />
              <Button
                type="default"
                styled="fill"
                class="w-1/4"
                state="active"
                @click.prevent="addChipHardSkill"
                isLight
              >
                Ajouter
              </Button>
            </div>
            <div class="flex w-full flex-row gap-2 overflow-auto">
              <ChipContainer
                v-for="label in hardSkills"
                :label="label"
                :key="label"
                hasIcon
                iconPosition="trailing"
                @deleteChip="deleteChipHardSkill(label)"
              />
            </div>
          </div>
          <div class="flex w-full flex-col gap-2">
            <MoreCrits @update:criteria="formData.moreCriteriasModel = $event" />
          </div>
          <div class="flex min-h-[110px] flex-col gap-4">
            <div class="flex flex-col items-end gap-2 lg:flex-row">
              <InputField
                class="w-3/4"
                v-model="formData.personnalityCriteriaModel"
                placeholder="Agilité"
                label="Personnalités souhaitées"
                @keyup.enter="addChipPersolanityCriteria"
              />
              <Button
                type="default"
                styled="fill"
                class="w-1/4"
                state="active"
                @click.prevent="addChipPersolanityCriteria"
                isLight
              >
                Ajouter
              </Button>
            </div>
            <div class="flex w-full flex-row gap-2 overflow-auto">
              <ChipContainer
                v-for="label in persolanityCriterias"
                :label="label"
                :key="label"
                hasIcon
                iconPosition="trailing"
                @deleteChip="deleteChipPersolanityCriteria(label)"
              />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-b border-basic-lightgrey" />
      <div class="flex w-full flex-col gap-2">
        <h2 class="font-eina1 text-3 font-bold uppercase">Classer ces facteurs par priorité</h2>
        <div class="space-y-4">
          <RankingContainer
            v-for="(container, index) in itemsRank.values()"
            :key="index"
            :title="container.title"
            :labels="container.labels"
            :topRank="container.topRank"
            draggable="true"
            isDraggable
            @dragstart="(event: DragEvent) => handleDragStart(event, index)"
            @dragover="handleDragOver"
            @drop="(event: DragEvent) => handleDrop(event, index)"
          />
        </div>
      </div>
      <div class="flex w-full flex-col gap-3">
        <CompatibilityInput
          @update:value="newValue => (formData.minimumCompatibilityModel = newValue)"
        />
      </div>
      <hr class="border-b border-basic-lightgrey" />
      <div class="flex w-full flex-col gap-3">
        <SpacePersonnalization @updateColor="handleUpdateColor($event)" />
      </div>
      <span class="font-eina1 text-3 text-error">*Champs obligatoires</span>
      <div class="flex w-full items-center justify-center">
        <Button
          type="default"
          :state="areAllRequiredFieldsFilled ? 'active' : 'disabled'"
          styled="fill"
          class="uppercase"
          icon-position="trailing"
          @click="handleSubmit"
        >
          Enregistrer mon offre
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const formData = reactive({
  avantagesModel: ref(''),
  certificationsModel: ref(''),
  contractDurationModel: ref(''),
  contractLocationModel: ref(''),
  descriptionModel: ref(''),
  expirationDateModel: ref(''),
  formationsWantedModel: ref(''),
  colorModel: ref(''),
  gratificationModel: ref(''),
  hardSkillsModel: ref(''),
  lookForContractTypeModel: ref(''),
  lookingForModel: ref(''),
  minimumCompatibilityModel: ref(''),
  missionModel: ref(''),
  moreCriteriasModel: ref([]),
  personnalityCriteriaModel: ref(''),
  professionalExperienceDurationModel: ref(''),
  softSkillsModel: ref('')
})

const largeInputPlaceholder =
  'Lorem ipsum dolor sit amet consectetur. Malesuada sit quis nec sed phasellus dui gravida. Magna varius tortor sed nisl augue. Mauris massa morbi aliquam nunc molestie adipiscing. '

const formationsWantedRef: Ref<string[]> = ref([])
const formationsWanted = computed(() => formationsWantedRef.value)

const addChipFormation = () => {
  if (formData.formationsWantedModel === '') return
  addChip(formationsWantedRef, formData.formationsWantedModel)
  formData.formationsWantedModel = ''
}

const deleteChipFormation = (label: string) => {
  deleteChip(formationsWantedRef, label)
}

const certificationsRef: Ref<string[]> = ref([])
const certifications = computed(() => certificationsRef.value)

const addChipCertification = () => {
  if (formData.certificationsModel === '') return
  addChip(certificationsRef, formData.certificationsModel)
  formData.certificationsModel = ''
}

const deleteChipCertification = (label: string) => {
  deleteChip(certificationsRef, label)
}

const softSkillsRef: Ref<string[]> = ref([])
const softSkills = computed(() => softSkillsRef.value)

const addChipSoftSkill = () => {
  if (formData.softSkillsModel === '') return
  addChip(softSkillsRef, formData.softSkillsModel)
  formData.softSkillsModel = ''
}

const deleteChipSoftSkill = (label: string) => {
  deleteChip(softSkillsRef, label)
}

const hardSkillsRef: Ref<string[]> = ref([])
const hardSkills = computed(() => hardSkillsRef.value)

const addChipHardSkill = () => {
  if (formData.hardSkillsModel === '') return
  addChip(hardSkillsRef, formData.hardSkillsModel)
  formData.hardSkillsModel = ''
}

const deleteChipHardSkill = (label: string) => {
  deleteChip(hardSkills, label)
}

const persolanityCriteriaRef: Ref<string[]> = ref([])
const persolanityCriterias = computed(() => persolanityCriteriaRef.value)

const addChipPersolanityCriteria = () => {
  if (formData.personnalityCriteriaModel === '') return
  addChip(persolanityCriteriaRef, formData.personnalityCriteriaModel)
  formData.personnalityCriteriaModel = ''
}

const deleteChipPersolanityCriteria = (label: string) => {
  deleteChip(persolanityCriteriaRef, label)
}

const professionalExperiencedurationRef: Ref<string[]> = ref([])
const professionalExperienceduration = computed(() => professionalExperiencedurationRef.value)

watch(
  () => formData.professionalExperienceDurationModel,
  newVal => {
    professionalExperiencedurationRef.value = []
    professionalExperiencedurationRef.value.push(newVal)
  }
)

const moreCriteriasRef: Ref<string[]> = ref([])
const moreCriterias = computed(() => moreCriteriasRef.value)

watch(
  () => formData.moreCriteriasModel,
  newVal => {
    moreCriteriasRef.value = [...newVal]
  }
)

const itemsRank = ref([
  {
    draggable: true,
    labels: formationsWanted.value,
    title: 'Formations souhaitées',
    topRank: true
  },
  {
    draggable: true,
    labels: persolanityCriterias.value,
    title: 'Personnalités souhaitées',
    topRank: true
  },
  {
    draggable: true,
    labels: professionalExperienceduration,
    title: 'Expériences professionnelles',
    topRank: true
  },
  {
    draggable: true,
    labels: certifications.value,
    title: 'Certifications souhaitées',
    topRank: false
  },
  {
    draggable: true,
    labels: moreCriterias,
    title: 'Critères supplémentaires',
    topRank: false
  },
  {
    draggable: true,
    labels: softSkills.value,
    title: 'Soft skills',
    topRank: false
  }
])

let draggedItem: Ref<number | null> = ref(null)

const handleDragStart = async (event: any, index: number) => {
  event.stopPropagation()
  await new Promise(resolve => setTimeout(resolve, 0))
  draggedItem.value = index
}

const handleDragOver = (event: any) => {
  event.preventDefault()
  event.stopPropagation()
}

const handleDrop = (event: any, index: number) => {
  event.stopPropagation()
  if (draggedItem.value !== null) {
    const controlsCopy = [...itemsRank.value]
    const draggedContainer = controlsCopy[draggedItem.value]
    controlsCopy.splice(draggedItem.value, 1)
    controlsCopy.splice(index, 0, draggedContainer)
    for (let i = 0; i < controlsCopy.length; i++) {
      controlsCopy[i].topRank = i < 3
    }
    itemsRank.value = controlsCopy
  }
}

const areAllRequiredFieldsFilled = computed(() => {
  return (
    formData.lookingForModel !== '' &&
    formData.lookForContractTypeModel !== '' &&
    formData.contractDurationModel !== '' &&
    formData.contractLocationModel !== '' &&
    formData.expirationDateModel !== '' &&
    formData.gratificationModel !== '' &&
    formData.descriptionModel !== '' &&
    formData.missionModel !== '' &&
    formData.avantagesModel !== ''
  )
})

const companyStore = useCompanyStore()
const recruiterStore = useRecruiterStore()
const response = ref()

async function handleSubmit() {
  const id_recruiter = recruiterStore.recruiters[0]._id
  const id_company = companyStore.companies[0]._id
  const matchs = null
  const details = {
    benefits: formData.avantagesModel,
    color: formData.colorModel,
    compatibility_min: formData.minimumCompatibilityModel.toString() + '%',
    contract_duration: formData.contractDurationModel,
    contract_type: formData.lookForContractTypeModel,
    description: formData.descriptionModel,
    exp_date: {
      $date: {
        $numberLong: String(new Date(formData.expirationDateModel).getTime())
      }
    },
    location: formData.contractLocationModel,
    position_name: formData.lookingForModel,
    salary: formData.gratificationModel,
    tags: {
      certifications: certifications.value,
      experience: professionalExperienceduration.value,
      formations: formationsWanted.value,
      hard_skills: hardSkills.value,
      more: moreCriterias.value,
      personality: persolanityCriterias.value,
      soft_skills: softSkills.value
    },
    tasks: formData.missionModel
  }
  const data = {
    details,
    id_company,
    id_recruiter,
    matchs
  }
  try {
    const companyData = await getCompanyByAdmin(id_recruiter.$oid)
    response.value = await createOffer(data)
    const offerId = response.value.insertedId.$oid
    companyData.offers.push(offerId)
    await updateCompany(companyData._id.$oid, companyData)
    await populateCompanyStoreByAdmin(id_recruiter.$oid)
    emit('closeModal')
  } catch (error) {
    const apiError = handleApiError(error)
    console.error(apiError)
  }
}

const handleUpdateColor = (colors: string) => {
  formData.colorModel = colors
}

const emit = defineEmits(['closeModal'])
</script>

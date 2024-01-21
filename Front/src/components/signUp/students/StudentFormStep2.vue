<template>
  <form class="flex w-full flex-col items-center justify-center gap-16 pb-20 lg:w-full">
    <div class="flex w-full flex-col gap-4 lg:w-1/2">
      <h3 class="gap-2 font-eina1 text-3 font-normal uppercase text-primary-powder">
        Informations generales
      </h3>
      <div class="flex items-start gap-6">
        <InputField
          class="w-full"
          v-model="lastNameModel"
          placeholder="PLACEHOLDER"
          label="NOM"
          inputType="text"
          isRequired
        />
        <InputField
          class="w-full"
          v-model="firstNameModel"
          placeholder="PLACEHOLDER"
          label="PRENOM"
          inputType="text"
          isRequired
        />
      </div>
    </div>
    <div class="flex w-full flex-col gap-4 lg:w-1/2">
      <h3 class="gap-2 font-eina1 text-3 font-normal uppercase text-primary-powder">
        FORMATION EN COURS
      </h3>
      <div class="flex items-start gap-6">
        <InputField
          class="w-full"
          v-model="schoolModel"
          placeholder="PLACEHOLDER"
          label="Ecole"
          inputType="text"
          isRequired
        />
        <InputField
          class="w-full"
          v-model="formationTitleModel"
          placeholder="PLACEHOLDER"
          label="Titre de la formation"
          inputType="text"
          isRequired
        />
      </div>
      <div class="flex items-start gap-6">
        <SelectField
          title="Niveau d'études*"
          v-model="schoolGradeModel"
          :options="schoolGradeOptions"
          default="Selectionner"
          class="max-h-[200px] w-full"
        />
        <InputField
          isDateInput
          label="date de début"
          placeholder="PLACEHOLDER"
          state="active"
          v-model="startingDateModel"
          class="w-full"
          isRequired
        />
      </div>
      <div class="flex items-start gap-6">
        <InputField
          class="w-full"
          v-model="descriptionModel"
          placeholder="Lorem ipsum dolor sit amet consectetur. Malesuada sit quis nec sed phasellus dui gravida. Magna varius tortor sed nisl augue."
          label="Description"
          size="big"
          inputType="text"
        />
        <InputField
          class="w-full"
          v-model="resultsModel"
          placeholder="Rang :  112e/400"
          label="Resultats"
          inputType="text"
        />
      </div>
    </div>
    <div class="flex w-full flex-col gap-4 lg:w-1/2">
      <h3 class="gap-2 font-eina1 text-3 font-normal uppercase text-primary-powder">
        DERNIERE EXPERIENCE PROFESSIONNELLE
      </h3>
      <div class="flex items-start gap-6">
        <InputField
          class="w-full"
          v-model="lastExpPost"
          placeholder="Serveur"
          label="Intitulé du poste"
          inputType="text"
          isRequired
        />
        <InputField
          class="w-full"
          v-model="lastExpCompany"
          placeholder="Hippopotamus"
          label="Nom de l’entreprise"
          inputType="text"
          isRequired
        />
      </div>
      <div class="flex w-fit items-center gap-2">
        <CheckBox
          v-model="currentPost"
          @click="currentPost = !currentPost"
          state="unchecked"
          color="transparent"
          form="square"
        />
        <p class="w-full font-eina1 text-4" :class="{ 'font-700': currentPost }">
          J'occupe actuellement ce poste
        </p>
      </div>
      <div class="flex items-start gap-6">
        <InputField
          class="w-full"
          v-model="lastExpStartDate"
          label="Date de début"
          inputType="text"
          isDateInput
          isRequired
        />
        <InputField
          class="w-full"
          v-model="lastExpEndDate"
          label="Date de fin"
          inputType="text"
          isDateInput
          isRequired
        />
      </div>
      <div class="flex items-start gap-6">
        <InputField
          class="w-full"
          v-model="lastExpLocation"
          placeholder="Paris 12e"
          label="Lieu"
          inputType="text"
          isRequired
        />
        <InputField
          class="w-full"
          v-model="lastExpDescription"
          placeholder="Lorem ipsum dolor sit amet consectetur. Malesuada sit quis nec sed phasellus dui gravida. Magna varius tortor sed nisl augue."
          label="Description"
          inputType="text"
          size="big"
          isRequired
        />
      </div>
    </div>
    <div class="flex w-full flex-col gap-4 lg:w-1/2">
      <div class="flex min-h-[102px] w-full flex-col gap-2">
        <div class="flex w-full flex-row items-end gap-2">
          <InputField
            class="w-4/5"
            v-model="addHardSkillModel"
            placeholder="Soudure"
            label="Hard skills"
          />
          <Button
            type="default"
            styled="fill"
            class="w-1/5"
            state="active"
            @click.prevent="addHardSkills"
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
            @deleteChip="deleteHardSkill(label)"
          />
        </div>
      </div>
      <div class="flex min-h-[102px] w-full flex-col gap-2">
        <div class="flex w-full flex-row items-end gap-2">
          <InputField
            class="w-4/5"
            v-model="addSoftSkillModel"
            placeholder="Agilité"
            label="Soft skills"
          />
          <Button
            type="default"
            styled="fill"
            class="w-1/5"
            state="active"
            @click.prevent="addSoftSkills"
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
            @deleteChip="deleteSoftSkill(label)"
          />
        </div>
      </div>
      <div class="text-error">*Champs obligatoires</div>
    </div>
    <div class="flex w-1/2 items-center justify-center gap-6 align-middle">
      <Button
        type="default"
        class="max-w-[160px] self-center uppercase"
        icon="moveLeft"
        iconPosition="leading"
        styled="outlined"
        state="active"
        @click.prevent="goBack"
      >
        Précédent
      </Button>
      <Button
        type="default"
        class="max-w-[160px] self-center uppercase"
        styled="fill"
        icon="moveRight"
        iconPosition="trailing"
        state="active"
        @click.prevent="handleSubmit"
      >
        Suivant
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
const store = useRegistrationStore()

const lastNameModel: Ref<string> = ref('')
const firstNameModel: Ref<string> = ref('')
const schoolModel: Ref<string> = ref('')
const formationTitleModel: Ref<string> = ref('')
const schoolGradeModel: Ref<string> = ref('')
const startingDateModel: Ref<string> = ref('')
const descriptionModel: Ref<string> = ref('')
const resultsModel: Ref<string> = ref('')
const lastExpPost: Ref<string> = ref('')
const lastExpCompany: Ref<string> = ref('')
const currentPost: Ref<boolean> = ref(false)
const lastExpStartDate: Ref<string> = ref('')
const lastExpEndDate: Ref<string> = ref('')
const lastExpLocation: Ref<string> = ref('')
const lastExpDescription: Ref<string> = ref('')
const addHardSkillModel: Ref<string> = ref('')
const addSoftSkillModel: Ref<string> = ref('')

const schoolGradeOptions = [
  {
    label: 'Master 1',
    value: 'Master 1'
  },
  {
    label: 'Master 2',
    value: 'Master 2'
  },
  {
    label: 'License 1',
    value: 'License 1'
  },
  {
    label: 'License 2',
    value: 'License 2'
  },
  {
    label: 'License 3',
    value: 'License 3'
  },
  {
    label: 'BTS',
    value: 'BTS'
  },
  {
    label: 'DUT',
    value: 'DUT'
  },
  {
    label: 'Autre',
    value: 'Autre'
  }
]

const hardSkillsRef: Ref<string[]> = ref([])
const softSkillsRef: Ref<string[]> = ref([])

const hardSkills = computed(() => hardSkillsRef.value)
const softSkills = computed(() => softSkillsRef.value)

const addHardSkills = () => {
  if (addHardSkillModel.value !== '') {
    console.log(addHardSkillModel.value)
    hardSkillsRef.value.push(addHardSkillModel.value)
    console.log(hardSkills)
    addHardSkillModel.value = ''
  }
}

const deleteHardSkill = (label: string) => {
  console.log(label)
  const index = hardSkillsRef.value.indexOf(label)
  hardSkillsRef.value.splice(index, 1)
  console.log(hardSkills)
}

const addSoftSkills = () => {
  if (addSoftSkillModel.value !== '') {
    console.log(addSoftSkillModel.value)
    softSkillsRef.value.push(addSoftSkillModel.value)
    console.log(softSkills)
    addSoftSkillModel.value = ''
  }
}

const deleteSoftSkill = (label: string) => {
  console.log(label)
  const index = softSkillsRef.value.indexOf(label)
  softSkillsRef.value.splice(index, 1)
  console.log(softSkills)
}

const goBack = () => {
  if (store.step === 1) router.push('/')
  if (store.step > 1) store.prevStep()
}

const isAllInputFilled = computed(() => {
  return (
    lastNameModel.value !== '' &&
    firstNameModel.value !== '' &&
    schoolModel.value !== '' &&
    formationTitleModel.value !== '' &&
    schoolGradeModel.value !== '' &&
    schoolGradeModel.value !== 'Selectionner' &&
    startingDateModel.value !== '' &&
    lastExpPost.value !== '' &&
    lastExpCompany.value !== '' &&
    lastExpStartDate.value !== '' &&
    lastExpEndDate.value !== '' &&
    lastExpLocation.value !== '' &&
    lastExpDescription.value !== ''
  )
})

const handleSubmit = () => {
  if (isAllInputFilled.value) {
    store.updateForm2({
      currentPost: currentPost.value,
      description: descriptionModel.value,
      firstname: firstNameModel.value,
      formationName: formationTitleModel.value,
      formationYear: schoolGradeModel.value,
      hardSkills: hardSkills.value,
      lastExpCompany: lastExpCompany.value,
      lastExpDescription: lastExpDescription.value,
      lastExpEndDate: new Date(lastExpEndDate.value),
      lastExpLocation: lastExpLocation.value,
      lastExpPoste: lastExpPost.value,
      lastExpStartDate: new Date(lastExpStartDate.value),
      lastname: lastNameModel.value,
      school: schoolModel.value,
      schoolResult: resultsModel.value,
      schoolStartDate: new Date(startingDateModel.value),
      softSkills: softSkills.value
    })
    emit('submit')
  } else {
    emit('failed')
  }
}

const emit = defineEmits(['submit', 'failed'])
</script>

<style scoped>
.radio {
  appearance: none;
  width: 12px;
  height: 12px;
  border: 1px solid #000;
  border-radius: 50%;
  outline: none;
  position: relative;
  cursor: pointer;
}

.radio:checked::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1b1b1e; /* Change this to the color you want */
}
</style>

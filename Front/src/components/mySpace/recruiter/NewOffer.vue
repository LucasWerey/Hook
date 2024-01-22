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
              v-model="formData.professionalExperienceDurantionModel"
              :options="newOfferProfessionalExperienceDurationOptions"
              default="Selectionner"
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
        </div>
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
  gratificationModel: ref(''),
  lookForContractTypeModel: ref(''),
  lookingForModel: ref(''),
  missionModel: ref(''),
  professionalExperienceDurantionModel: ref(''),
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

const emit = defineEmits(['closeModal'])
</script>

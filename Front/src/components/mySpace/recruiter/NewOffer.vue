<template>
  <div
    class="absolute left-1/2 top-[15%] z-50 flex h-4/5 max-h-[75%] w-full -translate-x-1/2 flex-col items-center overflow-hidden overflow-y-auto rounded-lg bg-basic-white shadow lg:w-[822px]"
  >
    <NewofferHeader @closeModal="emit('closeModal')" />
    <form class="flex w-full flex-col gap-8 overflow-y-auto px-6 py-6">
      <InputField
        v-model="lookingForModel"
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
        <h2 class="text-nowrap text-2 font-bold uppercase">
          Type de contrat recherché <span class="text-error">*</span>
        </h2>
        <div class="flex h-full w-full items-center gap-4 align-middle">
          <input
            type="radio"
            id="stage"
            name="lookForJob"
            value="stage"
            v-model="lookForContractTypeModel"
            class="cursor-pointer"
          />
          <label
            :class="{ 'font-800': lookForContractTypeModel === 'stage' }"
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
            v-model="lookForContractTypeModel"
          />
          <label
            :class="{ 'font-800': lookForContractTypeModel === 'alternance' }"
            for="alternance"
            class="cursor-pointer font-eina1"
            >Alternance</label
          >
        </div>
      </div>
      <div class="flex w-full flex-col gap-6 lg:flex-row">
        <SelectField
          title="Durée*"
          v-model="contractDurationModel"
          :options="contractDurationOptions"
          default="Selectionner"
          class="max-h-[200px] min-w-[200px] max-w-[200px] text-nowrap"
        />
        <SelectField
          title="Localisation*"
          v-model="contractLocationModel"
          :options="contractLocationOptions"
          default="Selectionner"
          class="w-full text-nowrap"
        />
      </div>
      <div class="flex w-full flex-col gap-6 lg:flex-row">
        <InputField
          v-model="expirationDateModel"
          :placeholder="'placeholder'"
          :label="`Date d'expiration`"
          :hint="'hint'"
          isDateInput
          isRequired
          :size="'default'"
          state="default"
        />
        <InputField
          v-model="gratificationModel"
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
        v-model="descriptionModel"
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
        v-model="missionModel"
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
        v-model="avantagesModel"
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
                v-model="formationsWantedModel"
                placeholder="Ecole d'ingénieur"
                label="Formations souhaitées"
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
              v-model="professionalExperienceDurantionModel"
              :options="professionalExperienceDurationOptions"
              default="Selectionner"
              class="max-h-[200px] min-w-[250px] max-w-[250px] text-nowrap"
            />
            <div class="flex w-full flex-col gap-4">
              <div class="flex flex-col items-end gap-2 lg:flex-row">
                <InputField
                  class="w-full"
                  v-model="certificationsModel"
                  placeholder="Jsp l'ékip"
                  label="Certification souhaitées"
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
                v-model="softSkillsModel"
                placeholder="Agilité"
                label="Soft skills"
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
const lookingForModel: Ref<string> = ref('')
const lookForContractTypeModel: Ref<string> = ref('')
const contractDurationModel: Ref<string> = ref('')
const contractLocationModel: Ref<string> = ref('')
const expirationDateModel: Ref<string> = ref('')
const gratificationModel: Ref<string> = ref('')
const descriptionModel: Ref<string> = ref('')
const missionModel: Ref<string> = ref('')
const avantagesModel: Ref<string> = ref('')
const formationsWantedModel: Ref<string> = ref('')
const professionalExperienceDurantionModel: Ref<string> = ref('')
const certificationsModel: Ref<string> = ref('')
const softSkillsModel: Ref<string> = ref('')

const contractDurationOptions = [
  { label: '1 semaine', value: '1 semaine' },
  { label: '2 semaines', value: '2 semaines' },
  { label: '3 semaines', value: '3 semaines' },
  { label: '4 semaines', value: '4 semaines' },
  { label: '5 semaines', value: '5 semaines' },
  { label: '6 semaines', value: '6 semaines' },
  { label: '7 semaines', value: '7 semaines' }
]

const contractLocationOptions = [
  { label: 'Paris', value: 'Paris' },
  { label: 'Lyon', value: 'Lyon' },
  { label: 'Marseille', value: 'Marseille' },
  { label: 'Toulouse', value: 'Toulouse' }
]

const professionalExperienceDurationOptions = [
  { label: '< 6 mois', value: '< 6 mois' },
  { label: '> 6 mois', value: '> 6 mois' },
  { label: '> 1 an', value: '> 1 an' }
]

const largeInputPlaceholder =
  'Lorem ipsum dolor sit amet consectetur. Malesuada sit quis nec sed phasellus dui gravida. Magna varius tortor sed nisl augue. Mauris massa morbi aliquam nunc molestie adipiscing. '

const formationsWantedRef: Ref<string[]> = ref([])
const formationsWanted = computed(() => formationsWantedRef.value)

const addChipFormation = () => {
  addChip(formationsWantedRef, formationsWantedModel.value)
  formationsWantedModel.value = ''
}

const deleteChipFormation = (label: string) => {
  deleteChip(formationsWantedRef, label)
}

const certificationsRef: Ref<string[]> = ref([])
const certifications = computed(() => certificationsRef.value)

const addChipCertification = () => {
  addChip(certificationsRef, certificationsModel.value)
  certificationsModel.value = ''
}

const deleteChipCertification = (label: string) => {
  deleteChip(certificationsRef, label)
}

const softSkillsRef: Ref<string[]> = ref([])
const softSkills = computed(() => softSkillsRef.value)

const addChipSoftSkill = () => {
  addChip(softSkillsRef, softSkillsModel.value)
  softSkillsModel.value = ''
}

const deleteChipSoftSkill = (label: string) => {
  deleteChip(softSkillsRef, label)
}

const emit = defineEmits(['closeModal'])
</script>

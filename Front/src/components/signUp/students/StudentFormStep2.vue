<template>
  <form class="flex w-full flex-col items-center justify-center gap-6 lg:w-full">
    <div class="flex w-full flex-col gap-4 lg:w-1/2">
      <h3 class="gap-2 font-eina1 text-3 font-normal uppercase text-primary-powder">
        Informations generales
      </h3>
      <div class="flex items-start gap-6">
        <InputField class="w-full" v-model="lastNameModel" placeholder="PLACEHOLDER" label="NOM*" />
        <InputField
          class="w-full"
          v-model="firstNameModel"
          placeholder="PLACEHOLDER"
          label="PRENOM*"
        />
      </div>
      <div class="flex items-start gap-6">
        <InputField
          class="w-full"
          v-model="schoolGradeModel"
          placeholder="PLACEHOLDER"
          label="NIVEAU D'ETUDES*"
        />
        <p class="invisible w-full"></p>
      </div>
    </div>
    <div class="flex w-full flex-col gap-4 lg:w-1/2">
      <h3 class="gap-2 font-eina1 text-3 font-normal uppercase text-primary-powder">Recherche</h3>
      <div class="flex flex-col gap-1">
        <p class="font-eina1 text-2 font-bold uppercase">Type de contrat*</p>
        <div class="flex gap-6">
          <div class="flex items-center justify-center gap-2 align-middle">
            <input
              type="radio"
              id="Stage"
              value="Stage"
              v-model="selectedContractModel"
              class="radio"
            />
            <label class="self-middle cursor-pointer font-eina1 text-4 font-normal" for="Stage"
              >Stage</label
            >
          </div>
          <div class="flex items-center justify-center gap-2 align-middle">
            <input
              type="radio"
              id="Alternance"
              value="Alternance"
              v-model="selectedContractModel"
              class="radio"
            />
            <label class="self-middle cursor-pointer font-eina1 text-4 font-normal" for="Alternance"
              >Alternance</label
            >
          </div>
        </div>
      </div>
      <div class="flex items-start gap-6">
        <div class="flex w-full gap-6">
          <InputField
            class="w-full"
            v-model.number="durationModel"
            placeholder="0"
            label="DUREE*"
            type="number"
          />
          <select
            class="h-[48px] w-full items-start self-end rounded-md border-2 border-basic-grey bg-basic-white px-4 py-3 text-primary-moonstone focus:border-primary-charcoal"
            id="cars"
            name="cars"
            v-model="durationTypeModel"
          >
            <option value="an">An(s)</option>
            <option value="mois">Mois</option>
            <option value="semaines">Semaines</option>
            <option value="jours">Jours</option>
          </select>
        </div>
        <InputField
          class="w-full"
          v-model="startingDateModel"
          placeholder="PLACEHOLDER"
          label="A PARTIR DU*"
          isDateInput
        />
      </div>
      <div class="flex items-start gap-6">
        <InputField class="w-full" v-model="placeModel" placeholder="PLACEHOLDER" label="LIEU*" />
        <p class="invisible w-full"></p>
      </div>
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          id="lookingFor"
          value="lookingFor"
          v-model="lookingForModel"
          class="radio"
        />
        <label class="self-middle cursor-pointer font-eina1 text-4 font-normal" for="lookingFor"
          >Je suis en recherche active
        </label>
        <IconsBase name="info" size="small" color="darkgrey" />
      </div>
    </div>
    <div class="flex w-1/2 items-center justify-center gap-6 align-middle">
      <Button
        type="default"
        class="w-full max-w-md self-center"
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
        class="w-full max-w-md self-center"
        styled="fill"
        state="active"
        @click.prevent="handleSubmit"
      >
        Terminer
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
const store = useRegistrationStore()

const lastNameModel: Ref<string> = ref('')
const firstNameModel: Ref<string> = ref('')
const schoolGradeModel: Ref<string> = ref('')
const selectedContractModel: Ref<'stage' | 'alternance' | undefined> = ref('stage')
const durationModel: Ref<string> = ref('')
const durationTypeModel: Ref<string> = ref('an')
const startingDateModel: Ref<string> = ref('')
const placeModel: Ref<string> = ref('')
const lookingForModel = ref(false)

const goBack = () => {
  if (store.step === 1) router.push('/')
  if (store.step > 1) store.prevStep()
}

const handleSubmit = () => {
  store.updateForm2({
    name: lastNameModel.value,
    firstname: firstNameModel.value,
    schoolGrade: schoolGradeModel.value,
    contractType: selectedContractModel.value,
    duration: Number(durationModel.value),
    start: new Date(startingDateModel.value),
    location: placeModel.value,
    actualLookingFor: lookingForModel.value
  })
  emit('submit')
}

const emit = defineEmits(['submit'])
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

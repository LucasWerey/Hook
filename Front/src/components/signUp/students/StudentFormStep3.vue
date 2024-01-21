<template>
  <form class="flex w-full flex-col items-center justify-center gap-9 pb-20 lg:w-full">
    <div class="flex w-full flex-col gap-6 lg:w-1/2 lg:flex-row">
      <InputField
        v-model="lookForJobModel"
        placeholder="placeholder"
        label="Poste recherché"
        hint="'hint'"
        class="w-full"
        inputType="text"
        isRequired
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
    </div>
    <div class="flex w-full flex-col gap-6 lg:w-1/2 lg:flex-row">
      <SelectField
        title="Durée*"
        v-model="contractDurationModel"
        :options="contractDuration"
        default="Selectionner"
        class="max-h-[200px] min-w-[200px] max-w-[200px] text-nowrap"
      />
      <InputField
        label="Localisation"
        placeholder="PLACEHOLDER"
        state="active"
        v-model="contractLocationModel"
        class="w-full"
        isRequired
      />
    </div>
    <div class="flex min-h-[102px] w-full flex-col gap-2 lg:w-1/2">
      <div class="flex w-full flex-row items-end gap-2">
        <InputField
          class="w-4/5"
          v-model="spokenLanguagesModel"
          placeholder="Allemand"
          label="Langues"
          onkeypress="return event.charCode != 32"
        />
        <Button
          type="default"
          styled="fill"
          class="w-1/5"
          state="active"
          @click.prevent="addChipLang"
          isLight
        >
          Ajouter
        </Button>
      </div>
      <div class="flex w-full flex-row gap-2 overflow-auto">
        <ChipContainer
          v-for="label in spokenLanguages"
          :label="label"
          :key="label"
          hasIcon
          iconPosition="trailing"
          @deleteChip="deleteChipLang(label)"
        />
      </div>
    </div>
    <div class="flex w-full flex-col gap-6 lg:w-1/2 lg:flex-row">
      <InputField
        isDateInput
        label="Date de début"
        state="active"
        v-model="contractStartDateModel"
        class="w-full"
        isRequired
      />
      <InputField
        isDateInput
        label="Date de fin"
        state="active"
        v-model="contractEndDateModel"
        class="w-full"
        isRequired
      />
    </div>
    <div class="flex min-h-[102px] w-full flex-col gap-2 lg:w-1/2">
      <div class="flex w-full flex-row items-end gap-2">
        <InputField
          class="w-4/5"
          v-model="keywordsModel"
          placeholder="HTML/CSS"
          label="Mots clés"
        />
        <Button
          type="default"
          styled="fill"
          class="w-1/5"
          state="active"
          @click.prevent="addChipKeyWords"
          isLight
        >
          Ajouter
        </Button>
      </div>
      <div class="flex w-full flex-row gap-2 overflow-auto">
        <ChipContainer
          v-for="label in keyWords"
          :label="label"
          :key="label"
          hasIcon
          iconPosition="trailing"
          @deleteChip="deleteChipKeyWords(label)"
        />
      </div>
    </div>
    <div class="flex min-h-[102px] w-full flex-col gap-6 lg:w-1/2 lg:flex-row">
      <SelectField
        title="Temps de transport"
        v-model="transportDurationModel"
        :options="transportDuration"
        :default="transportDuration[0].label"
        @update:model-value="updateTransportDuration($event)"
        class="max-h-[200px] min-w-[200px] max-w-[200px] text-nowrap"
      />
      <div class="flex w-full flex-col gap-2">
        <div class="flex w-full flex-row items-end gap-2">
          <InputField
            class="w-3/4"
            v-model="transportTypeModel"
            placeholder="Bus"
            label="Transports utilisés"
          />
          <Button
            type="default"
            styled="fill"
            class="w-1/4"
            state="active"
            @click.prevent="addChipTransport"
            isLight
          >
            Ajouter
          </Button>
        </div>
        <div class="flex w-full flex-row gap-2 overflow-auto">
          <ChipContainer
            v-for="label in transportType"
            :label="label"
            :key="label"
            hasIcon
            iconPosition="trailing"
            @deleteChip="deleteChipTransport(label)"
          />
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col gap-2 lg:w-1/2">
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
        state="active"
        @click.prevent="handleSubmit"
      >
        Terminer
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
const store = useRegistrationStudentStore()

const lookForJobModel: Ref<string> = ref('')
const lookForContractTypeModel: Ref<string> = ref('')
const contractDurationModel: Ref<string> = ref('')
const contractLocationModel: Ref<string> = ref('')
const contractStartDateModel: Ref<string> = ref('')
const contractEndDateModel: Ref<string> = ref('')
const spokenLanguagesModel: Ref<string> = ref('')
const keywordsModel: Ref<string> = ref('')
const transportDurationModel: Ref<string> = ref('')
const transportTypeModel: Ref<string> = ref('')

const spokenLanguagesRef: Ref<string[]> = ref([])
const spokenLanguages = computed(() => spokenLanguagesRef.value)

const keyWordsRef: Ref<string[]> = ref([])
const keyWords = computed(() => keyWordsRef.value)

const transportTypeRef: Ref<string[]> = ref([])
const transportType = computed(() => transportTypeRef.value)

const transportDurationRef: Ref<string[]> = ref([])

const contractDuration = [
  { label: '1 semaine', value: '1 semaine' },
  { label: '2 semaines', value: '2 semaines' },
  { label: '3 semaines', value: '3 semaines' },
  { label: '4 semaines', value: '4 semaines' },
  { label: '5 semaines', value: '5 semaines' },
  { label: '6 semaines', value: '6 semaines' },
  { label: '7 semaines', value: '7 semaines' }
]

const transportDuration = [
  { label: '<15 min', value: '<15 min' },
  { label: '15-30 min', value: '15-30 min' },
  { label: '30-45 min', value: '30-45 min' },
  { label: '45-60 min', value: '45-60 min' },
  { label: '>60 min', value: '>60 min' }
]

const addChipLang = () => {
  addChip(spokenLanguagesRef, spokenLanguagesModel.value)
  spokenLanguagesModel.value = ''
}

const deleteChipLang = (label: string) => {
  deleteChip(spokenLanguagesRef, label)
}

const addChipKeyWords = () => {
  addChip(keyWordsRef, keywordsModel.value)
  keywordsModel.value = ''
}

const deleteChipKeyWords = (label: string) => {
  deleteChip(keyWordsRef, label)
}

const addChipTransport = () => {
  addChip(transportTypeRef, transportTypeModel.value)
  transportTypeModel.value = ''
}

const deleteChipTransport = (label: string) => {
  deleteChip(transportTypeRef, label)
}

const goBack = () => {
  if (store.step === 1) router.push('/')
  if (store.step > 1) store.prevStep()
}

const updateTransportDuration = (value: string) => {
  transportDurationRef.value.splice(0, 1)
  transportDurationRef.value.push(value)
}

const itemsRank = ref([
  {
    draggable: true,
    labels: keyWords.value,
    title: 'Mots clés',
    topRank: true
  },
  {
    draggable: true,
    labels: transportType.value,
    title: 'Transports utilisés',
    topRank: false
  },
  {
    draggable: true,
    labels: transportDurationRef.value,
    title: 'Temps de transport',
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
      controlsCopy[i].topRank = i === 0
    }
    itemsRank.value = controlsCopy
  }
}

const isRequiredFieldsFill = () => {
  return (
    lookForJobModel.value !== '' &&
    lookForContractTypeModel.value !== '' &&
    contractDurationModel.value !== '' &&
    contractLocationModel.value !== '' &&
    contractStartDateModel.value !== '' &&
    contractEndDateModel.value !== ''
  )
}

const handleSubmit = () => {
  if (!isRequiredFieldsFill()) {
    emit('failed')
    return
  }
  store.updateForm3({
    contractDuration: contractDurationModel.value,
    contractEndDate: new Date(contractEndDateModel.value),
    contractLocation: contractLocationModel.value,
    contractStartDate: new Date(contractStartDateModel.value),
    contractType: lookForContractTypeModel.value,
    keyWords: keyWords.value,
    postLookingFor: lookForJobModel.value,
    spokenLanguages: spokenLanguages.value,
    transportAvailable: transportType.value,
    transportDuration: transportDurationRef.value[0]
  })
  emit('submit')
}

const emit = defineEmits(['submit', 'failed'])
</script>

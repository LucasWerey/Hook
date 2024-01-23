<template>
  <div class="h-fit w-1/2 rounded-lg bg-basic-white shadow">
    <div
      class="flex h-10 w-full flex-row items-center justify-between border-b border-b-basic-lightgrey px-4 py-2"
    >
      <h3 class="font-eina1 text-4 font-bold">Ajouter une formation</h3>
      <IconsBase
        name="close"
        color="darkgrey"
        class="h-6 w-6 cursor-pointer"
        @click="emit('closeModal')"
      />
    </div>
    <form class="flex w-full flex-col items-center gap-6 overflow-y-auto px-6 py-6" @submit.prevent>
      <div class="flex w-full gap-6">
        <InputField
          v-model="dataInfo.schoolNameModel"
          :placeholder="'Ece Paris'"
          :label="'Ecole'"
          :hint="'hint'"
          :hasIcon="false"
          :isDateInput="false"
          :size="'default'"
          :state="'default'"
          :inputType="'text'"
          :isRequired="true"
          @blur="() => console.log('blur')"
        />
        <InputField
          v-model="dataInfo.formationNameModel"
          placeholder="Etudes d'ingénieur"
          :label="'Titre de la formation'"
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
      <div class="flex w-full gap-6">
        <InputField
          v-model="dataInfo.startDateModel"
          :placeholder="'placeholder'"
          :label="'Date de début'"
          :hint="'hint'"
          isDateInput
          isRequired
          :size="'default'"
          state="active"
        />
        <InputField
          v-model="dataInfo.endDateModel"
          :placeholder="'placeholder'"
          :label="'Date de fin'"
          :hint="'hint'"
          isDateInput
          isRequired
          :size="'default'"
          state="active"
        />
      </div>
      <div class="flex w-full gap-6">
        <InputField
          v-model="dataInfo.descriptionModel"
          placeholder="Ajouter une description..."
          :label="'Description'"
          :hint="'hint'"
          :hasIcon="false"
          :isDateInput="false"
          :size="'big'"
          :state="'default'"
          :inputType="'text'"
          :isRequired="true"
          @blur="() => console.log('blur')"
        />
        <InputField
          v-model="dataInfo.resultModel"
          placeholder="Rang: 122e/400"
          :label="'Résultat'"
          :hint="'hint'"
          :hasIcon="false"
          :isDateInput="false"
          :size="'default'"
          :state="'default'"
          :inputType="'text'"
          @blur="() => console.log('blur')"
        />
      </div>
      <Button
        type="default"
        styled="fill"
        class="w-1/2 uppercase"
        :state="areRequiredFieldsFilled ? 'active' : 'disabled'"
        @click.prevent="saveChanges"
      >
        Enregistrer
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()

const dataInfo = reactive({
  descriptionModel: '',
  endDateModel: '',
  formationNameModel: '',
  resultModel: '',
  schoolNameModel: '',
  startDateModel: ''
})

const areRequiredFieldsFilled = computed(() => {
  return (
    dataInfo.formationNameModel !== '' &&
    dataInfo.schoolNameModel !== '' &&
    dataInfo.startDateModel !== '' &&
    dataInfo.endDateModel !== '' &&
    dataInfo.descriptionModel !== ''
  )
})

const saveChanges = async () => {
  const updatedStudent = {
    ...studentStore.students[0],
    profile: {
      ...studentStore.students[0].profile,
      formation: [
        ...studentStore.students[0].profile.formation,
        {
          description: dataInfo.descriptionModel,
          endDate: dataInfo.endDateModel,
          name: dataInfo.formationNameModel,
          result: dataInfo.resultModel,
          startDate: dataInfo.startDateModel,
          university: dataInfo.schoolNameModel
        }
      ]
    }
  }
  try {
    studentStore.updateFormation(updatedStudent.profile.formation)
    console.log('updatedStudent', studentStore.students[0].profile.formation)
    await updateStudent(studentStore.students[0]._id.$oid, updatedStudent)
    emit('closeModal')
  } catch (error) {
    const apiError = handleApiError(error)
    console.log(apiError)
  }
}

const emit = defineEmits(['closeModal'])
</script>

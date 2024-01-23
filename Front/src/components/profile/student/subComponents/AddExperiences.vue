<template>
  <div class="h-fit w-1/2 rounded-lg bg-basic-white shadow">
    <div
      class="flex h-10 w-full flex-row items-center justify-between border-b border-b-basic-lightgrey px-4 py-2"
    >
      <h3 class="font-eina1 text-4 font-bold">Ajouter une expérience</h3>
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
          v-model="dataInfo.postNameModel"
          :placeholder="'Serveur'"
          :label="'Intitulé du poste'"
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
          v-model="dataInfo.companyNameModel"
          placeholder="Hippopotamus"
          label="Nom de l'entreprise"
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
      <CheckBox
        state="unchecked"
        v-model="dataInfo.currentJobModel"
        color="transparent"
        size="small"
        class="flex items-center gap-2 self-start font-eina1"
        >J'occupe actuellement ce poste</CheckBox
      >
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
          v-model="dataInfo.loacationModel"
          placeholder="Paris"
          :label="'Lieu'"
          :hint="'hint'"
          :hasIcon="false"
          :isDateInput="false"
          :size="'default'"
          :state="'default'"
          :inputType="'text'"
          isRequired
          @blur="() => console.log('blur')"
        />
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
  companyNameModel: '',
  currentJobModel: false,
  descriptionModel: '',
  endDateModel: '',
  loacationModel: '',
  postNameModel: '',
  startDateModel: ''
})

const areRequiredFieldsFilled = computed(() => {
  return (
    dataInfo.postNameModel !== '' &&
    dataInfo.companyNameModel !== '' &&
    dataInfo.startDateModel !== '' &&
    dataInfo.endDateModel !== '' &&
    dataInfo.descriptionModel !== '' &&
    dataInfo.loacationModel !== ''
  )
})

const saveChanges = async () => {
  const updatedStudent = {
    ...studentStore.students[0],
    profile: {
      ...studentStore.students[0].profile,
      experiences: [
        ...studentStore.students[0].profile.experiences,
        {
          company: dataInfo.companyNameModel,
          currentJob: dataInfo.currentJobModel,
          description: dataInfo.descriptionModel,
          endDate: {
            $date: {
              $numberLong: String(new Date(dataInfo.endDateModel).getTime())
            }
          },
          jobTitle: dataInfo.postNameModel,
          location: dataInfo.loacationModel,
          startDate: {
            $date: {
              $numberLong: String(new Date(dataInfo.startDateModel).getTime())
            }
          }
        }
      ]
    }
  }
  try {
    studentStore.updateExperiences(updatedStudent.profile.experiences)
    console.log('updatedStudent', studentStore.students[0].profile.experiences)
    await updateStudent(studentStore.students[0]._id.$oid, updatedStudent)
    emit('closeModal')
  } catch (error) {
    const apiError = handleApiError(error)
    console.log(apiError)
  }
}

const emit = defineEmits(['closeModal'])
</script>

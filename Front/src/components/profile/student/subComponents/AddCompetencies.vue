<template>
  <div class="h-fit w-1/2 rounded-lg bg-basic-white shadow">
    <div
      class="flex h-10 w-full flex-row items-center justify-between border-b border-b-basic-lightgrey px-4 py-2"
    >
      <h3 class="font-eina1 text-4 font-bold">Ajouter des compétences</h3>
      <IconsBase
        name="close"
        color="darkgrey"
        class="h-6 w-6 cursor-pointer"
        @click="emit('closeModal')"
      />
    </div>
    <form
      class="flex w-full flex-col items-center gap-12 overflow-y-auto px-6 py-6"
      @submit.prevent
    >
      <div class="flex w-[90%] flex-col gap-6">
        <div class="flex w-full flex-col gap-2 font-eina1 text-4 font-normal text-basic-darkgrey">
          <p>
            Hard skills : Compétences spécialisées techniques ou académiques acquises au cours de
            votre formation et de vos expériences professionnelles.
          </p>
          <p>
            Soft skills : Compétences sociales et comportementales, telles que la communication et
            la collaboration, qui enrichissent votre approche professionnelle et personnelle.
          </p>
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
              v-for="label in tempHardSkills"
              :label="label"
              :key="label"
              hasIcon
              iconPosition="trailing"
              @deleteChip="deleteChipHardSkill(label)"
            />
          </div>
        </div>
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
              v-for="label in tempSoftSkills"
              :label="label"
              :key="label"
              hasIcon
              iconPosition="trailing"
              @deleteChip="deleteChipSoftSkill(label)"
            />
          </div>
        </div>
      </div>
      <Button
        type="default"
        styled="fill"
        class="w-1/2 uppercase"
        state="active"
        @click.prevent="saveChanges"
      >
        Enregistrer
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()

const formData = reactive({
  hardSkillsModel: '',
  softSkillsModel: ''
})

const tempSoftSkills = ref<string[]>([])
const tempHardSkills = ref<string[]>([])

const addChipSoftSkill = () => {
  if (formData.softSkillsModel) {
    addChip(tempSoftSkills, formData.softSkillsModel)
    formData.softSkillsModel = ''
  }
}

const deleteChipSoftSkill = (label: string) => {
  deleteChip(tempSoftSkills, label)
}

const addChipHardSkill = () => {
  if (formData.hardSkillsModel) {
    addChip(tempHardSkills, formData.hardSkillsModel)
    formData.hardSkillsModel = ''
  }
}

const deleteChipHardSkill = (label: string) => {
  deleteChip(tempHardSkills, label)
}

const saveChanges = async () => {
  const updatedStudent = {
    ...studentStore.students[0],
    profile: {
      ...studentStore.students[0].profile,
      hardSkills: tempHardSkills.value,
      softSkills: tempSoftSkills.value
    }
  }
  try {
    studentStore.updateSkills(tempHardSkills.value, tempSoftSkills.value)
    await updateStudent(studentStore.students[0]._id.$oid, updatedStudent)
    emit('closeModal')
  } catch (error) {
    const apiError = handleApiError(error)
    console.error(apiError)
  }
}

onMounted(() => {
  tempSoftSkills.value = [...studentStore.students[0].profile.softSkills]
  tempHardSkills.value = [...studentStore.students[0].profile.hardSkills]
})

const emit = defineEmits(['closeModal'])
</script>

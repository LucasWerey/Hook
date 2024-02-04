<template>
  <div v-if="isStoreReady" class="flex h-full w-full flex-col gap-6">
    <ProfileHeader title="Mon profil" />
    <div class="h-full w-full grid-cols-12 gap-12 md:grid md:grid-cols-11">
      <div
        class="sticky top-[90px] hidden h-fit max-w-fit flex-col gap-6 md:col-span-4 md:flex lg:col-span-3"
      >
        <StudentCard /> <SettingsCard />
      </div>
      <div class="flex w-full flex-col gap-6 md:col-span-8 md:w-full lg:col-span-8">
        <SingularityEmpty />
        <PersonnalityEmpty />
        <ExperiencesContainer @addExperience="handleAddExperience" />
        <FormationsContainer @addFormation="handleAddFormation" />
        <CompetenciesContainer @addCompetence="handleAddCompetence" />
        <CertificationsContainer />
        <CuriculumContainer />
      </div>
    </div>
    <div
      v-if="openModal"
      class="fixed inset-0 z-[59] h-full w-full bg-basic-black bg-opacity-30"
      tabindex="0"
    >
      <AddCompetencies
        v-if="openModalCompetence"
        class="fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 transform"
        @closeModal="handleAddCompetence"
      />
      <AddFormations
        v-if="openModalFormation"
        class="fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 transform"
        @closeModal="handleAddFormation"
      />
      <AddExperiences
        v-if="openModalExperience"
        class="fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 transform"
        @closeModal="handleAddExperience"
      />
    </div>
  </div>
  <div v-else class="flex h-full w-full items-center justify-center">
    <Loader :color="'primary'" :size="'medium'" />
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()
const isStoreReady = computed(() => studentStore.students.length > 0)
const openModal = ref(false)
const openModalCompetence = ref(false)
const openModalFormation = ref(false)
const openModalExperience = ref(false)

const handleAddCompetence = () => {
  openModalCompetence.value = !openModalCompetence.value
  openModal.value = openModalCompetence.value
  if (openModalCompetence.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const handleAddFormation = () => {
  openModalFormation.value = !openModalFormation.value
  openModal.value = openModalFormation.value
  if (openModalFormation.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const handleAddExperience = () => {
  openModalExperience.value = !openModalExperience.value
  openModal.value = openModalExperience.value
  if (openModalExperience.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
</script>

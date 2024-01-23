<template>
  <div v-if="isStoreReady" class="flex h-full w-full flex-col gap-6">
    <ProfileHeader title="Mon profil" />
    <div class="h-full w-full grid-cols-12 gap-12 md:grid md:grid-cols-12">
      <div class="hidden h-fit max-w-fit flex-col gap-6 md:col-span-4 md:flex lg:col-span-3">
        <StudentCard /> <SettingsCard />
      </div>
      <div class="flex w-full flex-col gap-6 md:col-span-8 md:w-full lg:col-span-9">
        <SingularityEmpty />
        <PersonnalityEmpty />
        <ExperiencesContainer />
        <FormationsContainer />
        <CompetenciesContainer @addCompetence="handleAddCompetence" />
        <CertificationsContainer />
        <CuriculumContainer />
      </div>
    </div>
    <div
      v-if="openModalCompetence"
      class="fixed inset-0 z-[59] h-full w-full bg-basic-black bg-opacity-30"
      @keyup.esc="handleAddCompetence"
      tabindex="0"
    >
      <AddCompetencies
        class="fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 transform"
        @closeModal="handleAddCompetence"
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
const openModalCompetence = ref(false)

const handleAddCompetence = () => {
  console.log('handleAddCompetence')
  openModalCompetence.value = !openModalCompetence.value
  if (openModalCompetence.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
</script>

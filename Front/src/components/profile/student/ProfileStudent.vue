<template>
  <div v-if="isStoreReady" class="flex h-full w-full flex-col gap-6">
    <ProfileHeader title="Mon profil" />
    <div class="grid h-full w-full grid-cols-4 gap-12 md:grid-cols-12">
      <div class="col-span-2 flex h-fit max-w-fit flex-col gap-6 md:col-span-3">
        <StudentCard /> <SettingsCard />
      </div>
      <div class="col-span-2 flex w-1/2 flex-col gap-6 md:col-span-9 md:w-full">
        <SingularityEmpty />
        <PersonnalityEmpty />
        <ExperiencesContainer />
        <FormationsContainer />
        <CompetenciesContainer />
        <CertificationsContainer />
        <CuriculumContainer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()
const isStoreReady = computed(() => studentStore.students.length > 0)
</script>

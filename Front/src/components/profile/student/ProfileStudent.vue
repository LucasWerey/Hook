<template>
  <div v-if="isStoreReady" class="flex h-full w-full flex-col gap-6">
    <ProfileHeader title="Mon profil" />
    <div class="flex h-full w-full gap-12">
      <div class="flex h-full w-1/5 flex-col gap-6 lg:w-[340px]">
        <StudentCard /> <SettingsCard />
      </div>
      <div class="flex h-full w-4/5 flex-col gap-6 bg-basic-darkgrey"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()
const isStoreReady = computed(() => studentStore.students.length > 0)
</script>

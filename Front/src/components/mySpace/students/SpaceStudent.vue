<template>
  <div class="flex h-[80vh] w-full flex-col gap-10">
    <SubnavStudent @update-page="handleUpdatePage" />
    <EmptyMyDemand v-show="currentPage === 'Mes demandes' && !hasActiveDemand" />
    <EmptyMyMatch v-show="currentPage === 'Mes matchs'" />
    <EmptyMyRefused v-show="currentPage === 'Mes refus'" />
    <MyDemand v-show="currentPage === 'Mes demandes' && hasActiveDemand" />
  </div>
</template>

<script setup lang="ts">
const currentPage = ref('Mes demandes')
const studentStore = useStudentsStore()

const hasActiveDemand = computed(() => {
  return (
    studentStore.students.length > 0 &&
    studentStore.students[0].research &&
    studentStore.students[0].profile.jobWanted.length > 0
  )
})

const handleUpdatePage = (page: string) => {
  currentPage.value = page
}
</script>

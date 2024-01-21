<template>
  <div class="flex h-[80vh] w-full flex-col gap-10">
    <SubnavStudent @update-page="handleUpdatePage" />
    <MyDemand v-show="currentPage === 'Mes demandes'" />
    <MyMatch v-show="currentPage === 'Mes matchs'" />
    <MyRefused v-show="currentPage === 'Mes refus'" />
  </div>
</template>

<script setup lang="ts">
const currentPage = ref('Mes demandes')

const handleUpdatePage = (page: string) => {
  currentPage.value = page
  console.log(currentPage.value)
}
</script>

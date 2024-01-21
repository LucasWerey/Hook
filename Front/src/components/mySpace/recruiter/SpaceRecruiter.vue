<template>
  <div class="flex h-[80vh] w-full flex-col gap-10">
    <SubnavRecruiter @update-page="handleUpdatePage" />
    <MyOffers v-show="currentPage === 'Les offres'" />
    <MyProfils v-show="currentPage === 'Profils'" />
  </div>
</template>

<script setup lang="ts">
const currentPage = ref('Les offres')

const handleUpdatePage = (page: string) => {
  currentPage.value = page
  console.log(currentPage.value)
}
</script>

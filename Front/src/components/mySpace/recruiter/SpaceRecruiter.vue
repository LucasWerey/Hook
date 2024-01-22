<template>
  <div class="flex h-[80vh] w-full flex-col gap-10">
    <SubnavRecruiter @update-page="handleUpdatePage" />
    <MyOffers v-show="currentPage === 'Les offres'" @openModal="handleOpenModal" />
    <MyProfils v-show="currentPage === 'Profils'" @openModal="handleOpenModal" />
    <div
      v-if="openModal"
      class="absolute bottom-0 left-0 z-50 h-[100dvh] w-full bg-basic-black bg-opacity-30"
      @keyup.esc="handleCloseModal"
      tabindex="0"
    >
      <NewOffer @closeModal="handleCloseModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref('Les offres')
const openModal = ref(false)

const handleUpdatePage = (page: string) => {
  currentPage.value = page
}

const handleOpenModal = () => {
  openModal.value = true
}

const handleCloseModal = () => {
  openModal.value = false
}
</script>

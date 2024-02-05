<template>
  <div class="flex min-h-[83vh] w-full flex-col gap-10">
    <SubnavRecruiter @update-page="handleUpdatePage" />
    <div v-if="!isStoreReady" class="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
    <div
      v-if="isStoreReady && hasMoreThanOneOffer"
      class="flex h-full w-full flex-col items-center justify-center"
    >
      <MyOffers
        v-show="currentPage === 'Les offres' && isStoreReady && hasMoreThanOneOffer"
        @createOffer="handleOpenModal"
      />
      <MyProfils v-show="currentPage === 'Profils' && isStoreReady && hasMoreThanOneOffer" />
    </div>
    <div
      v-else-if="isStoreReady && !hasMoreThanOneOffer"
      class="flex h-full w-full items-center justify-center"
    >
      <EmptyOffers
        v-show="currentPage === 'Les offres' && isStoreReady && !hasMoreThanOneOffer"
        @openModal="handleOpenModal"
      />
      <EmptyProfils
        v-show="currentPage === 'Profils' && isStoreReady && !hasMoreThanOneOffer"
        @openModal="handleOpenModal"
      />
    </div>
    <div
      v-if="openModal"
      class="fixed inset-0 z-[59] h-full w-full bg-basic-black bg-opacity-30"
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

const companyStore = useCompanyStore()
const recruiterStore = useRecruiterStore()
const isStoreReady = computed(() => recruiterStore.recruiters.length > 0)

const companyDetailedOffers = computed(() => companyStore.companies[0].detailed_offers)
const hasMoreThanOneOffer = computed(() => companyDetailedOffers.value.length > 0)

const handleUpdatePage = (page: string) => {
  currentPage.value = page
}

const handleOpenModal = () => {
  openModal.value = true
  document.body.classList.add('modal-open')
}

const handleCloseModal = () => {
  openModal.value = false
  document.body.classList.remove('modal-open')
}
</script>

<style>
.modal-open {
  overflow: hidden;
}
</style>

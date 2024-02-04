<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="flex flex-col items-center gap-6">
      <p class="max-w-[600px] text-center font-eina1 text-4 text-basic-darkgrey">
        Vous n’avez pas encore fait de demande.
      </p>
      <Button
        :type="'default'"
        :icon="'none'"
        :state="'active'"
        :iconPosition="'none'"
        :styled="'outlined'"
        class="max-w-[375px] bg-primary-lightmoonstone uppercase"
        @click="handleClicked"
      >
        Faire ma première demande
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleClicked = () => {}
</script>

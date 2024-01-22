import { emit } from 'process'; import { emit } from 'process';
<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="flex flex-col items-center gap-6">
      <p class="max-w-[600px] text-center font-eina1 text-4 text-basic-darkgrey">
        Vous n’avez pas encore de profils suggérés, créez une offre pour en découvrir.
      </p>
      <Button
        :type="'default'"
        :icon="'none'"
        :state="'active'"
        :iconPosition="'none'"
        :styled="'outlined'"
        class="max-w-[375px] bg-primary-lightmoonstone uppercase"
        @click="emit('openModal')"
      >
        Rédiger ma première offre
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['openModal'])
</script>

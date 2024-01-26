<template>
  <footer
    class="flex min-h-80 w-full shrink-0 flex-col items-center gap-16 bg-primary-moonstone pb-12 pt-16"
  >
    <nav class="flex w-full flex-col items-center gap-8">
      <DarkLogo class="h-12 cursor-pointer" alt="Company Logo" />
      <div class="flex gap-8 text-3 font-700 uppercase text-basic-white">
        <h2 class="cursor-pointer">Mon espace</h2>
        <h2 class="cursor-pointer">Messagerie</h2>
        <h2 class="cursor-pointer">planning</h2>
        <h2 class="cursor-pointer">newsletter</h2>
        <h2 class="cursor-pointer">contact</h2>
      </div>
    </nav>
    <section class="flex w-4/5 flex-col items-center gap-8">
      <hr class="w-full text-basic-white" />
      <div class="flex w-full justify-between font-eina1 text-4 text-basic-white opacity-85">
        <p>© 2024 Hook. Tous droits réservés</p>
        <div class="flex w-1/2 justify-end gap-4">
          <p class="cursor-pointer">Cookies</p>
          <p class="cursor-pointer">CGU</p>
          <p class="cursor-pointer">Politique de confidentialité</p>
          <p class="cursor-pointer">Mentions légales</p>
        </div>
      </div>
    </section>
  </footer>
</template>

<script setup lang="ts">
import DarkLogo from '../../assets/DarkLogo.vue'
</script>

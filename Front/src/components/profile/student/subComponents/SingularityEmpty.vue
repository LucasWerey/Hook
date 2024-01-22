<template>
  <div class="flex min-h-64 w-full flex-col gap-6 rounded-xl bg-basic-white p-6">
    <div class="flex w-full items-center gap-2">
      <IconsBase name="gem" class="h-6 w-6" />
      <h2 class="text-8 font-500 text-primary-moonstone">Ma singularité</h2>
    </div>
    <div class="flex w-full flex-col items-center justify-center gap-2 p-6 align-middle">
      <p class="w-1/2 text-center font-eina1 text-4 text-basic-darkgrey">
        Faites la différence en répondant à quelques questions, en déposant une vidéo de
        présentation ou en enregistrant un audio.
      </p>
      <Button
        :type="'default'"
        :state="'active'"
        :styled="'outlined'"
        class="max-h-8 max-w-fit border-none bg-basic-lightgrey text-3 uppercase"
        :isLight="true"
      >
        Répondre aux questions
      </Button>
    </div>
  </div>
</template>

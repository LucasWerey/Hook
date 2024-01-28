<template>
  <div class="flex min-h-60 w-full flex-col gap-4">
    <div class="flex w-full items-center justify-between">
      <h2 class="font-eina1 text-4 font-bold uppercase">Gérer mon processus</h2>
      <IconsBase name="pencil" class="cursor-pointer" size="small" color="grey" />
    </div>
    <div class="grid h-full w-full grid-cols-5">
      <div class="col-span-1 flex flex-col items-center gap-2">
        <h3 class="gap-4 text-center font-eina1 text-4 font-bold text-primary-moonstone">
          Contacté
        </h3>
        <div class="min-h-full w-full border-r border-basic-grey"></div>
      </div>
      <div class="col-span-1 flex flex-col items-center gap-2">
        <h3 class="text-center font-eina1 text-4 font-bold text-primary-moonstone">
          Entretien prévu
        </h3>
        <div class="min-h-full w-full border-r border-basic-grey"></div>
      </div>
      <div class="col-span-1 flex flex-col items-center gap-2">
        <h3 class="text-center font-eina1 text-4 font-bold text-primary-moonstone">
          En attente de retour
        </h3>
        <div class="min-h-full w-full border-r border-basic-grey"></div>
      </div>
      <div class="col-span-1 flex flex-col items-center gap-2">
        <h3 class="text-center font-eina1 text-4 font-bold text-primary-moonstone">Recruté</h3>
        <div class="min-h-full w-full border-r border-basic-grey"></div>
      </div>
      <div class="col-span-1 flex flex-col items-center gap-2">
        <h3 class="text-center font-eina1 text-4 font-bold text-error">Refusés</h3>
      </div>
    </div>
  </div>
</template>

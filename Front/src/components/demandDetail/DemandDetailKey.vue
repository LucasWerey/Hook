<template>
  <div class="flex w-full flex-col gap-4">
    <h2 class="font-eina1 text-4 font-bold uppercase">Vos chiffres clés</h2>
    <div class="flex w-full items-center gap-8">
      <div class="flex h-[154px] w-64 flex-col rounded border border-primary-moonstone px-4 py-2">
        <div class="flex items-baseline gap-1">
          <div class="DS-text-h2 text-primary-moonstone">+1</div>
          <span class="DS-text-small font-eina1 text-basic-grey">match cette semaine</span>
        </div>
        <p class="font-eina1 text-4 text-primary-moonstone">
          Les profils qui partagent leur hobbies reçoivent jusqu’à 3,9 fois plus d’offres.
        </p>
      </div>
      <div class="flex h-[154px] w-64 flex-col rounded border border-primary-moonstone px-4 py-2">
        <div class="flex items-baseline gap-1">
          <div class="DS-text-h2 text-primary-moonstone">58%</div>
          <span class="DS-text-small text-nowrap font-eina1 text-basic-grey"
            >de compatibilité
          </span>
        </div>
        <p class="font-eina1 text-4 text-primary-moonstone">
          Vous avez en moyenne 58% de compatibilité avec les offres proposées.
        </p>
      </div>
      <div class="super-match flex h-[176px] w-64 flex-col rounded border border-warning px-4 py-2">
        <div class="flex items-baseline gap-1">
          <div class="text-gradient DS-text-h2">1/3</div>
          <span class="DS-text-small text-nowrap font-eina1 text-basic-grey"
            >de compatibilité
          </span>
        </div>
        <p class="text-gradient font-eina1 text-4">
          Vous faites partie de 1/3 des profils les plus suggérés sur les offres:
          <span class="font-bold">“Développeur Front-End”</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.super-match {
  box-shadow: 0px 0px 13px 6px rgba(255, 171, 1, 0.27);
}
.text-gradient {
  background: linear-gradient(to bottom, #ffd700, #ffa800);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

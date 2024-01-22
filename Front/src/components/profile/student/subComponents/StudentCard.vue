<template>
  <div class="flex h-full w-full flex-col items-center gap-6 rounded-xl bg-basic-white p-6">
    <div class="item relative flex h-fit w-full flex-col items-center gap-2 overflow-hidden">
      <Avatar type="photo" alt="avatar" :src="avatarUrl" />
      <p class="text-nowrap text-8 font-500 text-basic-black">
        {{ dataInfo.firstname + ' ' + dataInfo.lastname }}
      </p>
      <IconsBase
        class="absolute right-0 top-0 h-5 w-5 cursor-pointer"
        color="grey"
        name="pencil"
        size="large"
      />
    </div>
    <div class="flex h-fit w-full flex-col gap-4 rounded bg-primary-lightmoonstone p-4">
      <h2 class="font-eina1 text-4 font-semibold text-primary-moonstone">
        Votre profil est complété à {{ progress }}%
      </h2>
      <div class="h-2 w-full rounded-full bg-basic-white">
        <div
          class="text-white h-full rounded-full bg-primary-moonstone text-center"
          :style="{ width: progress + '%' }"
        />
      </div>
      <div class="flex flex-col gap-2 rounded bg-basic-white p-4">
        <p class="font-eina1 text-4 font-normal text-primary-moonstone">
          Les profils qui parlent de leurs expériences professionnelles reçoivent jusqu’à 4,5 fois
          plus d’offres.
        </p>
        <Button
          :type="'default'"
          :icon="'none'"
          :state="'active'"
          :iconPosition="'none'"
          :styled="'outlined'"
          :isLight="true"
          class="w-full text-nowrap border-primary-moonstone bg-primary-lightmoonstone uppercase text-primary-moonstone"
        >
          Ajouter une expérience
        </Button>
      </div>
      <div class="flex flex-col gap-2 rounded bg-basic-white p-4">
        <p class="font-eina1 text-4 font-normal text-primary-moonstone">
          Répondre à une série de questions sur votre personnalité vous permettra de vous
          différencier des autres candidats.
        </p>
        <Button
          :type="'default'"
          :icon="'none'"
          :state="'active'"
          :iconPosition="'none'"
          :styled="'outlined'"
          :isLight="true"
          class="w-full text-nowrap border-primary-moonstone bg-primary-lightmoonstone uppercase text-primary-moonstone"
        >
          Répondre aux questions
        </Button>
      </div>
    </div>
    <div class="flex w-full flex-col gap-6">
      <div class="flex w-full flex-col">
        <h3 class="font-eina1 text-2 font-bold uppercase text-primary-powder">EMAIL</h3>
        <p class="font-eina1 text-4 font-normal text-basic-black">{{ dataInfo.email }}</p>
      </div>
      <div class="flex w-full flex-col">
        <h3 class="font-eina1 text-2 font-bold uppercase text-primary-powder">Niveau d'études</h3>
        <p class="font-eina1 text-4 font-normal text-basic-black">{{ dataInfo.schoolGrade }}</p>
      </div>
      <div class="flex w-full flex-col">
        <h3 class="font-eina1 text-2 font-bold uppercase text-primary-powder">
          Numéro de téléphone
        </h3>
        <p class="font-eina1 text-4 font-normal text-basic-black">{{ dataInfo.phoneNumber }}</p>
      </div>
      <div class="flex w-full flex-col">
        <h3 class="font-eina1 text-2 font-bold uppercase text-primary-powder">Adresse</h3>
        <p class="font-eina1 text-4 font-normal text-basic-black">{{ dataInfo.address }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const studentStore = useStudentsStore()

const dataInfo = reactive({
  address: '',
  email: studentStore.students[0].email,
  firstname: studentStore.students[0].firstname,
  lastname: studentStore.students[0].lastname,
  phoneNumber: '',
  schoolGrade: studentStore.students[0].profile.formationYear
})
const progress = computed(() => {
  let progress = 0
  if (dataInfo) {
    if (dataInfo.email) progress += 100 / 6
    if (dataInfo.firstname) progress += 100 / 6
    if (dataInfo.lastname) progress += 100 / 6
    if (dataInfo.schoolGrade) progress += 100 / 6
    if (dataInfo.phoneNumber) progress += 100 / 6
    if (dataInfo.address) progress += 100 / 6
  }
  return progress.toFixed(0)
})

const avatarUrl = computed(() => {
  if (studentStore.students.length > 0 && studentStore.students[0].firstname) {
    return `https://api.dicebear.com/7.x/micah/svg?seed=${studentStore.students[0].firstname}&radius=50&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf`
  }
  return 'https://api.dicebear.com/7.x/micah/svg?seed=hugo&radius=50&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf'
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <div class="flex items-center gap-2">
      <IconsBase name="gem" class="h-6 w-6" />
      <h2 class="text-8 text-primary-moonstone">Ma singularité</h2>
    </div>
    <div class="flex w-full gap-10">
      <div class="flex min-w-fit flex-col gap-2">
        <h3 class="font-eina1 text-4 font-bold">Vidéo de présentation</h3>
        <VideoPlayer :size="videoSize" src="" />
      </div>
      <div class="flex flex-col gap-4 pt-8">
        <h3 class="font-eina1 text-4 font-bold">Questions</h3>
        <div class="flex flex-col" v-for="(question, index) in questions" :key="index">
          <h4 class="font-eina1 text-4 font-bold text-primary-moonstone">{{ question.title }}</h4>
          <p class="font-eina1 text-4">{{ question.value }}</p>
        </div>
      </div>
    </div>
    <div class="flex min-w-fit flex-col gap-2">
      <h3 class="font-eina1 text-4 font-bold">Audio de présentation</h3>
      <AudioPlayer />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataStudent: { required: true, type: Object }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dataStudent = computed(() => props.dataStudent)

const questions = [
  { title: 'Mon film préféré', value: 'Avatar' },
  { title: 'Ma musique préférée', value: 'We Are the Champions - Queen' },
  { title: 'Ma citation préférée', value: '“J’arrive dans 5 min”' },
  {
    title: 'Citez 3 objets que vous emporteriez sur une île desserte et pourquoi ?',
    value:
      "Je choisirais un couteau multifonction pour sa polyvalence, une trousse de premiers secours pour la sécurité, et une boussole pour l'orientation, assurant ainsi ma survie et mon bien-être sur une île déserte. Ces objets me fourniraient les outils nécessaires pour faire face à des situations pratiques, médicales et de navigation."
  }
]

const screenSize = useScreenSize()

const videoSize = computed(() => {
  if (screenSize.isMobile.value) {
    return 'xs'
  } else if (!screenSize.isLargeDesktop.value) {
    return 'sm'
  } else {
    return 'md'
  }
})
</script>

<template>
  <div class="flex w-full flex-col gap-16">
    <div class="flex w-full flex-col gap-6">
      <div class="flex items-center gap-2">
        <IconsBase name="gem" class="h-6 w-6" />
        <h2 class="text-8 text-primary-moonstone">Ma singularité</h2>
      </div>
      <div class="flex w-full gap-10">
        <div class="flex min-w-fit flex-col gap-2" v-if="screenSize.isLargeDesktop.value">
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
      <div class="flex min-w-fit flex-col gap-2" v-if="refs.has_audio.value">
        <h3 class="font-eina1 text-4 font-bold">Audio de présentation</h3>
        <AudioPlayer />
      </div>
    </div>
    <div class="grid w-full grid-cols-2 gap-16" v-if="projects.length > 0 || interests.length > 0">
      <div v-if="projects.length > 0" class="col-span-1 flex h-full flex-col gap-4">
        <h3 class="text-8 text-primary-moonstone">Mes projets personnels</h3>
        <div v-for="(project, index) in projects" :key="index" class="flex flex-col gap-4">
          <div>
            <h4 class="font-eina1 text-4 font-bold">{{ project.name }}</h4>
            <p class="font-eina1 text-4 italic text-basic-darkgrey">{{ project.date }}</p>
            <pre class="whitespace-pre-line font-eina1 text-4">{{ project.desc }}</pre>
            <a
              class="text-4 text-primary-moonstone"
              :href="project.link || undefined"
              target="_blank"
              >{{ project.link }}</a
            >
          </div>
          <hr v-if="index < projects.length - 1" class="w-full text-basic-lightgrey" />
        </div>
      </div>
      <div v-if="interests.length > 0" class="col-span-1 flex h-full flex-col gap-4">
        <h3 class="text-8 text-primary-moonstone">Mes centres d’intérêts</h3>
        <div v-for="(interest, index) in interests" :key="index" class="flex flex-col gap-4">
          <div>
            <h4 class="font-eina1 text-4 font-bold">{{ interest.genre }}</h4>
            <ul class="list-inside list-disc whitespace-pre-line">
              <li
                v-for="(line, lineIndex) in interest.desc.split('\n')"
                :key="lineIndex"
                class="font-eina1 text-4"
              >
                {{ line }}
              </li>
            </ul>
          </div>
          <hr v-if="index < projects.length - 1" class="w-full text-basic-lightgrey" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataStudent: { required: true, type: Object }
})

const dataStudent = computed(() => props.dataStudent)
const singularity = computed(() => dataStudent.value?.profile?.singularity)

type RefKeys = 'has_audio' | 'favorite_movie' | 'favorite_song' | 'favorite_quote' | 'random'

const refs: Record<RefKeys, Ref<string | boolean>> = {
  favorite_movie: ref(''),
  favorite_quote: ref(''),
  favorite_song: ref(''),
  has_audio: ref(false),
  random: ref('')
}

watch(singularity, newVal => {
  if (newVal && newVal.length > 0) {
    const singularityObj = newVal[0]
    for (const property in refs) {
      if (Object.prototype.hasOwnProperty.call(singularityObj, property)) {
        refs[property as RefKeys].value = singularityObj[property]
      }
    }
  }
})

const questions = computed(() => [
  { title: 'Mon film préféré', value: refs.favorite_movie.value },
  { title: 'Ma musique préférée', value: refs.favorite_song.value },
  { title: 'Ma citation préférée', value: refs.favorite_quote.value },
  {
    title: 'Citez 3 objets que vous emporteriez sur une île desserte et pourquoi ?',
    value: refs.random.value
  }
])

type Project = {
  name: string
  date: string
  desc: string
  link: string | null
}

const projects = computed(() => {
  const singularityValue = singularity.value
  if (Array.isArray(singularityValue) && singularityValue.length > 1) {
    return (singularityValue[1] as Project[]).map(project => {
      const linkMatch = project.desc.match(/https?:\/\/[^\s]+/)
      const link = linkMatch ? linkMatch[0] : null
      const desc = project.desc.replace(/https?:\/\/[^\s]+/, '')
      return { ...project, desc, link }
    })
  }
  return []
})

type Interest = {
  genre: string
  desc: string
}

const interests = computed(() => {
  const singularityValue = singularity.value
  if (Array.isArray(singularityValue) && singularityValue.length > 1) {
    return (singularityValue[2] as Interest[]).map(interest => {
      return { ...interest }
    })
  }
  return []
})

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

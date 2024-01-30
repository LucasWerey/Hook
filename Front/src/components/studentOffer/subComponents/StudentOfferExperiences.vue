<template>
  <div class="grid w-full grid-cols-2">
    <div class="col-span-1 flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <IconsBase name="briefcase" color="powder" class="h-6 w-6" />
        <h2 class="text-center text-8 text-primary-powder">Expériences professionelles</h2>
      </div>
      <div
        v-for="(experience, index) in mappedExperiences"
        :key="index"
        class="flex w-5/6 flex-col gap-2"
      >
        <div class="flex flex-col gap-1">
          <h3 class="font-eina1 text-4 font-bold">{{ experience.jobTitle }}</h3>
          <h4 class="font-eina1 text-4">{{ experience.company }}</h4>
          <p class="font-eina1 text-4 italic text-basic-darkgrey">
            {{ experience.startDate }} - {{ experience.endDate }} ({{ experience.duration }})
          </p>
          <p class="font-eina1 text-4 text-primary-powder">{{ experience.location }}</p>
          <div v-if="experience.description.includes('\n')">
            <ul class="list-inside list-disc whitespace-pre-line">
              <li
                v-for="(line, lineIndex) in experience.description.split('\n')"
                :key="lineIndex"
                class="font-eina1 text-4"
              >
                {{ line }}
              </li>
            </ul>
          </div>
          <div v-else class="w-full font-eina1 text-4">
            {{ experience.description }}
          </div>
        </div>
        <hr v-if="index < experiences.length - 1" class="w-5/6 text-basic-lightgrey" />
      </div>
    </div>
    <div class="col-span-1 flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <IconsBase name="graduationCap" color="powder" class="h-6 w-6" />
        <h2 class="text-center text-8 text-primary-powder">Formations</h2>
      </div>
      <div v-for="(formation, index) in mappedFormations" :key="index" class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <h3 class="font-eina1 text-4 font-bold">{{ formation.name }}</h3>
          <h4 class="font-eina1 text-4">{{ formation.university }}</h4>
          <p class="font-eina1 text-4 italic text-basic-darkgrey">
            {{ formation.startDate }} - {{ formation.endDate }}
          </p>
          <div v-if="formation.description.includes('\n')">
            <ul class="list-inside list-disc whitespace-pre-line">
              <li
                v-for="(line, lineIndex) in formation.description.split('\n')"
                :key="lineIndex"
                class="font-eina1 text-4"
              >
                {{ line }}
              </li>
            </ul>
          </div>
          <div v-else class="font-eina1 text-4">
            {{ formation.description }}
          </div>
        </div>
        <hr v-if="index < formations.length - 1" class="w-full text-basic-lightgrey" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataStudent: { required: true, type: Object }
})

const dataStudent = computed(() => props.dataStudent)
const experiences = computed(() => dataStudent.value?.profile?.experiences)
const formations = computed(() => dataStudent.value?.profile?.formations)

type Experience = {
  company: string
  currentJob: boolean
  duration: string
  description: string
  endDate: {
    $date: {
      $numberLong: string
    }
  }
  jobTitle: string
  location: string
  startDate: {
    $date: {
      $numberLong: string
    }
  }
}

const mappedExperiences = computed(() => {
  return experiences.value?.map((experience: Experience) => ({
    company: experience.company,
    currentJob: experience.currentJob,
    description: experience.description,
    duration: getDuration(
      experience.startDate.$date.$numberLong,
      experience.endDate.$date.$numberLong
    ),
    endDate: experience.currentJob
      ? 'Actuellement'
      : formatDate(experience.endDate.$date.$numberLong),
    jobTitle: experience.jobTitle,
    location: experience.location,
    startDate: formatDate(experience.startDate.$date.$numberLong)
  }))
})

type Formation = {
  currentFormation: boolean
  degree: string
  description: string
  endDate: {
    $date: {
      $numberLong: string
    }
  }
  result: string
  startDate: {
    $date: {
      $numberLong: string
    }
  }
  university: string
  name: string
}

const mappedFormations = computed(() => {
  return formations.value?.map((formation: Formation) => ({
    currentFormation: formation.currentFormation,
    degree: formation.degree,
    description: formation.description,
    endDate: formation.currentFormation
      ? 'Actuellement'
      : formatDate(formation.endDate.$date.$numberLong).split(' ')[1],
    name: formation.name,
    result: formation.result,
    startDate: formatDate(formation.startDate.$date.$numberLong).split(' ')[1],
    university: formation.university
  }))
})

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const formatDate = (timestamp: string) => {
  const date = new Date(Number(timestamp))
  const formattedDate = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(
    date
  )
  return capitalizeFirstLetter(formattedDate)
}

const getDuration = (startDate: string, endDate: string) => {
  const start = new Date(Number(startDate))
  const end = endDate === 'Actuellement' ? new Date() : new Date(Number(endDate))

  const diffInMilliseconds = Math.abs(end.getTime() - start.getTime())
  const diffInWeeks = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7))
  const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30))
  const diffInYears = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365))

  if (diffInWeeks < 4) {
    return `${diffInWeeks} semaine`
  } else if (diffInMonths < 12) {
    return `${diffInMonths} mois`
  } else {
    return `${diffInYears} ans`
  }
}
</script>

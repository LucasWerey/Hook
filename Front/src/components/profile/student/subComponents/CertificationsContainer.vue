<template>
  <div
    class="flex min-h-64 w-full flex-col gap-6 rounded-xl bg-basic-white p-6"
    :class="{ 'h-[370px]': hasSomeNonEmptyCertifications }"
  >
    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex w-full items-center gap-2">
        <IconsBase name="award" class="h-6 w-6" color="powder" />
        <h2 class="text-8 font-500 text-primary-powder">Mes certifications</h2>
      </div>
      <IconsBase name="plus" class="h-6 w-6" color="powder" />
    </div>
    <div
      v-if="!hasSomeNonEmptyCertifications"
      class="flex w-full flex-col items-center justify-center gap-2 p-6 align-middle"
    >
      <p class="w-1/2 text-center font-eina1 text-4 text-basic-darkgrey">
        Vous n’avez pas encore ajouté de certification.
      </p>
      <Button
        :type="'default'"
        :state="'active'"
        :styled="'outlined'"
        class="max-h-8 max-w-fit border-none bg-basic-lightgrey text-3 uppercase"
        :isLight="true"
      >
        Ajouter une certification
      </Button>
    </div>
    <div
      v-else-if="hasSomeNonEmptyCertifications"
      class="relative flex h-full w-full justify-center gap-6 overflow-hidden align-middle"
    >
      <div
        class="relative flex h-full w-full gap-6 align-middle"
        :class="{
          ' justify-start ': hasMoreThanTwoCertifications,
          ' justify-center': !hasMoreThanTwoCertifications
        }"
        :style="{ transform: `translateX(-${translatePx}px)` }"
        style="transition: transform 0.5s ease-in-out"
      >
        <CertificationsPresentation
          v-for="(certification, index) in nonEmptyCertifications"
          :key="index"
          :info="certification"
          ref="certificationRefs"
        />
      </div>
      <IconsBase
        v-if="hasMoreThanTwoCertifications && previousClickAllowed"
        name="chevronDown"
        color="white"
        :size="'medium'"
        class="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full bg-primary-charcoal drop-shadow-sm"
        :rotate="90"
        @click="previousCertif"
      />
      <IconsBase
        v-if="hasMoreThanTwoCertifications && nextClickAllowed"
        name="chevronDown"
        color="white"
        :size="'medium'"
        class="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full bg-primary-charcoal drop-shadow"
        :rotate="270"
        @click="nextCertif"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CertificationsPresentation from './CertificationsPresentation.vue'

const studentStore = useStudentsStore()

const certifications = studentStore.students[0].profile.certifications
const nonEmptyCertifications = certifications.filter(
  certification => Object.keys(certification).length !== 0
)
const hasMoreThanTwoCertifications = nonEmptyCertifications.length > 2
const hasSomeNonEmptyCertifications = nonEmptyCertifications.length != 0

const translatePx = ref(0)
const certificationRefs = ref<InstanceType<typeof CertificationsPresentation>[]>([])
const numberofPreviousClickAllowed = ref(0)
const numberofNextClickAllowed = ref(nonEmptyCertifications.length - 2)
const countofPreviousClick = ref(0)
const countofNexClick = ref(0)
const previousClickAllowed = ref(false)
const nextClickAllowed = ref(true)

const nextCertif = async () => {
  if (certificationRefs.value && countofNexClick.value < numberofNextClickAllowed.value) {
    countofNexClick.value += 1
    countofPreviousClick.value -= 1
    previousClickAllowed.value = true
    numberofPreviousClickAllowed.value += 1
    translatePx.value += (certificationRefs.value[0].$el as HTMLElement).offsetWidth
  }
  if (countofNexClick.value === numberofNextClickAllowed.value) nextClickAllowed.value = false
}

const previousCertif = async () => {
  if (certificationRefs.value && countofPreviousClick.value < numberofPreviousClickAllowed.value) {
    countofPreviousClick.value += 1
    countofNexClick.value -= 1
    numberofPreviousClickAllowed.value -= 1
    nextClickAllowed.value = true
    translatePx.value -= (certificationRefs.value[0].$el as HTMLElement).offsetWidth
  }
  if (countofPreviousClick.value === numberofPreviousClickAllowed.value)
    previousClickAllowed.value = false
}
</script>

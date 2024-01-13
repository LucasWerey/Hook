<template>
  <div
    ref="loginForm"
    class="w-full h-[100vh] lg:pt-10 flex flex-col items-center gap-4 lg:gap-12 self-stretch relative p-2 lg:p-0 bg-basic-verylightgrey"
  >
    <div class="flex flex-col gap-4 items-center">
      <IconsBase name="logo" size="medium" class="min-w-32 min-h-32" />
      <h1 class="text-5 lg:text-8 font-800">{{ studentSignup.title }}</h1>
    </div>
    <div class="w-full flex flex-col items-center gap-4 lg:gap-12">
      <div class="w-full flex flex-col items-center gap-4">
        <StepIndicator :number="stepNumber" :currentStep="currentStep" class="h-2" />
        <h2
          class="text-3 lg:text-4 text-primary-moonstone font-eina1 font-bold uppercase"
          :key="phaseWording"
        >
          {{ phaseWording }}
        </h2>
      </div>
      <div v-show="currentStep === 1" class="w-full items-center flex flex-col gap-4 lg:gap-12">
        <StudentForm @submit="handleSubmit" key="1" />
      </div>
      <div v-show="currentStep === 2" key="2">eazezae</div>
    </div>
    <div class="absolute left-9 top-9">
      <IconsBase name="moveLeft" class="cursor-pointer w-9 h-9" color="powder" @click="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../../router'

type StepNumber = 1 | 2 | undefined

const stepNumber: Ref<StepNumber> = ref(2)
const currentStep: Ref<StepNumber> = ref(1)

const phaseWording = computed(() => {
  return currentStep.value && currentStep.value >= 1 && currentStep.value <= 3
    ? studentSignup.phase[`phase${currentStep.value}`]
    : ''
})

const handleSubmit = () => {
  if (currentStep.value && stepNumber.value && currentStep.value < stepNumber.value) {
    currentStep.value += 1
  }
}

const goBack = () => {
  if (currentStep.value && currentStep.value === 1) router.push('/')
  if (currentStep.value && currentStep.value > 1) currentStep.value -= 1
}
</script>

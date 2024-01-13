<template>
  <div
    ref="loginForm"
    class="relative flex h-[100vh] w-full flex-col items-center gap-4 self-stretch bg-basic-verylightgrey p-2 lg:gap-12 lg:p-0 lg:pt-10"
  >
    <div class="flex flex-col items-center gap-4">
      <IconsBase name="logo" size="medium" class="min-h-32 min-w-32" />
      <h1 class="text-5 font-800 lg:text-8">{{ studentSignup.title }}</h1>
    </div>
    <div class="flex w-full flex-col items-center gap-4 lg:gap-12">
      <div class="flex w-full flex-col items-center gap-4">
        <StepIndicator :number="stepNumber" :currentStep="currentStep" class="h-2" />
        <h2
          class="font-eina1 text-3 font-bold uppercase text-primary-moonstone lg:text-4"
          :key="phaseWording"
        >
          {{ phaseWording }}
        </h2>
      </div>
      <div v-show="store.step === 1" class="flex w-full flex-col items-center gap-4 lg:gap-12">
        <StudentForm @submit="handleSubmit" key="1" />
      </div>
      <div v-show="store.step === 2" key="2">eazezae</div>
    </div>
    <div class="absolute left-9 top-9">
      <IconsBase name="moveLeft" class="h-9 w-9 cursor-pointer" color="powder" @click="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
type StepNumber = 1 | 2 | undefined

const stepNumber: Ref<StepNumber> = ref(2)
const currentStep: Ref<StepNumber> = ref(1)

const store = useRegistrationStore()

const phaseWording = computed(() => {
  return store.step >= 1 && store.step <= 3
    ? studentSignup.phase[`phase${store.step as 1 | 2}`]
    : ''
})

const handleSubmit = () => {
  if (store.step < 2) {
    store.nextStep()
  }
}

const goBack = () => {
  if (store.step === 1) router.push('/')
  if (store.step > 1) store.prevStep()
}

onBeforeRouteLeave((_, __, next) => {
  if (store.step > 1) {
    store.prevStep()
    next(false)
  } else {
    next()
  }
})
</script>

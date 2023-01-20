<template>
  <div
    ref="loginForm"
    class="relative flex min-h-[100vh] w-full flex-col items-center gap-4 self-stretch bg-basic-verylightgrey p-2 lg:gap-6 lg:p-0 lg:pt-1"
  >
    <div class="flex flex-col items-center gap-2">
      <IconsBase name="logo" size="medium" class="min-h-32 min-w-32" />
      <h1 class="text-5 font-800 lg:text-8">{{ studentSignup.title }}</h1>
    </div>
    <div class="flex w-full flex-col items-center gap-4 lg:gap-8">
      <div class="flex w-full flex-col items-center gap-4">
        <StepIndicator :number="stepNumber" :currentStep="store.step" class="h-2" />
        <h2
          class="font-eina1 text-3 font-bold uppercase text-primary-moonstone lg:text-4"
          :key="phaseWording"
        >
          {{ phaseWording }}
        </h2>
      </div>
      <div v-show="store.step === 1" class="flex w-full flex-col items-center gap-4 lg:gap-12">
        <RecruiterFormStep1 @submit="handleSubmit" @failed="onFailed" key="1" />
      </div>
      <div v-show="store.step === 2" class="flex w-full flex-col items-center gap-4 lg:gap-12">
        <RecruiterFormStep2 @submit="handleSubmit" @failed="onFailed" key="2" />
      </div>
    </div>
    <div class="absolute left-9 top-9">
      <IconsBase name="moveLeft" class="h-9 w-9 cursor-pointer" color="powder" @click="goBack" />
    </div>
    <transition name="fade">
      <SnackBar
        v-if="showSnackbar"
        :type="success ? 'validation' : 'error'"
        close="no"
        size="small"
        class="fixed bottom-2 right-2 top-5 z-50 md:w-auto"
      >
        {{ success ? successMessage : errorMessage }}
      </SnackBar>
    </transition>
  </div>
</template>

<script setup lang="ts">
type StepNumber = 1 | 2

const stepNumber: Ref<StepNumber> = ref(2)
const showSnackbar = ref(false)
const success = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const store = useRegistrationRecruiterStore()

const phaseWording = computed(() => {
  return store.step >= 1 && store.step <= 3 ? RecruiterSignup.phase[`phase${store.step}`] : ''
})

const handleSubmit = () => {
  if (store.step < 2) {
    store.nextStep()
  } else if (store.step === 2) {
    console.log(store.step)
  }
}

const goBack = () => {
  if (store.step === 1) router.push('/')
  if (store.step > 1) store.prevStep()
}

const onFailed = () => {
  showSnackbar.value = true
  success.value = false
  successMessage.value = ''
  errorMessage.value = 'Veuillez remplir tous les champs'
  setTimeout(resetSnackbar, 5000)
}

const resetSnackbar = () => {
  showSnackbar.value = false
  success.value = false
  successMessage.value = ''
  errorMessage.value = ''
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

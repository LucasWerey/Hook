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
        <StudentFormStep1 @submit="handleSubmit" @failed="onFailed" key="1" />
      </div>
      <div v-show="store.step === 2" class="flex w-full flex-col items-center gap-4 lg:gap-12">
        <StudentFormStep2 @submit="handleSubmit" @failed="onFailed" key="2" />
      </div>
      <div v-show="store.step === 3" class="flex w-full flex-col items-center gap-4 lg:gap-12">
        <StudentFormStep3 @submit="handleSubmit" @failed="onFailed" key="3" />
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
type StepNumber = 1 | 2 | 3

const stepNumber: Ref<StepNumber> = ref(3)
const showSnackbar = ref(false)
const success = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const store = useRegistrationStudentStore()

const phaseWording = computed(() => {
  return store.step >= 1 && store.step <= 3
    ? studentSignup.phase[`phase${store.step as 1 | 2 | 3}`]
    : ''
})

const handleSubmit = () => {
  if (store.step < 3) {
    store.nextStep()
  } else if (store.step === 3) {
    createUserStudent()
  }
}

const response = ref(null)
const studentId = ref('')

const createUserStudent = async () => {
  const data = {
    email: store.form1.email,
    firstname: store.form2.firstname,
    lastname: store.form2.lastname,
    password: store.form1.password,
    statut: 'student'
  }
  try {
    response.value = await createUser(data)
    studentId.value = (response.value as any)?.insertedId['$oid']
    if (studentId.value) {
      updateUserStudent()
    }
  } catch (error) {
    const apiError = handleApiError(error)
    console.error(apiError)
  }
}

const updateUserStudent = async () => {
  const data = {
    contract_type: store.form3.contractType,
    duration: store.form3.contractDuration,
    level: store.form2.formationYear,
    location: store.form3.contractLocation,
    profile: {
      certifications: [{}],
      experiences: [
        {
          company: store.form2.lastExpCompany,
          currentJob: store.form2.currentPost,
          description: store.form2.lastExpDescription,
          endDate: {
            $date: {
              $numberLong: String(store.form2.lastExpEndDate.getTime())
            }
          },
          jobTitle: store.form2.lastExpPoste,
          location: store.form2.lastExpLocation,
          startDate: {
            $date: {
              $numberLong: String(store.form2.lastExpStartDate.getTime())
            }
          }
        }
      ],
      formations: [
        {
          currentFormation: false,
          degree: store.form2.formationYear,
          description: store.form2.description,
          endDate: '',
          name: store.form2.formationName,
          result: store.form2.schoolResult,
          startDate: {
            $date: {
              $numberLong: String(store.form2.schoolStartDate.getTime())
            }
          },
          university: store.form2.school
        }
      ],
      hardSkills: store.form2.hardSkills,
      jobWanted: [
        {
          contract_type: store.form3.contractType,
          duration: store.form3.contractDuration,
          endDate: {
            $date: {
              $numberLong: String(store.form3.contractEndDate.getTime())
            }
          },
          location: store.form3.contractLocation,
          name: store.form3.postLookingFor,
          research: true,
          startDate: {
            $date: {
              $numberLong: String(store.form3.contractStartDate.getTime())
            }
          },
          transportDuration: store.form3.transportDuration,
          transportsUsed: store.form3.transportAvailable
        }
      ],
      keyWords: store.form3.keyWords,
      softSkills: store.form2.softSkills
    },
    research: true,
    start_date: {
      $date: {
        $numberLong: String(store.form3.contractStartDate.getTime())
      }
    }
  }
  try {
    response.value = await updateStudent(studentId.value, data)
    onSuccess()
  } catch (error) {
    const apiError = handleApiError(error)
    console.error(apiError)
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
  emit('failed')
}

const onSuccess = () => {
  showSnackbar.value = true
  success.value = true
  successMessage.value = 'Votre compte a bien été créé'
  errorMessage.value = ''
  setTimeout(resetSnackbar, 5000)
  emit('success')
}

const resetSnackbar = () => {
  showSnackbar.value = false
  success.value = false
  successMessage.value = ''
  errorMessage.value = ''
}

onBeforeRouteLeave((to, _, next) => {
  if (to.name === 'login') {
    next()
  } else if (store.step > 1) {
    store.prevStep()
    next(false)
  } else {
    next()
  }
})

const emit = defineEmits(['success', 'failed'])
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

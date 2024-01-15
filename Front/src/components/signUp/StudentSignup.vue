<template>
  <div
    ref="loginForm"
    class="relative flex h-[100vh] w-full flex-col items-center gap-4 self-stretch bg-basic-verylightgrey p-2 lg:gap-6 lg:p-0 lg:pt-1"
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
        <StudentFormStep1 @submit="handleSubmit" key="1" />
      </div>
      <div v-show="store.step === 2" class="flex w-full flex-col items-center gap-4 lg:gap-12">
        <StudentFormStep2 @submit="handleSubmit" key="2" />
      </div>
    </div>
    <div class="absolute left-9 top-9">
      <IconsBase name="moveLeft" class="h-9 w-9 cursor-pointer" color="powder" @click="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
type StepNumber = 1 | 2 | undefined

const stepNumber: Ref<StepNumber> = ref(2)

const store = useRegistrationStore()

const phaseWording = computed(() => {
  return store.step >= 1 && store.step <= 3
    ? studentSignup.phase[`phase${store.step as 1 | 2}`]
    : ''
})

const handleSubmit = () => {
  if (store.step < 2) {
    store.nextStep()
  } else if (store.step === 2) {
    createUserStudent()
  }
}

const response = ref(null)
const studentId = ref('')

const createUserStudent = async () => {
  const data = {
    firstname: store.form2.firstname,
    lastname: store.form2.name,
    email: store.form1.email,
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
    console.log(apiError)
  }
}

const updateUserStudent = async () => {
  const data = {
    duree: store.form2.duration,
    niveau: store.form2.schoolGrade,
    type_contrat: store.form2.contractType,
    date_debut: {
      $date: {
        $numberLong: String(store.form2.start.getTime())
      }
    },
    lieu: store.form2.location,
    recherche: store.form2.actualLookingFor
  }
  console.log(store.form2.start.toISOString(), typeof store.form2.start.toISOString())
  try {
    response.value = await updateStudent(studentId.value, data)
    console.log(response.value)
  } catch (error) {
    const apiError = handleApiError(error)
    console.log(apiError)
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

<template>
  <div class="flex w-full flex-col gap-6 lg:w-1/2 lg:flex-row">
    <Button
      class="w-full bg-basic-white font-eina1 text-4 font-normal"
      type="socialMedia"
      icon="google"
      icon-position="leading"
      styled="fill"
      state="active"
    >
      {{ studentSignup.google }}
    </Button>
    <Button
      class="w-full bg-basic-white font-eina1 text-4 font-normal"
      type="socialMedia"
      icon="linkedin"
      icon-position="leading"
      styled="fill"
      state="active"
    >
      {{ studentSignup.linkedin }}
    </Button>
  </div>
  <div class="flex h-6 w-full items-center justify-center gap-2 align-middle lg:w-1/3">
    <hr class="my-8 h-px w-full border-0 bg-basic-black" />
    <p class="font-eina1 text-4 font-500">OU</p>
    <hr class="my-8 h-px w-full border-0 bg-basic-black" />
  </div>
  <form class="flex w-full flex-col justify-center gap-6 lg:w-1/2">
    <div class="flex flex-col gap-6 md:flex-row">
      <InputField
        class="w-full"
        v-model="emailModel"
        :placeholder="studentSignup.emailPlaceholder"
        :label="studentSignup.emailLabel"
        :hint="emailHint"
        :state="emailFailed ? 'error' : 'default'"
        @blur="isEmailValid"
        inputType="email"
      />
      <p class="invisible w-full" />
    </div>
    <div class="flex flex-col gap-6 md:flex-row">
      <InputField
        class="w-full"
        v-model="passwordModel"
        :placeholder="studentSignup.passwordPlaceholder"
        :label="studentSignup.passwordLabel"
        :hint="studentSignup.passwordHint"
        :state="passwordFailed ? 'error' : 'default'"
        @blur="checkPasswordFields"
        inputType="password"
      />
      <InputField
        class="w-full"
        v-model="confirmPasswordModel"
        :placeholder="studentSignup.confirmPasswordPlaceholder"
        :label="studentSignup.confirmPasswordLabel"
        :hint="studentSignup.confirmPasswordHint"
        :state="confirmPasswordFailed ? 'error' : 'default'"
        @blur="checkPasswordFields"
        inputType="password"
      />
    </div>
    <div class="flex w-fit items-center gap-2">
      <CheckBox
        v-model="keepLogged"
        @click="keepLogged = !keepLogged"
        state="unchecked"
        color="transparent"
        form="square"
      />
      <p class="w-full font-eina1 text-4 font-normal">{{ studentSignup.rememberMe }}</p>
    </div>
    <Button
      type="default"
      class="w-full max-w-md self-center"
      icon="moveRight"
      iconPosition="trailing"
      styled="fill"
      state="active"
      @click.prevent="handleSubmit"
    >
      {{ studentSignup.nextButton }}
    </Button>
  </form>
</template>

<script setup lang="ts">
const store = useRegistrationStore()

const emailModel = ref('')
const passwordModel = ref('')
const confirmPasswordModel = ref('')
const emailHint = ref('')
const keepLogged = ref(false)
const passwordFailed = ref(false)
const emailFailed = ref(false)
const confirmPasswordFailed = ref(false)

const isEmailValid = () => {
  emailFailed.value = !isValidEmail(emailModel.value) && emailModel.value !== ''
  emailHint.value = studentSignup.emailFailedHint
}

const checkPasswordFields = () => {
  isConfirmPasswordValid(), isPasswordValid()
}

const isPasswordValid = () => {
  passwordFailed.value = !isValidPassword(passwordModel.value) && passwordModel.value !== ''
}

const isConfirmPasswordValid = () => {
  confirmPasswordFailed.value =
    !areStringsEqual(passwordModel.value, confirmPasswordModel.value) &&
    confirmPasswordModel.value !== ''
}

const isFormValid = () => {
  if (emailModel.value === '' || passwordModel.value === '' || confirmPasswordModel.value === '') {
    return false
  }

  if (emailFailed.value || passwordFailed.value || confirmPasswordFailed.value) {
    return false
  }

  return true
}
const handleSubmit = () => {
  if (isFormValid()) {
    store.updateForm1({
      email: emailModel.value,
      keepLogged: keepLogged.value,
      password: passwordModel.value
    })
    emit('submit')
  } else {
    emit('failed')
  }
}

const emit = defineEmits(['submit', 'failed'])
</script>

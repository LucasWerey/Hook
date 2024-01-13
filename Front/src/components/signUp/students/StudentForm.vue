<template>
  <div class="flex flex-col lg:flex-row gap-6 w-full lg:w-1/2">
    <Button
      class="w-full font-eina1 font-normal text-4 bg-basic-white"
      type="socialMedia"
      icon="google"
      icon-position="leading"
      styled="fill"
      state="active"
    >
      {{ studentSignup.google }}
    </Button>
    <Button
      class="w-full font-eina1 font-normal text-4 bg-basic-white"
      type="socialMedia"
      icon="linkedin"
      icon-position="leading"
      styled="fill"
      state="active"
    >
      {{ studentSignup.linkedin }}
    </Button>
  </div>
  <div class="flex items-center align-middle justify-center h-6 gap-2 w-full lg:w-1/3">
    <hr class="h-px my-8 bg-basic-black border-0 w-full" />
    <p class="font-eina1 font-500 text-4">OU</p>
    <hr class="h-px my-8 bg-basic-black border-0 w-full" />
  </div>
  <form class="flex flex-col gap-6 justify-center w-full lg:w-1/2">
    <div class="items-start lg:w-1/2">
      <InputField
        class="w-full"
        v-model="emailModel"
        :placeholder="studentSignup.emailPlaceholder"
        :label="studentSignup.emailLabel"
        :hint="emailHint"
        :state="emailFailed ? 'error' : 'default'"
        @blur="isEmailValid"
      />
    </div>
    <div class="flex flex-col md:flex-row gap-6">
      <InputField
        class="w-full"
        v-model="passwordModel"
        :placeholder="studentSignup.passwordPlaceholder"
        :label="studentSignup.passwordLabel"
        :hint="studentSignup.passwordHint"
        :state="passwordFailed ? 'error' : 'default'"
        @blur="checkPasswordFields"
        password
      />
      <InputField
        class="w-full"
        v-model="confirmPasswordModel"
        :placeholder="studentSignup.confirmPasswordPlaceholder"
        :label="studentSignup.confirmPasswordLabel"
        :hint="studentSignup.confirmPasswordHint"
        :state="confirmPasswordFailed ? 'error' : 'default'"
        @blur="checkPasswordFields"
        password
      />
    </div>
    <div class="flex items-center gap-2 w-fit">
      <CheckBox
        v-model="keepLogged"
        @click="keepLogged = !keepLogged"
        state="unchecked"
        color="transparent"
        form="square"
      />
      <p class="w-full text-4 font-eina1 font-normal">{{ studentSignup.rememberMe }}</p>
    </div>
    <Button
      type="default"
      class="self-center w-full max-w-md"
      icon="moveRight"
      iconPosition="trailing"
      styled="fill"
      state="active"
      @click.prevent="emit('submit')"
    >
      {{ studentSignup.nextButton }}
    </Button>
  </form>
</template>

<script setup lang="ts">
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

const emit = defineEmits(['submit'])
</script>

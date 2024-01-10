<template>
  <div class="lg:flex lg:flex-row">
    <div
      class="w-full lg:w-1/3 h-[100vh] p-4 flex flex-col justify-center items-center gap-6 self-stretch relative"
    >
      <IconsBase name="logo" class="min-w-32 min-h-16 lg:min-w-60 lg:min-h-32 pb-4" />
      <h1 class="font-800 text-7">Content de vous revoir !</h1>
      <div class="flex flex-col gap-12 sm:w-2/3 lg:w-3/4">
        <div class="flex flex-col gap-2 w-full">
          <Button
            class="w-full font-eina1 font-normal text-4"
            type="socialMedia"
            icon="google"
            icon-position="leading"
            styled="outlined"
            state="active"
            >Se connecter avec Google</Button
          >
          <Button
            class="w-full font-eina1 font-normal text-4"
            type="socialMedia"
            icon="linkedin"
            icon-position="leading"
            styled="outlined"
            state="active"
            >Se connecter avec Linkedin</Button
          >
        </div>
        <div class="flex items-center align-middle justify-center h-6 gap-2 self-stretch w-full">
          <hr class="h-px my-8 bg-basic-black border-0 w-full" />
          <p class="font-eina1 font-500 text-4">OU</p>
          <hr class="h-px my-8 bg-basic-black border-0 w-full" />
        </div>
        <div class="flex flex-col justify-center items-start gap-6 self-stretch w-full">
          <form
            class="flex flex-col justify-center items-start gap-6 self-stretch w-full"
            @submit.prevent="getLoggedInUser"
          >
            <InputField
              class="w-full"
              v-model="emailModel"
              placeholder="exemple@email.com"
              label="e-mail"
              hint="Email incorrect"
              :state="emailFailed ? 'error' : 'default'"
              hasIcon
              @blur="onBlur"
            />
            <InputField
              class="w-full"
              v-model="passwordModel"
              placeholder="motdepasse"
              label="mot de passe"
              hint="Mot de passe incorrect"
              :state="passwordfailed ? 'error' : 'default'"
              hasIcon
              password
            />
            <a href="" class="text-4 font-700 underline text-primary-moonstone"
              >Mot de passe oublié ?</a
            >
            <div class="flex items-center gap-2 w-full">
              <CheckBox
                class="w-fit"
                v-model="keepLogged"
                @click="keepLogged = !keepLogged"
                state="unchecked"
                color="transparent"
                form="square"
              />
              <p class="w-full text-4 font-eina1 font-normal">Se souvenir de moi ?</p>
            </div>
            <Button
              type="default"
              class="w-full"
              @click="getLoggedInUser"
              styled="fill"
              state="active"
            >
              Valider
            </Button>
          </form>
        </div>
      </div>
      <div class="absolute left-9 top-9">
        <IconsBase
          name="moveLeft"
          class="cursor-pointer w-9 h-9"
          color="powder"
          @click="() => $router.push('/')"
        />
      </div>
    </div>
    <div class="hidden lg:block lg:w-2/3 lg:h-100 lg:bg-basic-lightgrey" />
  </div>
  <transition name="fade">
    <SnackBar
      v-if="showSnackbar"
      :type="success ? 'validation' : 'error'"
      close="no"
      size="small"
      class="z-50 absolute bottom-2 md:w-auto top-5 right-2"
    >
      {{ success ? successMessage : errorMessage }}
    </SnackBar>
  </transition>
</template>

<script setup lang="ts">
const emailModel = ref('')
const passwordModel = ref('')
const keepLogged = ref(false)
const response = ref<any>(null)
const showSnackbar = ref(false)
const errorMessage = ref('Failed to connect')
const successMessage = ref('Successfully connected')
const success = ref(false)
const passwordfailed = ref(false)
const emailFailed = ref(false)

// USE test@m.com psw pass

const resetSnackbar = () => {
  showSnackbar.value = false
}

const handleResponse = (data: any) => {
  response.value = data
  showSnackbar.value = true
  success.value = true
  console.log(response.value)
  setTimeout(resetSnackbar, 5000)
}

const handleError = (error: any) => {
  const apiError = handleApiError(error)
  response.value = apiError
  showSnackbar.value = true
  passwordfailed.value = true
  emailFailed.value = true
  console.error(apiError)
  setTimeout(resetSnackbar, 5000)
}

const onBlur = () => {
  if (!isValidEmail(emailModel.value) && emailModel.value !== '') {
    emailFailed.value = true
  } else {
    emailFailed.value = false
  }
}
const getLoggedInUser = async () => {
  if (!isValidEmail(emailModel.value)) {
    emailFailed.value = true
    return
  }

  try {
    const data = await loginUser(emailModel.value, passwordModel.value)
    if (keepLogged.value) setLocalStorage('authToken', data.token)
    handleResponse(data)
  } catch (error) {
    handleError(error)
  }
}
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

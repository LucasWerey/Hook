<template>
  <div class="lg:flex lg:flex-row">
    <div
      ref="loginForm"
      class="relative flex h-[100vh] w-full flex-col items-center justify-center gap-6 self-stretch p-4 lg:w-1/3"
    >
      <IconsBase name="logo" class="min-h-16 min-w-32 pb-4 lg:min-h-32 lg:min-w-60" />
      <h1 class="text-7 font-800">{{ loginWords.title }}</h1>
      <div class="flex flex-col gap-12 sm:w-2/3 lg:w-3/4">
        <div class="flex w-full flex-col gap-2">
          <Button
            class="w-full font-eina1 text-4 font-normal"
            type="socialMedia"
            icon="google"
            icon-position="leading"
            styled="outlined"
            state="active"
            >{{ loginWords.google }}</Button
          >
          <Button
            class="w-full font-eina1 text-4 font-normal"
            type="socialMedia"
            icon="linkedin"
            icon-position="leading"
            styled="outlined"
            state="active"
            >{{ loginWords.linkedin }}</Button
          >
        </div>
        <div class="flex h-6 w-full items-center justify-center gap-2 self-stretch align-middle">
          <hr class="my-8 h-px w-full border-0 bg-basic-black" />
          <p class="font-eina1 text-4 font-500">OU</p>
          <hr class="my-8 h-px w-full border-0 bg-basic-black" />
        </div>
        <div class="flex w-full flex-col items-start justify-center gap-6 self-stretch">
          <form
            class="flex w-full flex-col items-start justify-center gap-6 self-stretch"
            @submit.prevent="getLoggedInUser"
          >
            <InputField
              class="w-full"
              v-model="emailModel"
              :placeholder="loginWords.emailPlaceholder"
              :label="loginWords.emailLabel"
              :hint="loginWords.emailHint"
              :state="emailFailed ? 'error' : 'default'"
              hasIcon
              @blur="onBlur"
            />
            <InputField
              class="w-full"
              v-model="passwordModel"
              :placeholder="loginWords.passwordPlaceholder"
              :label="loginWords.passwordLabel"
              :hint="loginWords.passwordHint"
              :state="passwordfailed ? 'error' : 'default'"
              hasIcon
              input-type="password"
            />
            <a href="" class="text-4 font-700 text-primary-moonstone underline">{{
              loginWords.forgottenPass
            }}</a>
            <div class="flex w-fit items-center gap-2">
              <CheckBox
                v-model="keepLogged"
                @click="keepLogged = !keepLogged"
                state="unchecked"
                color="transparent"
                form="square"
              />
              <p class="w-full font-eina1 text-4 font-normal">{{ loginWords.rememberMe }}</p>
            </div>
            <Button
              type="default"
              class="w-full"
              @click="getLoggedInUser"
              styled="fill"
              state="active"
            >
              {{ loginWords.validate }}
            </Button>
          </form>
        </div>
      </div>
      <div class="absolute left-9 top-9">
        <IconsBase
          name="moveLeft"
          class="h-9 w-9 cursor-pointer"
          color="powder"
          @click="() => $router.push('/')"
        />
      </div>
    </div>
    <div
      ref="blobs"
      class="lg:h-100 hidden lg:relative lg:-z-[1] lg:block lg:w-2/3 lg:bg-basic-lightgrey"
    >
      <div
        class="pointer-events-none absolute left-0 top-0 z-[2] flex h-full w-full items-center justify-center align-middle text-17 font-800 text-primary-moonstone backdrop-blur-[100px]"
      >
        {{ loginWords.blobText }}
      </div>
      <div ref="blobItems" class="absolute left-0 top-0 z-[1] h-full w-full">
        <div ref="blob1" class="blob h-[200px] w-[200px] rounded-full bg-primary-moonstone" />
        <div ref="blob2" class="blob h-[200px] w-[200px] rounded-full bg-primary-platinum" />
        <div ref="blob3" class="blob h-[200px] w-[200px] rounded-full bg-primary-powder" />
        <div ref="blob4" class="blob h-[200px] w-[200px] rounded-full bg-primary-moonstone" />
        <div ref="blob5" class="blob h-[200px] w-[200px] rounded-full bg-primary-platinum" />
        <div ref="blob6" class="blob h-[200px] w-[200px] rounded-full bg-primary-powder" />
        <div ref="blob7" class="blob h-[200px] w-[200px] rounded-full bg-primary-moonstone" />
        <div ref="blob8" class="blob h-[200px] w-[200px] rounded-full bg-primary-platinum" />
        <div ref="blob9" class="blob h-[200px] w-[200px] rounded-full bg-primary-powder" />
        <div ref="blob10" class="blob h-[200px] w-[200px] rounded-full bg-primary-moonstone" />
        <div ref="blob11" class="blob h-[200px] w-[200px] rounded-full bg-primary-platinum" />
        <div ref="blob12" class="blob h-[200px] w-[200px] rounded-full bg-primary-powder" />
      </div>
    </div>
  </div>
  <transition name="fade">
    <SnackBar
      v-if="showSnackbar"
      :type="success ? 'validation' : 'error'"
      close="no"
      size="small"
      class="absolute bottom-2 right-2 top-5 z-50 md:w-auto"
    >
      {{ success ? successMessage : errorMessage }}
    </SnackBar>
  </transition>
</template>

<script setup lang="ts">
// API
const response = ref<any>(null)
const showSnackbar = ref(false)
const success = ref(false)
const errorMessage = ref('Failed to connect')
const successMessage = ref('Successfully connected')

// Inputs
const keepLogged = ref(false)
const passwordfailed = ref(false)
const emailFailed = ref(false)
const emailModel = ref('')
const passwordModel = ref('')

// Blob animation
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
const borderRigthBlobItems: Ref<Number | null> = ref(null)
const borderBottomBlobItems: Ref<Number | null> = ref(null)
const loginFormRightBorder: Ref<Number | null> = ref(null)
const loginForm: Ref<HTMLElement | null> = ref(null)
const blobItems: Ref<HTMLElement | null> = ref(null)
const blob1: Ref<HTMLElement | null> = ref(null)
const blob2: Ref<HTMLElement | null> = ref(null)
const blob3: Ref<HTMLElement | null> = ref(null)
const blob4: Ref<HTMLElement | null> = ref(null)
const blob5: Ref<HTMLElement | null> = ref(null)
const blob6: Ref<HTMLElement | null> = ref(null)
const blob7: Ref<HTMLElement | null> = ref(null)
const blob8: Ref<HTMLElement | null> = ref(null)
const blob9: Ref<HTMLElement | null> = ref(null)
const blob10: Ref<HTMLElement | null> = ref(null)
const blob11: Ref<HTMLElement | null> = ref(null)
const blob12: Ref<HTMLElement | null> = ref(null)

// USE test@m.com psw pass
const getLoggedInUser = async () => {
  if (!isValidEmail(emailModel.value)) {
    emailFailed.value = true
    return
  }

  try {
    const data = await loginUser(emailModel.value, passwordModel.value)
    if (keepLogged.value) setLocalStorage('authToken', data.token)
    handleResponse(data)
    router.push({ name: 'about' })
  } catch (error) {
    handleError(error)
  }
}

const handleResponse = (data: any) => {
  response.value = data
  showSnackbar.value = true
  success.value = true
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

const resetSnackbar = () => {
  showSnackbar.value = false
}

const onBlur = () => {
  if (!isValidEmail(emailModel.value) && emailModel.value !== '') {
    emailFailed.value = true
  } else {
    emailFailed.value = false
  }
}

class Blob {
  el: HTMLElement
  size: number
  x: number
  y: number
  vx: number
  vy: number

  constructor(el: HTMLElement) {
    this.el = el
    this.size = el.getBoundingClientRect().width
    this.x = random(
      0,
      windowWidth.value -
        Number(borderRigthBlobItems.value) -
        Number(loginFormRightBorder.value) -
        this.size
    )
    this.y = random(0, windowHeight.value - this.size)
    this.vx = random(3, 4) * Math.random() > 0.5 ? -1 : 1
    this.vy = random(3, 4) * Math.random() > 0.5 ? -1 : 1
  }

  update(): void {
    const borderRight = Number(borderRigthBlobItems.value) - Number(loginFormRightBorder.value)
    this.x += this.vx
    this.y += this.vy

    if (borderRigthBlobItems.value !== null && this.x >= borderRight - this.size) {
      this.vx *= -1
      this.x = borderRight - this.size
    }

    if (
      borderBottomBlobItems.value !== null &&
      this.y >= Number(borderBottomBlobItems.value) - this.size
    ) {
      this.vy *= -1
      this.y = Number(borderBottomBlobItems.value) - this.size
    }

    if (this.x <= 0) {
      this.vx *= -1
      this.x = 0
    }

    if (this.y <= 0) {
      this.vy *= -1
      this.y = 0
    }
  }

  move(): void {
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`
  }
}

function initBlobs() {
  const blobs = [
    blob1.value,
    blob2.value,
    blob3.value,
    blob4.value,
    blob5.value,
    blob6.value,
    blob7.value,
    blob8.value,
    blob9.value,
    blob10.value,
    blob11.value,
    blob12.value
  ]
    .filter(el => el !== null)
    .map(el => new Blob(el as HTMLElement))
  const element = blobItems.value
  const loginFormEl = loginForm.value

  if (element && loginFormEl) {
    const rect = element.getBoundingClientRect()
    const log = loginFormEl.getBoundingClientRect()

    borderRigthBlobItems.value = rect.right
    borderBottomBlobItems.value = rect.bottom
    loginFormRightBorder.value = log.right
  }

  function update() {
    blobs.forEach(blob => {
      blob.update()
      blob.move()
    })
    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

function updateBlobItemsBorder() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  const element = blobItems.value
  const loginFormEl = loginForm.value

  if (element && loginFormEl) {
    const rect = element.getBoundingClientRect()
    const log = loginFormEl.getBoundingClientRect()

    borderRigthBlobItems.value = rect.right
    borderBottomBlobItems.value = rect.bottom
    loginFormRightBorder.value = log.right
  }
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

onUnmounted(() => {
  window.removeEventListener('resize', updateBlobItemsBorder)
})

onMounted(() => {
  initBlobs()
  window.addEventListener('resize', updateBlobItemsBorder)
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

.blob {
  aspect-ratio: 1;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

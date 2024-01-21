<template>
  <form class="flex w-full flex-col items-center justify-center gap-9 pb-20 lg:w-1/2">
    <div class="flex w-full items-end gap-4">
      <InputField
        class="w-full"
        v-model="adminLastNameModel"
        placeholder="Depond"
        label="Nom"
        inputType="text"
        isRequired
      />
      <InputField
        class="w-full"
        v-model="adminFirstNameModel"
        placeholder="Louis"
        label="Prénom"
        inputType="text"
        isRequired
      />
    </div>
    <div class="flex w-full items-end gap-4">
      <InputField
        class="w-full"
        v-model="adminEmailModel"
        placeholder="exemple@email.com"
        label="E-mail"
        inputType="email"
        isRequired
      />
      <InputField
        class="w-full"
        v-model="adminPositionModel"
        placeholder="XXXXX"
        label="Poste"
        inputType="text"
        isRequired
      />
    </div>
    <div class="flex w-full items-end gap-4">
      <InputField
        class="w-full"
        v-model="adminPasswordModel"
        placeholder="motdepasse"
        label="Mot de passe"
        inputType="password"
        isRequired
      />
      <InputField
        class="w-full"
        v-model="adminConfirmPasswordModel"
        placeholder="motdepasse"
        label="Confirmation du mot de passe"
        inputType="password"
        isRequired
      />
    </div>
    <div class="flex w-fit gap-2 self-start">
      <CheckBox
        v-model="adminkeepLoggedModel"
        @click="adminkeepLoggedModel = !adminkeepLoggedModel"
        state="unchecked"
        color="transparent"
        form="square"
      />
      <p class="w-full font-eina1 text-4" :class="{ 'font-700': adminkeepLoggedModel }">
        {{ studentSignup.rememberMe }}
      </p>
    </div>
    <div class="self-start text-error">*Champs obligatoires</div>
    <div class="flex w-1/2 items-center justify-center gap-6 align-middle">
      <Button
        type="default"
        class="max-w-[160px] self-center uppercase"
        icon="moveLeft"
        iconPosition="leading"
        styled="outlined"
        state="active"
        @click.prevent="goBack"
      >
        Précédent
      </Button>
      <Button
        type="default"
        class="max-w-[160px] self-center uppercase"
        styled="fill"
        state="active"
        @click.prevent="handleSubmit"
      >
        Terminer
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
const adminLastNameModel = ref('')
const adminFirstNameModel = ref('')
const adminEmailModel = ref('')
const adminPositionModel = ref('')
const adminPasswordModel = ref('')
const adminConfirmPasswordModel = ref('')
const adminkeepLoggedModel = ref(false)

const store = useRegistrationRecruiterStore()

const isRequiredFieldsFilled = () => {
  return (
    adminLastNameModel.value !== '' &&
    adminFirstNameModel.value !== '' &&
    adminEmailModel.value !== '' &&
    adminPositionModel.value !== '' &&
    adminPasswordModel.value !== '' &&
    adminConfirmPasswordModel.value !== ''
  )
}

const goBack = () => {
  if (store.step === 1) router.push('/')
  if (store.step > 1) store.prevStep()
}

const handleSubmit = () => {
  if (!isRequiredFieldsFilled()) {
    emit('failed')
    return
  } else {
    store.updateForm2({
      recruiterEmail: adminEmailModel.value,
      recruiterFirstname: adminFirstNameModel.value,
      recruiterKeepLogged: adminkeepLoggedModel.value,
      recruiterLastname: adminLastNameModel.value,
      recruiterPassword: adminPasswordModel.value,
      recruiterPosition: adminPositionModel.value
    })
    emit('submit')
  }
}

const emit = defineEmits(['submit', 'failed'])
</script>

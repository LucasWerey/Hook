<template>
  <form class="flex w-full flex-col items-center justify-center gap-9 pb-20 lg:w-1/2">
    <div class="flex w-full flex-col gap-2">
      <h3 class="font-eina1 text-3 font-normal uppercase text-primary-moonstone">
        REJOINDRE UNE ENTREPRISE EXISTANTE
      </h3>
      <div class="flex w-full items-end gap-4">
        <InputField
          class="w-full"
          v-model="idKeyModel"
          placeholder="NDN3646BDI20S0"
          label="Cle d'identification"
          inputType="text"
        />
        <Button type="default" state="active" class="max-w-[160px]" styled="fill" @click.prevent=""
          >Valider</Button
        >
      </div>
    </div>
    <div class="flex w-full items-center justify-center">
      <div class="flex h-6 w-full items-center justify-center gap-2 self-stretch align-middle">
        <hr class="my-8 h-px w-full max-w-[165px] border-0 bg-basic-black" />
        <p class="font-eina1 text-4 font-500">OU</p>
        <hr class="my-8 h-px w-full max-w-[165px] border-0 bg-basic-black" />
      </div>
    </div>
    <div class="flex w-full flex-col gap-2">
      <div class="flex w-full flex-col gap-6">
        <h3 class="font-eina1 text-3 font-normal uppercase text-primary-moonstone">
          Inscrire une nouvelle entreprise
        </h3>
        <div class="flex items-end gap-4">
          <InputField
            class="w-full max-w-[375px]"
            v-model="companyNameModel"
            placeholder="Nom de l'entreprise"
            label="Nom"
            inputType="text"
            isRequired
          />
        </div>
        <div class="flex w-full items-end gap-4">
          <InputField
            class="max-w[500px] w-full"
            v-model="companyAddressModel"
            placeholder="Adresse de l'entreprise"
            label="Adresse"
            inputType="text"
            isRequired
          />
          <InputField
            class="w-full max-w-[150px]"
            v-model="companyZipModel"
            placeholder="XXXXX"
            label="Code postal"
            inputType="text"
            isRequired
          />
        </div>
        <div class="flex w-full items-end gap-4">
          <InputField
            class="w-full"
            v-model="companyCityModel"
            placeholder="Ville de l'entreprise"
            label="Ville"
            inputType="text"
            isRequired
          />
          <InputField
            class="w-full"
            v-model="companyCountryModel"
            placeholder="Pays de l'entreprise"
            label="Pays"
            inputType="text"
            isRequired
          />
        </div>
        <div class="flex w-full items-end gap-4">
          <SelectField
            class="w-full"
            v-model="companyJurisdictionModel"
            :options="jurisdictionOptions"
            :default="jurisdictionOptions[0].label"
            title="Statut juridique*"
          />
          <InputField
            class="w-full"
            v-model="companySiretModel"
            placeholder="XXXXXXXXXXXX"
            label="Numéro de siret"
            inputType="text"
            isRequired
          />
        </div>
        <div class="flex w-full items-end gap-4">
          <SelectField
            v-model="companyEmployeesNumberModel"
            :options="employeesNumberOptions"
            :default="employeesNumberOptions[3].label"
            title="Nombre d'employés*"
          />
        </div>
        <div class="text-error">*Champs obligatoires</div>
      </div>
    </div>
    <Button
      state="active"
      type="default"
      class="max-w-[160px]"
      styled="fill"
      @click.prevent="handleSubmit"
      >Valider</Button
    >
  </form>
</template>

<script setup lang="ts">
const idKeyModel: Ref<string> = ref('')
const companyNameModel: Ref<string> = ref('')
const companyAddressModel: Ref<string> = ref('')
const companyZipModel: Ref<string> = ref('')
const companyCityModel: Ref<string> = ref('')
const companyCountryModel: Ref<string> = ref('')
const companyJurisdictionModel: Ref<string> = ref('')
const companySiretModel: Ref<string> = ref('')
const companyEmployeesNumberModel: Ref<string> = ref('')

const store = useRegistrationRecruiterStore()

const jurisdictionOptions = [
  { label: 'Association', value: 'Association' },
  { label: 'GIE', value: 'GIE' },
  { label: 'SA', value: 'SA' },
  { label: 'SAS', value: 'SAS' },
  { label: 'SARL', value: 'SARL' },
  { label: 'EURL', value: 'EURL' },
  { label: 'SNC', value: 'SNC' },
  { label: 'Secteur public', value: 'Secteur public' },
  { label: 'SASU', value: 'SASU' },
  { label: 'Autres', value: 'Autres' }
]

const employeesNumberOptions = [
  { label: '> 10', value: '> 10' },
  { label: '> 250', value: '> 250' },
  { label: '> 5000', value: '> 5000' },
  { label: '<= 5000', value: '<= 5000' }
]

const areAllFieldsFilled = computed(() => {
  return (
    idKeyModel.value !== '' ||
    (companyNameModel.value !== '' &&
      companyAddressModel.value !== '' &&
      companyZipModel.value !== '' &&
      companyCityModel.value !== '' &&
      companyCountryModel.value !== '' &&
      companyJurisdictionModel.value !== '' &&
      companySiretModel.value !== '' &&
      companyEmployeesNumberModel.value !== '')
  )
})

const handleSubmit = () => {
  if (!areAllFieldsFilled.value) {
    emit('failed')
  } else {
    store.updateForm1({
      companyAddress: companyAddressModel.value,
      companyCity: companyCityModel.value,
      companyCountry: companyCountryModel.value,
      companyJuridicCategory: companyJurisdictionModel.value,
      companyName: companyNameModel.value,
      companyNbEmployees: companyEmployeesNumberModel.value,
      companyPostalCode: Number(companyZipModel.value),
      companySiret: companySiretModel.value,
      idKey: idKeyModel.value !== '' ? idKeyModel.value : undefined
    })
    console.log(store)

    emit('submit')
  }
}

const emit = defineEmits(['submit', 'failed'])
</script>

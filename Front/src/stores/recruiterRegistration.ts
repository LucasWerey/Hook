import { Form1State, Form2State, RegistrationState } from './types/recruiterRegistrationType'

export const useRegistrationRecruiterStore = defineStore({
  actions: {
    nextStep() {
      this.step += 1
    },
    prevStep() {
      if (this.step > 1) {
        this.step -= 1
      }
    },
    setStep(step: 1 | 2) {
      this.step = step
    },
    updateForm1(payload: Partial<Form1State>) {
      this.form1 = { ...this.form1, ...payload }
    },
    updateForm2(payload: Partial<Form2State>) {
      this.form2 = { ...this.form2, ...payload }
    }
  },
  id: 'registration',
  state: (): RegistrationState => ({
    form1: {
      companyAddress: '',
      companyCity: '',
      companyCountry: '',
      companyJuridicCategory: '',
      companyName: '',
      companyNbEmployees: '',
      companyPostalCode: 0,
      companySiret: '',
      idKey: ''
    },
    form2: {
      recruiterEmail: '',
      recruiterFirstname: '',
      recruiterKeepLogged: false,
      recruiterLastname: '',
      recruiterPassword: '',
      recruiterPosition: ''
    },
    step: 1
  })
})

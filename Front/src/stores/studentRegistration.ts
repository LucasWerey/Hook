import { RegistrationState, Form1State, Form2State } from './types/studentRegistrationTypes'

export const useRegistrationStore = defineStore({
  actions: {
    nextStep() {
      this.step += 1
    },
    prevStep() {
      if (this.step > 1) {
        this.step -= 1
      }
    },
    setStep(step: number) {
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
      email: '',
      keepLogged: false,
      password: '',
      userType: 'Student'
    },
    form2: {
      actualLookingFor: false,
      contractType: 'stage',
      duration: 0,
      firstname: '',
      location: '',
      name: '',
      schoolGrade: '',
      start: new Date()
    },
    step: 1
  })
})

import { RegistrationState, Form1State, Form2State } from './types/studentRegistrationTypes'

export const useRegistrationStore = defineStore({
  id: 'registration',
  state: (): RegistrationState => ({
    step: 1,
    form1: {
      email: '',
      password: '',
      keepLogged: false,
      userType: 'Student'
    },
    form2: {
      name: '',
      firstname: '',
      schoolGrade: '',
      contractType: 'stage',
      duration: 0,
      start: new Date(),
      location: '',
      actualLookingFor: false
    }
  }),
  actions: {
    setStep(step: number) {
      this.step = step
    },
    updateForm1(payload: Partial<Form1State>) {
      this.form1 = { ...this.form1, ...payload }
    },
    updateForm2(payload: Partial<Form2State>) {
      this.form2 = { ...this.form2, ...payload }
    },
    nextStep() {
      this.step += 1
    },
    prevStep() {
      if (this.step > 1) {
        this.step -= 1
      }
    }
  }
})

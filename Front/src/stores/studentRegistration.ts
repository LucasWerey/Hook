import {
  RegistrationState,
  Form1State,
  Form2State,
  Form3State
} from './types/studentRegistrationTypes'

export const useRegistrationStudentStore = defineStore({
  actions: {
    nextStep() {
      this.step += 1
    },
    prevStep() {
      if (this.step > 1) {
        this.step -= 1
      }
    },
    setStep(step: 1 | 2 | 3 | 4) {
      this.step = step
    },
    updateForm1(payload: Partial<Form1State>) {
      this.form1 = { ...this.form1, ...payload }
    },
    updateForm2(payload: Partial<Form2State>) {
      this.form2 = { ...this.form2, ...payload }
    },
    updateForm3(payload: Partial<Form3State>) {
      this.form3 = { ...this.form3, ...payload }
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
      currentPost: false,
      description: '',
      firstname: '',
      formationName: '',
      formationYear: '',
      hardSkills: [],
      lastExpCompany: '',
      lastExpDescription: '',
      lastExpEndDate: new Date(),
      lastExpLocation: '',
      lastExpPoste: '',
      lastExpStartDate: new Date(),
      lastname: '',
      school: '',
      schoolResult: '',
      schoolStartDate: new Date(),
      softSkills: []
    },
    form3: {
      contractDuration: '',
      contractEndDate: new Date(),
      contractLocation: '',
      contractStartDate: new Date(),
      contractType: '',
      keyWords: [],
      postLookingFor: '',
      spokenLanguages: [],
      transportAvailable: [],
      transportDuration: ''
    },
    step: 1
  })
})

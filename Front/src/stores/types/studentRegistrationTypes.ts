export interface Form1State {
  email: string
  password: string
  keepLogged: boolean
  userType: string
}

export interface Form2State {
  lastname: string
  firstname: string
  school: string
  formationName: string
  formationYear: string
  schoolStartDate: Date
  description: string
  schoolResult: string
  lastExpPoste: string
  lastExpCompany: string
  currentPost: boolean
  lastExpStartDate: Date
  lastExpEndDate: Date
  lastExpLocation: string
  lastExpDescription: string
  hardSkills: string[]
  softSkills: string[]
}

export interface Form3State {
  postLookingFor: string
  contractType: string
  contractDuration: string
  contractLocation: string
  spokenLanguages: string[]
  contractStartDate: Date
  contractEndDate: Date
  keyWords: string[]
  transportAvailable: string[]
  transportDuration: string
}

export interface RegistrationState {
  step: 1 | 2 | 3 | 4
  form1: Form1State
  form2: Form2State
  form3: Form3State
}

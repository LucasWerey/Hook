export interface Form1State {
  email: string
  password: string
  keepLogged: boolean
  userType: string
}

export interface Form2State {
  name: string
  firstname: string
  schoolGrade: string
  contractType: 'stage' | 'alternance'
  duration: number
  start: Date
  location: string
  actualLookingFor: boolean
}

export interface RegistrationState {
  step: 1 | 2 | 3 | 4
  form1: Form1State
  form2: Form2State
}

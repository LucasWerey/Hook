export interface Form1State {
  idKey: string
  companyName: string
  companyAddress: string
  companyPostalCode: number
  companyCity: string
  companyCountry: string
  companyJuridicCategory: string
  companySiret: string
  companyNbEmployees: string
}

export interface Form2State {
  recruiterLastname: string
  recruiterFirstname: string
  recruiterEmail: string
  recruiterPosition: string
  recruiterPassword: string
  recruiterKeepLogged: boolean
}

export interface RegistrationState {
  step: 1 | 2
  form1: Form1State
  form2: Form2State
}

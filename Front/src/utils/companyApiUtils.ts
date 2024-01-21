type ObjectId = string

type Companies = {
  id?: ObjectId
  n_siret: string
  name_company: string
  adress: string
  postal_code: number
  city: string
  country: string
  legal_status: string
  nb_emp: number
  emp: any
  admin: ObjectId
  offers: any
}

const baseURL = 'http://127.0.0.1:8000' // replace with your server's base URL

export const createCompany = async (company: Companies) => {
  return await axios.post(`${baseURL}/companie`, company)
}

export const getCompany = async (id: string) => {
  return await axios.get(`${baseURL}/companie/${id}`)
}

export const updateCompany = async (id: string, company: Companies) => {
  return await axios.put(`${baseURL}/companie/${id}`, company)
}

export const deleteCompany = async (id: string) => {
  return await axios.delete(`${baseURL}/companie/${id}`)
}

export const getAllCompanies = async () => {
  return await axios.get(`${baseURL}/companies`)
}

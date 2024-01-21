export const useCompanyStore = defineStore({
  actions: {
    addCompany(company: any) {
      this.companies.push(company)
    },
    removeCompany(companyId: string) {
      this.companies = this.companies.filter(company => company._id !== companyId)
    },
    updateCompany(updatedCompany: any) {
      const index = this.companies.findIndex(company => company._id === updatedCompany._id)
      if (index !== -1) {
        this.companies[index] = updatedCompany
      }
    }
  },
  getters: {
    getCompanyById: state => (id: string) => {
      return state.companies.find(company => company._id === id)
    }
  },
  id: 'companies',
  state: () => ({
    companies: [] as Array<{
      _id: string
      n_siret: string
      name_company: string
      adress: string
      postal_code: number
      city: string
      country: string
      legal_status: string
      nb_emp: number
      emp: Array<string>
      admin: string
      offers: Array<any>
    }>
  })
})

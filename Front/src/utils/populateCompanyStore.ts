export async function populateCompanyStoreByAdmin(companyId: string) {
  const companyStore = useCompanyStore()

  const companyData = await getCompanyByAdmin(companyId)

  companyStore.addCompany({
    ...companyData
  })
}

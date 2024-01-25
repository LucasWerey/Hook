export async function populateCompanyStoreByAdmin(adminId: string) {
  const companyStore = useCompanyStore()

  const companyData = await getCompanyByAdmin(adminId)
  const offerData = await getOfferByCompany(companyData._id.$oid)

  companyStore.addCompany({
    ...companyData,
    detailed_offers: offerData
  })
}

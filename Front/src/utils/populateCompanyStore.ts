export async function populateCompanyStoreByAdmin(adminId: string) {
  const companyStore = useCompanyStore()

  const companyData = await getCompanyByAdmin(adminId)

  const offerData = await getOfferByCompany(companyData._id.$oid)
  console.log(offerData)

  for (const element of offerData) {
    if (!element.matchs) element.matchs = []
    const studentIds = element.matchs.map(match => match.student_id.$oid)
    const userObjects = await Promise.all(studentIds.map(id => getUser(id)))
    const studentNames = userObjects.map(user => user.firstname)

    const updatedMatches = element.matchs.map((match, index) => ({
      ...match,
      studentName: studentNames[index]
    }))

    element.matchs = updatedMatches
  }

  companyStore.addCompany({
    ...companyData,
    detailed_offers: offerData
  })
}

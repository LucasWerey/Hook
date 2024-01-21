export async function populateRecruiterStore(recruiterId: string) {
  const recruiterStore = useRecruiterStore()

  const userData = await getUser(recruiterId)

  recruiterStore.addRecruiter({
    ...userData
  })
}

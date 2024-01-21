export async function populateStudentStore(studentId: string) {
  const studentStore = useStudentsStore()

  const userData = await getUser(studentId)

  const studentData = await getStudent(studentId)

  studentStore.addStudent({
    ...userData,
    ...studentData
  })
}

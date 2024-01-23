export const useStudentsStore = defineStore({
  actions: {
    addStudent(student: any) {
      this.students.push(student)
    },
    removeStudent(studentId: string) {
      this.students = this.students.filter(student => student._id.$oid !== studentId)
    },
    updateExperiences(updatedExperiences: any) {
      this.students[0].profile.experiences = updatedExperiences
    },
    updateFormation(updatedFormation: any) {
      this.students[0].profile.formation = updatedFormation
    },
    updateSkills(hardSkills: any, softSkills: any) {
      this.students[0].profile.hardSkills = hardSkills
      this.students[0].profile.softSkills = softSkills
    },
    updateStudent(updatedStudent: any) {
      const index = this.students.findIndex(student => student._id.$oid === updatedStudent._id)
      if (index !== -1) {
        this.students[index] = updatedStudent
      }
    }
  },
  getters: {
    getStudentById: state => (id: string) => {
      return state.students.find(student => student._id.$oid === id)
    }
  },
  id: 'students',
  state: () => ({
    students: [] as Array<{
      _id: {
        $oid: string
      }
      duration: string
      level: string
      contract_type: string
      start_date: Date
      location: string
      research: boolean
      profile: {
        softSkills: Array<string>
        hardSkills: Array<string>
        experiences: Array<{
          jobTitle: string
          company: string
          currentJob: boolean
          startDate: Date
          endDate: Date
          location: string
          description: string
        }>
        formation: Array<{
          degree: string
          university: string
          name: string
          currentFormation: boolean
          startDate: Date
          endDate: string
          result: string
          description: string
        }>
        certifications: Array<{
          certificationName: string
          issuedBy: string
          certifId: string
        }>
        keyWords: Array<string>
        jobWanted: Array<{
          name: string
          contract_type: string
          duration: string
          location: string
          startDate: Date
          endDate: Date
          research: boolean
          transportDuration: string
          transportsUsed: [string]
        }>
      }
      firstname: string
      lastname: string
      email: string
      password: string
      statut: string
      date: Date
    }>
  })
})

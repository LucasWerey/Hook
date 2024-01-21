export const useStudentsStore = defineStore({
  actions: {
    addStudent(student: any) {
      this.students.push(student)
    },
    removeStudent(studentId: string) {
      this.students = this.students.filter(student => student._id !== studentId)
    },
    updateStudent(updatedStudent: any) {
      const index = this.students.findIndex(student => student._id === updatedStudent._id)
      if (index !== -1) {
        this.students[index] = updatedStudent
      }
    }
  },
  getters: {
    getStudentById: (state) => (id: string) => {
      return state.students.find(student => student._id === id)
    }
  },
  id: 'students',
  state: () => ({
    students: [] as Array<{
      _id: string,
      duration: string,
      level: string,
      contract_type: string,
      start_date: Date,
      location: string,
      research: boolean,
      profile: {
        currentPost: boolean,
        description: string,
        formationName: string,
        formationYear: string,
        hardSkills: Array<any>,
        keyWords: Array<any>,
        lastExpCompany: string,
        lastExpDescription: string,
        lastExpEndDate: Date,
        lastExpLocation: string,
        lastExpPoste: string,
        lastExpStartDate: Date,
        school: string,
        schoolResult: string,
        schoolStartDate: Date,
        softSkills: Array<any>,
        transportDuration: string,
        transportType: Array<any>
      },
      firstname: string,
      lastname: string,
      email: string,
      password: string,
      statut: string,
      date: Date
    }>
  })
})

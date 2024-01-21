export const useRecruiterStore = defineStore({
  actions: {
    addRecruiter(recruiter: any) {
      this.recruiters.push(recruiter)
    },
    removeRecruiter(recruiterId: string) {
      this.recruiters = this.recruiters.filter(recruiter => recruiter._id !== recruiterId)
    },
    updateRecruiter(updatedRecruiter: any) {
      const index = this.recruiters.findIndex(recruiter => recruiter._id === updatedRecruiter._id)
      if (index !== -1) {
        this.recruiters[index] = updatedRecruiter
      }
    }
  },
  getters: {
    getRecruiterById: state => (id: string) => {
      return state.recruiters.find(recruiter => recruiter._id === id)
    }
  },
  id: 'recruiters',
  state: () => ({
    recruiters: [] as Array<{
      _id: string
      firstname: string
      lastname: string
      email: string
      password: string
      statut: string
      date: Date
    }>
  })
})

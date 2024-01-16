export const useUserTypeStore = defineStore('userType', {
  actions: {
    setUserType(type: string) {
      this.userType = type
    }
  },
  state: () => ({
    userType: ''
  })
})

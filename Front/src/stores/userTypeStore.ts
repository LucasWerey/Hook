import { defineStore } from 'pinia'

export const useUserTypeStore = defineStore('userType', {
  state: () => ({
    userType: ''
  }),
  actions: {
    setUserType(type: string) {
      this.userType = type
    }
  }
})

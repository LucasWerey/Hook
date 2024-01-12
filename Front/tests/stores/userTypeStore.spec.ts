// @ts-nocheck
describe('userTypeStore', () => {
  it('sets the user type', () => {
    const pinia = createPinia()
    const store = useUserTypeStore(pinia)

    expect(store.userType).toBe('')
    store.setUserType('admin')
    expect(store.userType).toBe('admin')
  })
})

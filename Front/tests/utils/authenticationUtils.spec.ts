// @ts-nocheck
test('setToken stores a token correctly', () => {
  AuthenticationUtils.setToken('test-token')
  expect(localStorage.getItem('authToken')).toBe('test-token')
})

test('getToken retrieves a stored token correctly', () => {
  localStorage.setItem('authToken', 'test-token')
  const result = AuthenticationUtils.getToken()
  expect(result).toBe('test-token')
})

test('removeToken removes a stored token correctly', () => {
  localStorage.setItem('authToken', 'test-token')
  AuthenticationUtils.removeToken()
  expect(localStorage.getItem('authToken')).toBeNull()
})

test('isAuthenticated checks if a token is stored correctly', () => {
  localStorage.setItem('authToken', 'test-token')
  expect(AuthenticationUtils.isAuthenticated()).toBe(true)
  localStorage.removeItem('authToken')
  expect(AuthenticationUtils.isAuthenticated()).toBe(false)
})

test('generateMockToken generates a mock token correctly', () => {
  const token = AuthenticationUtils.generateMockToken()
  expect(token).toMatch(/^[a-z0-9]+$/)
})

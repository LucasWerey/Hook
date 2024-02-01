// @ts-nocheck
import router from '../../src/router/index'

test('home route should be correctly defined', () => {
  const homeRoute = router.getRoutes().find(route => route.name === 'home')

  expect(homeRoute).toBeDefined()
  expect(homeRoute.path).toBe('/')
  expect(homeRoute.meta.requiresAuth).toBe(false)
})

test('login route should be correctly defined', () => {
  const loginRoute = router.getRoutes().find(route => route.name === 'login')

  expect(loginRoute).toBeDefined()
  expect(loginRoute.path).toBe('/login')
  expect(loginRoute.meta.requiresAuth).toBe(false)
})

test('signup route should be correctly defined', () => {
  const signupRoute = router.getRoutes().find(route => route.name === 'signup')

  expect(signupRoute).toBeDefined()
  expect(signupRoute.path).toBe('/signup')
  expect(signupRoute.meta.requiresAuth).toBe(false)
})

// @ts-nocheck
import router from '../../src/router/index'

test('home route should be correctly defined', () => {
  const homeRoute = router.getRoutes().find(route => route.name === 'home')

  expect(homeRoute).toBeDefined()
  expect(homeRoute.path).toBe('/')
  expect(homeRoute.meta.requiresAuth).toBe(false)
})

test('about route should be correctly defined', () => {
  const aboutRoute = router.getRoutes().find(route => route.name === 'about')

  expect(aboutRoute).toBeDefined()
  expect(aboutRoute.path).toBe('/about')
  expect(aboutRoute.meta.requiresAuth).toBe(true)
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

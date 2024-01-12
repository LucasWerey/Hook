import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: redirectToAboutIfUserExists,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'recruiterSignup',
    component: () => import('../views/SignupView.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(redirectToHomeIfUserNotExists)

export default router

function redirectToAboutIfUserExists(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (AuthenticationUtils.getToken() && to.name !== 'login') {
    next({ name: 'about' })
  } else {
    next()
  }
}

function redirectToHomeIfUserNotExists(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (!AuthenticationUtils.getToken() && to.meta.requiresAuth !== false) {
    next({ name: 'home' })
  } else {
    next()
  }
}

import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

const routes = [
  {
    beforeEnter: redirectToAboutIfUserExists,
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: false },
    name: 'home',
    path: '/'
  },
  {
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true },
    name: 'about',
    path: '/about'
  },
  {
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false },
    name: 'login',
    path: '/login'
  },
  {
    component: () => import('../views/SignupView.vue'),
    meta: { requiresAuth: false },
    name: 'signup',
    path: '/signup'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(redirectToHomeIfUserNotExists)

function redirectToAboutIfUserExists(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
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
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (!AuthenticationUtils.getToken() && to.meta.requiresAuth !== false) {
    next({ name: 'home' })
  } else {
    next()
  }
}
export default router

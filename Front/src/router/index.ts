import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
  }
  // Add meta: { requiresAuth: true } to all other routes
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

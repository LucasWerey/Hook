import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import HomeView from '../views/HomeView.vue'
import { RouteRecordRaw } from 'vue-router'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: redirectToAboutIfUserExists
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
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
  if (Cookies.get('User')) {
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
  if (
    to.matched.some((record: RouteRecordRaw) => record.meta && record.meta.requiresAuth) &&
    !Cookies.get('User')
  ) {
    next({ name: 'home' })
  } else {
    next()
  }
}

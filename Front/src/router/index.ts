import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

const routes = [
  {
    beforeEnter: redirectToMySpaceIfUserExists,
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
    component: () => import('../views/MySpaceView.vue'),
    meta: { requiresAuth: true },
    name: 'myspace',
    path: '/myspace'
  },
  {
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true },
    name: 'profile',
    path: '/profile'
  },
  {
    component: () => import('../views/StudentOfferView.vue'),
    meta: { requiresAuth: true },
    name: 'StudentProfileRecruiter',
    path: '/myspace/offer/:offerId/student/:studentId'
  },
  {
    component: () => import('../views/DemandView.vue'),
    meta: { requiresAuth: true },
    name: 'StudentProfile',
    path: '/myspace/demand/:studentId'
  },
  {
    component: () => import('../views/OfferdetailView.vue'),
    name: 'OfferDetail',
    path: '/myspace/offer/:id'
  },
  {
    beforeEnter: redirectToMySpaceIfUserExists,
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false },
    name: 'login',
    path: '/login'
  },
  {
    beforeEnter: redirectToMySpaceIfUserExists,
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

function redirectToMySpaceIfUserExists(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (AuthenticationUtils.getToken()) {
    next({ name: 'myspace' })
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

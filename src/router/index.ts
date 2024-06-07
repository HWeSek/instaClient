import { createRouter, createWebHistory } from 'vue-router'
import FeedView from '@/views/FeedView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      component: FeedView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

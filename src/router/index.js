import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Presentacion from '@/views/Presentacion.vue'
import FormularioInicio from '@/views/FormularioInicio.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/Pres',
      name: 'Pres',
      component: Presentacion,
    },
    {
      path: '/Form',
      name: 'Form',
      component: FormularioInicio,
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Presentacion from '@/views/Presentacion.vue'
import FormularioInicio from '@/views/FormularioInicio.vue'
import Seguimiento from '@/views/Seguimiento.vue'
import Login from '@/views/Login.vue'
import FormularioNuevoBebe from '@/views/FormularioNuevoBebe.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pres',
      component: Presentacion,
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
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/Form',
      name: 'Form',
      component: FormularioInicio,
    },
    {
      path: '/Seguimiento',
      name: 'Seguimiento',
      component: Seguimiento,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/FormularioNuevoBebe',
      name: 'FormularioNuevoBebe',
      component: FormularioNuevoBebe
    }
  ],
})

export default router

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Presentacion from "@/views/Presentacion.vue";
import FormularioInicio from "@/views/FormularioInicio.vue";
import Seguimiento from "@/views/Seguimiento.vue";
import Login from "@/views/Login.vue";
import FormularioNuevoBebe from "@/views/FormularioNuevoBebe.vue";
import Dashboard from "@/views/Dashboard.vue";
import Consejos from "@/views/Consejos.vue";
import AudioBebe from "@/views/AudioBebe.vue";
import RegistroVacunas from "@/views/RegistroVacunas.vue";
import RegistroLlanto from "@/views/RegistroLlanto.vue";
import musica from "@/views/musica.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "pres",
      component: Presentacion,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/Form",
      name: "Form",
      component: FormularioInicio,
    },
    {
      path: "/Seguimiento",
      name: "Seguimiento",
      component: Seguimiento,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/FormularioNuevoBebe",
      name: "FormularioNuevoBebe",
      component: FormularioNuevoBebe,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/consejos",
      name: "Consejos",
      component: Consejos,
    },
    {
      path: "/audio",
      name: "AudioBebe",
      component: AudioBebe,
    },
    {
      path: "/registroVacunas",
      name: "RegistroVacunas",
      component: RegistroVacunas,
    },
    {
      path: "/registroLlanto",
      name: "RegistroLlanto",
      component: RegistroLlanto,
    },{
      path: "/musica",
      name: "musica",
      component: musica,
    },
  ],
});

export default router;

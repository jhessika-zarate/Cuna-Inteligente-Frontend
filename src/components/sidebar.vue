<template>
  <div class="sidebar">
    <a 
      href="#" 
      :class="{ active: $route.path === '/Home' }" 
      @click="redirectToHome"
    >
      <font-awesome-icon :icon="['fas', 'calendar']" class="icon" />
      <span>Hoy</span>
    </a>
    <a 
      href="#" 
      :class="{ active: $route.path === '/Seguimiento' }" 
      @click="redirectToSeguimiento"
    >
      <font-awesome-icon :icon="['fas', 'baby-carriage']" class="icon" />
      <span>Seguimiento</span>
    </a>
    <a 
      href="#" 
      :class="{ active: $route.path === '/historial' }" 
      @click="redirectToHistorial"
    >
      <font-awesome-icon :icon="['fas', 'question']" class="icon" />
      <span>Guia</span>
    </a>
    <a 
      href="#" 
      :class="{ active: $route.path === '/login' }" 
      @click="doLogout"
    >
      <font-awesome-icon :icon="['fas', 'sign-out']" class="icon" />
      <span>Salir</span>
    </a>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/Privado/authStore";


export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },

  methods: {
    doLogout(){
        this.authStore.logout();
        this.$router.push("/")
        //recargar pagina

      },
    redirectToHome() {
      this.$router.push('/Home');  // Ruta para la página de "Hoy"
    },
    redirectToSeguimiento() {
      this.$router.push('/Seguimiento');  // Ruta para la página de "Seguimiento"
    },
    redirectToDeteccionSonido() {
      this.$router.push('/deteccion-sonido');  // Ruta para la página de "Recuerdos"
    },
    redirectToHistorial() {
      this.$router.push('/historial');  // Ruta para la página de "Más"
    },
    logout() {
      // Lógica de logout, por ejemplo, eliminar el token de sesión o redirigir al login
      this.$router.push('/login');  // Redirige a la página de login
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

:root {
  --accent-color: #fff;
  --gradient-color: #FBFBFB;
}

.container {
  display: flex;
  flex-direction: column-reverse; /* Reordena los elementos, colocando el sidebar al final */
  align-items: center;
  z-index: 10000000;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(-45deg, #e3eefe 0%, #efddfb 100%);
}

.sidebar {
  position: fixed;
  bottom: 0;
  z-index: 10000000;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  
  transition: all 0.3s ease;
}

.sidebar a {
  color: #707070;
  text-align: center;
  flex: 1;
  padding: 10px 0;
  font-family: Montserrat;
  transition: background 0.3s, color 0.3s;
}

.sidebar a i {
  font-size: 24px;
  color: #569ca3;
}

.sidebar a span {
  display: block;
  font-size: 0.9rem;
  color: #569ca3;
  margin-top: 5px;
  transition: color 0.3s;
}

.sidebar a:hover {
  background-color: #f0f0f0;
}
.sidebar .icon{
  height: 1.5rem;
  color: #bbb9b3;
}

.sidebar a:hover i,
.sidebar a:hover span {
  color: #000000;
}

.sidebar a:hover {
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
}
.sidebar a.active {
  background-color: #d9b29c; /* Fondo del enlace activo */
  color: #ffffff; /* Color del texto */
}

.sidebar a.active .icon {
  transform: scale(1.3);
  color: #ffffff;
}

.sidebar a.active span {
  color: #ffffff; /* Color del texto debajo del ícono */
}

/* Estilos para móviles */
@media (max-width: 768px) {
  .sidebar a span {
    font-size: 0.75rem;
  }
}

@media (max-width: 540px) {
  .sidebar a span {
    display: none;
  }

  .sidebar a i {
    font-size: 20px;
  }
}
</style>

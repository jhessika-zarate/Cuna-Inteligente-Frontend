<template>
  <Home @cambio-bebe="actualizarColores" />

    <RouterView />
</template>
<script></script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
:root {
  --primary-color: #8f0707; /* Color de fondo */
  --secondary-color: #000000; /* Color de texto */
  --highlight-color: #cccccc; /* Color para hover o botones */
}

#app {
  background-color: white;
  width: 100vw;
  height: 100vh;
  font-family: 'Avenir Next';
  overflow-x: hidden;
}
body {
  font-family: Montserrat;
}
</style>
<script>
import sidebar from "@/components/sidebar.vue";
import Home from "@/views/HomeView.vue";

export default {
  name: "App",
  components: {
    sidebar,
  },
  methods: {
    actualizarColores(color) {
  console.log("Color recibido:", color);
  if (color === 'Femenino') {
    document.documentElement.style.setProperty('--primary-color', '#f8d7da'); /* Rosado claro */
    document.documentElement.style.setProperty('--secondary-color', '#721c24'); /* Rosado oscuro */
    document.documentElement.style.setProperty('--highlight-color', '#f5c6cb'); /* Rosado suave */
  } else if (color === 'Masculino') {
    document.documentElement.style.setProperty('--primary-color', '#d1ecf1'); /* Azul claro */
    document.documentElement.style.setProperty('--secondary-color', '#0c5460'); /* Azul oscuro */
    document.documentElement.style.setProperty('--highlight-color', '#bee5eb'); /* Azul suave */
  }
}

  }
  
};
</script>
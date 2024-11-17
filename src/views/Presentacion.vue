<template>
  <div class="fondo">
    <div class="contenedorlogo">
      <img class="logoe" src="@/assets/Teddylogoe.png" alt="" />
      <img class="logo" src="@/assets/Teddy.jpg" alt="" />
      <button class="boton" @click="empezar">COMENZAR</button>
      <button class="boton" @click="login">INCIAR SESION</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParallaxBannerWithCards",
  methods: {
    empezar() {
      this.$router.push("/Form");
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.fondo {
  background-color: #72b4c2;
}
.boton {
  width: 10rem;
  height: 3rem;
  border-radius: 8%;
  border-color: #72b4c2;
  background-color: #b5dde6;
  color: rgb(0, 0, 0);
  font-weight: 800;
}
.boton:hover {
  border-color: #72b4c2;
  background-color: #f2f4f5;
  color: rgb(0, 0, 0);
  font-weight: 800;
}
.contenedorlogo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh; /* Ocupa toda la altura de la pantalla */
}

.logo {
  width: 20rem;
  height: 20rem;
}
.logoe {
  width: 20rem;

}
</style>

<template>
  <div :class="bebeActual.color === 'Femenino' ? 'femenino' : 'masculino'">
  <div class="main-container">
    <div>

      <sidebar />
      <div class="container">
        <div class="banner-container">
          <img class="logoe" src="@/assets/Teddylogoe.png" alt="" />
          <img class="banner" src="@/assets/banner.png" alt="" />
          <img class="logo" src="@/assets/Teddy.png" alt="" />
          <p class="banner-text">Bienvenid@ {{ usuario }}</p>
        </div>

      


        <div class="baby-info">
          <p>Selecciona el bebe que deseas monitorear</p>
          <div class="muestrabbs">
            <!-- div con for de listaBesbes-->


            <li v-for="bebe in listaBebe" :key="bebe.idBebe">
              <div class="contenedorbb">
                <div v-if="bebe.color == 'Femenino' ">
                  <img class="logobb"  src="@/assets/ninia.png" alt="" />
                  </div>
                  <div v-if="bebe.color == 'Masculino'">
                  <img class="logobb" src="@/assets/ninio.png" alt="" />
                </div>
                <div v-if="bebeActual.nombre !== bebe.nombre">
              <button class="botonbb" @click="actualizarBebe(bebe)">{{ bebe.nombre }}</button>
            </div>
            <div v-if="bebeActual.nombre == bebe.nombre">
              <button class="botonbbelegido" @click="actualizarBebe(bebe)">{{ bebe.nombre }}</button>
            </div>
          </div>
            </li>

          </div>
          <div class="update-form">
            <form @submit.prevent="FormularioNuevoBebe">
              <button type="submit">Nuevo bebe</button>
            </form>
          </div>
        </div><!-- Formulario para actualizar altura y peso -->

        <h1 style="font-family: Montserrat;font-weight: 700;">

          <strong>Información de </strong>
          {{ (bebeActual.nombre) }}
        </h1>
        <div v-if="bebeActual.color == 'Femenino'">
          <div class="baby-info">

            <div class="info-grid">
              <div class="info-card" style="background-image: url(/src/assets/6.png);">
                <font-awesome-icon :icon="['fas', 'weight-scale']"
                  style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
                <p>Peso: <strong>{{ bebeActual.peso }} kg</strong></p>
              </div>
              <div class="info-card" style="background-image: url(/src/assets/6.png);">
                <font-awesome-icon :icon="['fas', 'ruler']" style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
                <p>Altura: <strong>{{ bebeActual.altura }} cm</strong></p>
              </div>
              <div class="info-card" style="background-image: url(/src/assets/6.png);">
                <font-awesome-icon :icon="['fas', 'baby']" style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
                <p>Última Comida: <strong>{{ bebeActual.ultimaComida || 'N/A' }}</strong></p>
              </div>
              <div class="info-card" style="background-image: url(/src/assets/6.png);">
                <font-awesome-icon :icon="['fas', 'calendar']" style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
                <p>Fecha Nacimiento: <strong>{{ new Date(bebeActual.fechadenacimiento).toLocaleDateString() }}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="bebeActual.color == 'Masculino'">
          <div class="baby-info">

            <div class="info-grid">
              <div class="info-card" style="background-image: url(/src/assets/5.png);">
                <font-awesome-icon :icon="['fas', 'weight-scale']"
                  style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
                <p>Peso: <strong>{{ bebeActual.peso }} kg</strong></p>
              </div>
              <div class="info-card" style="background-image: url(/src/assets/5.png);">
                <font-awesome-icon :icon="['fas', 'ruler']" style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
                <p>Altura: <strong>{{ bebeActual.altura }} cm</strong></p>
              </div>
              <div class="info-card" style="background-image: url(/src/assets/5.png);">
                <font-awesome-icon :icon="['fas', 'baby']" style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
                <p>Última Comida: <strong>{{ bebeActual.ultimaComida || 'N/A' }}</strong></p>
              </div>
              <div class="info-card" style="background-image: url(/src/assets/5.png);">
                <font-awesome-icon :icon="['fas', 'calendar']" style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
                <p>Fecha Nacimiento: <strong>{{ new Date(bebeActual.fechadenacimiento).toLocaleDateString() }}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import { useBebeStore } from "@/stores/Publico/Bebe";
import Cookies from "js-cookie";
import FormularioNuevoBebe from "./FormularioNuevoBebe.vue";
export default {
  name: "App",
  components: {
    sidebar,
  },
  mounted() {
    this.getListaBebe().then(() => {
      if (this.listaBebe.length > 0) {
        this.actualizarBebe(this.listaBebe[0]); // Seleccionar el primer bebé al cargar
        this.usuario =this.listaBebe[0].idUsuario.username;
        console.log("usuario",this.usuario);
      }
    });

  },
  beforeCreate() {
    if (!Cookies.get("idUser")) {
      this.$router.push("/login");
    }
    else{
      console.log("idUser",Cookies.get("idUser"));
   

    }
  },

  setup() {
    const useBebeStoreAdmi = useBebeStore();
    return { useBebeStoreAdmi };
  },
  data() {
    return {
      listaBebe: [],
      bebe: {
        idBebe: null,
        nombre: null,
        apellidopaterno: null,
        apellidomaterno: null,
        fechadenacimiento: null,
        color: null,
        idUsuario: {
          idUsuario: null,
        },
      },
      usuario: {
        idUsuario: null,
        username: null,
        gmail: null,
        contrasenia: null,
      },
      bebeActual: {
        idBebe: null,
        nombre: null,
        apellidopaterno: null,
        apellidomaterno: null,
        fechadenacimiento: null,
        color: null,
        idUsuario: {
          idUsuario: null,
        },
      },
      babyData: {
        nombre: "Juanito",
        fechaNacimiento: "2024-01-15",
        altura: 50,
        peso: 3.5,
      },
      altura: null,
      peso: null,
    };
  },
  methods: {
    FormularioNuevoBebe() {
      this.$router.push("/FormularioNuevoBebe");
    },
    updateData() {
      if (this.altura) this.babyData.altura = this.altura;
      if (this.peso) this.babyData.peso = this.peso;
      this.altura = null;
      this.peso = null;
      alert("Datos actualizados correctamente");

    },
    actualizarBebe(bebe) {
  console.log("Actualizando bebé:", bebe);
  this.bebeActual = { ...bebe };

  // Cambiar colores según el género
  const root = document.documentElement;
  if (bebe.color === "Femenino") {
    root.style.setProperty("--primary-color", "#ee94cb");
    root.style.setProperty("--secondary-color", "#cf7ab6");
    root.style.setProperty("--highlight-color", "#f5c6cb");
    root.style.setProperty("--gradient-color", "#9e6fdf");
  } else if (bebe.color === "Masculino") {
    root.style.setProperty("--primary-color", "#72b7c4");
    root.style.setProperty("--secondary-color", "#3c646b");
    root.style.setProperty("--highlight-color", "#bee5eb");
    root.style.setProperty("--gradient-color", "#3c7f8d");
  }
}

    ,
    async getListaBebe() {
      console.log("idUser: ", Cookies.get("idUser"));
      const idUser = Cookies.get("idUser");
      console.log("idUser: ", idUser);
      this.listaBebe = await this.useBebeStoreAdmi.getBabybyUser(idUser);
      
      console.log("lista luego de pedir", this.listaBebe);
      if (this.listaBebe == null) {
        alert("No se encontraron bebes registrados");
      }
    },
  },
  
};
</script>

<style scoped>
.femenino {
  --primary-color: #ee94cb;
  --secondary-color: #cf7ab6;
  --highlight-color: #f5c6cb;
  --gradient-color:#9e6fdf;
}

.masculino {
  --primary-color: #72b7c4;
  --secondary-color: #3c7f8d;
  --highlight-color: #bee5eb;
  --gradient-color:#3c486b;
}
.contenedorbb{
  align-items: center;
  align-content: center;
  text-align: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
.logobb {
  width: 4rem;
  margin: 0 auto;
  
}

.banner-container {
  position: relative;
  width: 100%;
  height: 23vh; /* Mantener la altura del banner */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Apilar logo y texto verticalmente */
  gap: 10px; /* Espacio entre los elementos */
}

.banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Asegura que la imagen cubra el contenedor */
  filter: brightness(0.7);
}

.banner-text {
  position: absolute;
  top: 40%; /* Ajusta según sea necesario */
  left: 40%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: Montserrat, sans-serif;
  z-index: 1; /* Asegura que el texto esté por encima del logo */
}
.logobb:hover {
  transform: scale(1.1);
}

.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
label{
  font-family: Montserrat;
}
.main-container {
  background-image: url("/src//assets/Fondobb.png");
  min-height: 100vh;
  background-repeat: repeat;
  padding-bottom: 10rem;
}

h1,
h2 {
  text-align: center;
  font-family: Montserrat;
  color: #333;
}
p{
  font-family: Montserrat;
}
.botonbb {
  position: relative;
  padding: 1px 10px;
  color: #000000;
  font-size: 15px;
  font-weight: bold;
  position: inherit;
  align-self: center;
  text-align: center;
  font-family: Montserrat;
  border-color: #c9cecf;
  cursor: pointer;
  outline: none;
  border-radius: 30px;
  transition: color 0.5s;
}
.botonbbelegido {
  position: relative;
  padding: 1px 10px;
  font-family: Montserrat;
  color: #000000;
  font-size: 15px;
  background-color: var(--primary-color);
  font-weight: bold;
  position: inherit;
  align-self: center;
  transform: scale(1.2);
  text-align: center;
 
  border-color: #c9cecf;
  cursor: pointer;
  outline: none;
  border-radius: 30px;
  transition: color 0.5s;
}

.botonbb:hover {
  background-color: var(--secondary-color);
  transform: scale(1.1);
}

li {
  list-style: none;
}

.baby-info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;

}

.logo {
  width: 8rem;
  height: 8rem;
  position: absolute;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
}
.logoe {
  width: 7rem;
  
  position: absolute;
  top: 20%;
  left: 17%;
  z-index: 50;
  transform: translate(-50%, -50%);
}

.step-title {
  text-align: center;
  font-size: xx-large;
  font-weight: 800;
  font-family: Montserrat;
  margin-bottom: 3vh;
  font-style: bold;
}

.muestrabbs {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  overflow-x: scroll; /* Permite el desplazamiento horizontal */
  scrollbar-width: none; /* Oculta la barra de desplazamiento en Firefox */
  -ms-overflow-style: none; /* Oculta la barra en IE y Edge */
}

.update-form label {
  display: block;
  margin-top: 10px;
  color: #555;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  /* Ajusta el número de columnas automáticamente */
  gap: 20px;
  /* Espaciado entre tarjetas */
  margin-top: 20px;
}

.info-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.info-card:hover{
  transform: scale(1.05);
}

.info-card i {

  margin-bottom: 10px;
}

.info-card p {
  color: white;
  font-size: medium;
  font-weight: 600;
  font-family: Montserrat
}

.update-form input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.update-form button {
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.update-form button:hover {
  background-color: var(--secondary-color);
}
</style>

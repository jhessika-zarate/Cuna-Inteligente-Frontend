<template>
  <div class="main-container">
    <div>
      <sidebar />
      <div class="container">
        <h1>Datos del Bebé</h1>

        <!-- Información actual del bebé -->
        <div class="baby-info">
          <h2>Información Actual</h2>
          <p><strong>Nombre:</strong> {{ bebeActual.nombre }}</p>
          <p>
            <!---transforma la fecha para que de si es este formato 2024-11-03T00:00:00.000+00:00 otro  Invalid Date -->
            <strong>Fecha de Nacimiento:</strong>
            {{ new Date(bebeActual.fechadenacimiento).toLocaleDateString() }}
          </p>
          <p><strong>Altura Actual:</strong> {{ babyData.altura }} cm</p>
          <p><strong>Peso Actual:</strong> {{ babyData.peso }} kg</p>
        </div>
        <div class="baby-info">
          <!-- div con for de listaBesbes-->
          <h2>Lista de Bebés</h2>
          <ul>
  <li v-for="bebe in listaBebe" :key="bebe.idBebe">
    <button @click="actualizarBebe(bebe)">{{ bebe.nombre }}</button>
  </li>
</ul>
<div class="update-form">
           <form @submit.prevent="FormularioNuevoBebe">
               <button type="submit">Nuevo bebe</button>
          </form>
        </div>
        </div><!-- Formulario para actualizar altura y peso -->
       

        <!-- Formulario para actualizar altura y peso -->
        <div class="update-form">
          <h2>Registrar Cambio de Altura y Peso</h2>
          <form @submit.prevent="updateData">
            <label for="altura">Nueva Altura (cm):</label>
            <input type="number" v-model="altura" required />

            <label for="peso">Nuevo Peso (kg):</label>
            <input type="number" v-model="peso" required />

            <button type="submit">Registrar Cambio</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import { useBebeStore } from "@/stores/Publico/Bebe";
import { useUsusrioStore } from "@/stores/Publico/Usuario";
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
    }
  });
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
  this.bebeActual = { ...bebe }; // Copiar directamente los datos del bebé seleccionado
  console.log("bebeActual actualizado:", this.bebeActual);
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
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.main-container {
  background-image: url("/src//assets/Fondobb.png");
  min-height: 100vh;
  background-repeat: repeat;
}
h1,
h2 {
  text-align: center;
  color: #333;
}

.baby-info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.update-form label {
  display: block;
  margin-top: 10px;
  color: #555;
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
  background-color: #4ca0af;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.update-form button:hover {
  background-color: #97c0c7;
}
</style>

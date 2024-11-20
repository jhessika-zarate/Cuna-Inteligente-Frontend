<template>
  <div class="main-container">
    <sidebar />
    <div class="baby-info">
      <h1 style="font-family: Montserrat; font-weight: 800">
        <font-awesome-icon
          :icon="['fas', 'clipboard']"
          style="height: 2rem; color: var(--primary-color); margin: 0.5rem"
        />
        Registro
      </h1>

      <div class="info-grid">
        <div class="info-card" @click="openModal('pesoaltura')">
          <font-awesome-icon
            :icon="['fas', 'weight-scale']"
            style="height: 5rem; color: whitesmoke; margin: 0.5rem"
          />
          <p>Peso y Altura</p>
        </div>

        <div class="info-card" @click="openModal('comida')">
          <font-awesome-icon
            :icon="['fas', 'bowl-food']"
            style="height: 5rem; color: whitesmoke; margin: 0.5rem"
          />
          <p>Última Comida</p>
        </div>
        <!-- Combo box para seleccionar comida -->
      </div>
    </div>
  </div>
  <div
    v-if="showModal && currentModal === 'pesoaltura'"
    class="modal-overlay"
    @click.self="closeModal"
  >
    <div class="modal">
      <!-- Contenedor de Peso -->
      <div class="food-select">
        <label for="comidaCombo">Selecciona al bebe:</label>
        <select v-model="RegistroComida.idBebe" id="comidaCombo">
          <option disabled value="">Seleccione una opción</option>
          <option
            v-for="comida in listaBebe"
            :key="comida.idBebe"
            :value="comida.idBebe"
          >
            {{ comida.nombre }}
          </option>
        </select>
      </div>
      <div class="height-container">
        <div class="scale">
          <div
            class="needle"
            :style="{ transform: `rotate(${(RegistroDatosBebe.peso / maxPeso) * 180 - 90}deg)` }"
          ></div>
          <div class="scale-marks">
            <span
              v-for="n in 11"
              :key="n"
              :style="{ left: `${(n - 1) * 10}%` }"
            >
              {{ (n - 1) * (maxPeso / 10) }}
            </span>
          </div>
        </div>
        <div class="input-container">
          <h1>Peso</h1>
          <input
            type="range"
            v-model.number="RegistroDatosBebe.peso"
            :min="minPeso"
            :max="maxPeso"
            step="0.1"
            class="slider"
          />
          <input
            type="number"
            v-model.number="RegistroDatosBebe.peso"
            :min="minPeso"
            :max="maxPeso"
            step="0.1"
            class="text-input"
          />
          <p style="text-align: center; font-size: larger">
            Peso actual: <strong>{{ RegistroDatosBebe.peso }} kg</strong>
          </p>
        </div>
      </div>

      <!-- Contenedor de Altura -->
      <div class="height-container">
        <div class="ruler">
          <div
            class="progress"
            :style="{ height: `${(RegistroDatosBebe.altura / maxAltura) * 100}%` }"
          ></div>
          <div class="ruler-marks">
            <div
              v-for="n in 31"
              :key="n"
              class="ruler-mark"
              :style="{ bottom: `${(n - 1) * 3.33}%` }"
            >
              <span v-if="(n - 1) % 5 === 0"
                >{{ (n - 1) * (maxAltura / 30) }} -</span
              >
            </div>
          </div>
        </div>
        <div class="input-container">
          <h1>Altura</h1>
          <input
            type="range"
            v-model.number="RegistroDatosBebe.altura"
            :min="minAltura"
            :max="maxAltura"
            step="0.5"
            class="slider"
          />
          <input
            type="number"
            v-model.number="RegistroDatosBebe.altura"
            :min="minAltura"
            :max="maxAltura"
            step="0.5"
            class="text-input"
          />
          <p style="font-size: larger">
            Altura actual: <strong>{{ RegistroDatosBebe.altura }} cm</strong>
          </p>
        </div>
      </div>

      <!-- Botón de guardar -->
      <button @click="saveDatos" class="btn-save">Guardar</button>
    </div>
  </div>

  <div
    v-if="showModal && currentModal === 'comida'"
    class="modal-overlay"
    @click.self="closeModal"
  >
    <div class="modal">
      <h1>Registrar Última Comida</h1>
      <div class="food-select">
        <label for="comidaCombo">Selecciona al bebe:</label>
        <select v-model="RegistroComida.idBebe" id="comidaCombo">
          <option disabled value="">Seleccione una opción</option>
          <option
            v-for="comida in listaBebe"
            :key="comida.idBebe"
            :value="comida.idBebe"
          >
            {{ comida.nombre }}
          </option>
        </select>
      </div>
      <div class="food-container">
        <!-- Selección de tipo de comida -->
        <div class="food-type">
          <div class="button-group">
            <button
              class="food-button"
              :class="{ active: comidaSeleccionada === 'Sólido' }"
              @click="comidaSeleccionada = 'Sólido'"
            >
              <font-awesome-icon :icon="['fas', 'drumstick-bite']" />
              Sólido
            </button>
            <button
              class="food-button"
              :class="{ active: comidaSeleccionada === 'Líquido' }"
              @click="comidaSeleccionada = 'Líquido'"
            >
              <font-awesome-icon :icon="['fas', 'glass-whiskey']" />
              Líquido
            </button>
          </div>
        </div>

        <!-- Campo de fecha y hora -->

        <div class="food-datetime">
          <label for="fecha">Fecha:</label>
          <input type="date" v-model="fecha" id="fecha" /><br />
          <label for="hora">Hora:</label>
          <input type="time" v-model="hora" id="hora" />
        </div>
      </div>
      <br />
      <p style="font-size: larger">
        Última comida: <strong>{{ comidaSeleccionada }}</strong
        >, <br />

        Fecha: <strong>{{ fecha }}</strong
        >, <br />
        Hora: <strong>{{ hora }}</strong
        ><br />
      </p>
      <button @click="saveComida" class="btn-save">Guardar</button>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import { useBebeStore } from "@/stores/Publico/Bebe";
import Cookies from "js-cookie";
export default {
  name: "App",
  components: {
    sidebar,
  },
  mounted() {
    this.getListaBebe();
  },
  setup() {
    const useBebeStoreAdmi = useBebeStore();
    return { useBebeStoreAdmi };
  },
  data() {
    return {
      showModal: false,
      currentModal: null,
      listaBebe: [],
      RegistroComida: {
        idBebe: null,
        tipocomida: "",
        fecha: "",
        idUsuario: {
          idUsuario: Cookies.get("idUser"),
        },
      },
      RegistroDatosBebe: {
        peso: 10,
        altura: 50,
        fecha: "",
      },
      RegistroDatosBebeMandar: {
        peso: "",
        altura: "",
        fecha: "",
      },
      RegistroComidaMandar: {
        tipocomida: "",
        fecha: "",
      },

      RegistroPesoAltura: {
        peso: "",
        altura: "",
        fecha: "",
      },
      peso: 10,
      altura: 50,
      minPeso: 0,
      maxPeso: 50,
      minAltura: 0, // Altura mínima
      maxAltura: 150, // Altura máxima en cm
      comidaSeleccionada: null,
      fecha: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
      hora: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }), // Hora actual en formato HH:MM
      //en el fomato 2024-11-14T12:34:56.000+00:00
      cantidad: 0,
      horario: "",
      comidas: ["Leche", "Papilla", "Fruta", "Cereal", "Otros"],
      options: [
        { label: "Desarrollo", icon: "fas fa-baby" },

        { label: "Alimento", icon: "fas fa-utensils" },
        { label: "Peso", icon: "fas fa-weight" },
        { label: "Sueño", icon: "fas fa-bed" },
        { label: "Llanto", icon: "fas fa-cry" },
      ],
    };
  },
  methods: {
    openModal(modalType) {
      this.currentModal = modalType;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentModal = null;
    },
    savePeso() {
      console.log(`Peso registrado: ${this.peso} kg`);
      this.closeModal();
    },
    saveAltura() {
      console.log(`Altura registrada: ${this.altura} cm`);
      this.closeModal();
    },
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

    async saveDatos() {
      // Obtener fecha y hora
      // Obtener fecha y hora
      const fecha = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const hora = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Crear el formato final
      const fechaHora = `${fecha}T${hora}.000+00:00`;
      this.RegistroDatosBebe.fecha = fechaHora;
      if (
        this.RegistroDatosBebe.peso === null ||
        this.RegistroDatosBebe.altura === null ||
        this.RegistroDatosBebe.fecha === null ||
        this.RegistroComida.idBebe === null
      ) {
        alert("Por favor llene todos los campos");
        return;
      }

      console.log("Datos", this.RegistroDatosBebe);
      console.log("idBebe", this.RegistroComida.idBebe);
      const peticionPostAlimentacion =
        await this.useBebeStoreAdmi.postRegistroDatosBebe(
          this.RegistroComida.idBebe,
          this.RegistroDatosBebe
        );
      console.log(peticionPostAlimentacion);
      this.closeModal();
    },

    async saveComida() {
      if (
        this.comidaSeleccionada === null ||
        this.fecha === null ||
        this.hora === null ||
        this.RegistroComida.idBebe === null
      ) {
        alert("Por favor llene todos los campos");
        return;
      }
      //que si es solida es true y si no false
      if (this.comidaSeleccionada === "Sólido") {
        this.RegistroComida.tipocomida = true;
      } else {
        this.RegistroComida.tipocomida = false;
      }
      const chi = `${this.fecha}T${this.hora}:00.000+00:00`;

      this.RegistroComida.fecha = chi;
      console.log(
        `Comida: ${this.RegistroComida.tipocomida}, Hora: ${this.RegistroComida.fecha},lsjksjds${this.RegistroComida.idBebe}`
      );
      this.RegistroComidaMandar.tipocomida = this.RegistroComida.tipocomida;
      this.RegistroComidaMandar.fecha = this.RegistroComida.fecha;
      const peticionPostAlimentacion =
        await this.useBebeStoreAdmi.postRegistroAlimento(
          this.RegistroComida.idBebe,
          this.RegistroComidaMandar
        );
      console.log(peticionPostAlimentacion);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.main-container {
  background-image: url("/src/assets/Fondobb.png");
  min-height: 100vh;
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(3, 1fr);
  /* 3 filas para los 6 botones */
  gap: 20px;
  margin-top: 40px;
  width: 80%;
  max-width: 800px;
}
h1,
p,
h2 {
  font-family: Montserrat;
}
.baby-info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* Ajusta el número de columnas automáticamente */
  gap: 20px;
  /* Espaciado entre tarjetas */
  margin-top: 20px;
}

.info-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle,
    var(--secondary-color) 36%,
    var(--gradient-color) 100%
  );
  background-color: var(--primary-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.info-card:hover {
  transform: scale(1.05);
}
label {
  font-family: Montserrat;
}
.info-card i {
  margin-bottom: 10px;
}

.info-card p {
  color: white;

  font-size: medium;
  font-weight: 600;
  font-family: Montserrat;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  background-color: #3cafc4;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.card-button:hover {
  background-color: #527cac;
  transform: scale(1.05);
}

.card-button i {
  font-size: 40px;
  margin-bottom: 10px;
}

.card-button span {
  font-size: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.slider-container {
  margin: 20px 0;
}

.slider {
  width: 100%;
  margin: 10px 0;
}

.btn-save {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-save:hover {
  background-color: var(--secondary-color);
}

.balance-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scale {
  position: relative;
  width: 100px;
  height: 50px;
  background: #f0f0f0;
  border-radius: 100px 100px 0 0;
  border: 2px solid #ccc;
  overflow: hidden;
  margin-bottom: 20px;
  margin: 1rem;
}

.needle {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 4px;
  height: 80px;
  background: var(--primary-color);
  transform-origin: bottom;
  transition: transform 0.3s ease;
}

.scale-marks {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.scale-marks span {
  position: absolute;
  font-size: 12px;
  transform: translateX(-50%);
}

.height-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.ruler {
  position: relative;
  width: 60px;
  height: 250px;
  background: #e0e0e0;
  border-radius: 8px;
  border: 2px solid #ccc;
  overflow: hidden;
  margin: 2rem;
}

.progress {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: var(--primary-color);
  transition: height 0.3s ease;
}

.ruler-marks {
  position: absolute;
  left: 100%;
  width: 100%;
  z-index: 1000;
  height: 100%;
}

.ruler-mark {
  position: absolute;
  width: 100%;
  z-index: 1000;
  border-top: 1px solid #333;
}

.ruler-mark span {
  position: absolute;
  left: -20%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  color: #333;
}

.input-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.slider-container {
  margin-bottom: 10px;
  width: 100%;
}

.text-input {
  width: 100%;
  padding: 5px;
  font-size: 1rem;
}

.food-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.food-selector,
.food-quantity,
.food-time {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.food-button {
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s;
}

.button-group {
  display: flex;
  flex-direction: row;
  position: relative;
  /* O relative si es necesario */
  top: 100%;
  left: 65%;
  transform: translate(-50%, 20%);
}

.food-button.active {
  background-color: var(--primary-color);
  color: white;
}

.food-button:hover {
  background-color: var(--secondary-color);
  color: white;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .button-container {
    grid-template-columns: repeat(2, 1fr);
    /* 2 columnas */
    grid-template-rows: repeat(3, 1fr);
    /* 3 filas */
  }
}
</style>

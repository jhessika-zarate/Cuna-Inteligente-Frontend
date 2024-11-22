<template>
  <div class="main-container">
    <!-- Sidebar -->
    <sidebar />

    <!-- Banner -->
    <div class="banner">
      <div class="banner-content">
        <h1>Registro de Vacunas</h1>
        <p>
          Mantén al día el historial de vacunación de tus hijos para su
          bienestar.
        </p>
        <p>Vacunas de {{ nombreBebe }}</p>
      </div>
    </div>

    <!-- Encabezado con botón -->
    <header>
      <h2>Lista de Vacunas Registradas</h2>
      <button @click="mostrarModal = true" class="btn-registrar">
        Registrar Vacuna
      </button>
    </header>

    <!-- Tabla de registros (Siempre visible) -->
    <section class="tabla-registros">
      <table class="tabla-vacunas">
        <thead>
          <tr>
            <th>Nombre de la Vacuna</th>
            <th>Fecha de Vacunación</th>
            <th>Dosis</th>
            <th>Centro de Salud</th>
          </tr>
        </thead>
        <tbody>
          <!-- Si hay datos, los muestra aquí -->
          <tr v-if="vacunas.length === 0">
            <td colspan="4" class="no-data">No hay vacunas registradas aún.</td>
          </tr>
          <tr v-for="vacuna in vacunas" :key="vacuna.idVacuna">
            <td>{{ vacuna.nombreVacuna }}</td>

            <td>{{ new Date(
                        vacuna.fechaVacuna
                      ).toLocaleDateString()  }}</td>

            <td>{{ vacuna.dosis }}</td>
            <td>{{ vacuna.centroSalud }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Modal de registro -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="cerrarModal">&times;</button>
        <h2>Registrar Nueva Vacuna</h2>
        <form @submit.prevent="registrarVacuna" class="modal-form">
          <div class="form-group">
            <label for="nombre">Nombre de la vacuna:</label>
            <input
              id="nombre"
              v-model="nuevaVacuna.nombreVacuna"
              placeholder="Ej. Pentavalente"
              required
            />
          </div>
          <div class="form-group">
            <label for="fecha">Fecha de vacunación:</label>
            <input
              id="fecha"
              type="date"
              v-model="nuevaVacuna.fechaVacuna"
              required
            />
          </div>
          <div class="form-group">
            <label for="dosis">Dosis:</label>
            <input
              id="dosis"
              v-model="nuevaVacuna.dosis"
              placeholder="Ej. 1/2/3"
              required
            />
          </div>
          <div class="form-group">
            <label for="centro">Centro de Salud:</label>
            <input
              id="centro"
              v-model="nuevaVacuna.centroSalud"
              placeholder="Ej. Hospital Central"
              required
            />
          </div>
          <button type="submit" class="btn-guardar">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import { useBebeStore } from "@/stores/Publico/Bebe";
import Cookies from "js-cookie";
export default {
  name: "Vacunas",
  components: {
    sidebar,
  },
  setup() {
    const useBebeStoreAdmi = useBebeStore();
    return { useBebeStoreAdmi };
  },
  data() {
    return {
      vacunas: [],
      nombreBebe: "",
      IDbebe: "",
      mostrarModal: false,
      nuevaVacuna: {
        nombreVacuna: "",
        fechaVacuna: "",
        dosis: "",
        centroSalud: "",
      },
    };
  },
  async beforeCreate() {
    if (!Cookies.get("idUser")) {
      this.$router.push("/login");
    } else {
      console.log("idUser", Cookies.get("idUser"));
      const idBebeSeleccionado =
        await this.useBebeStoreAdmi.getBebeSeleccionado();
      this.IDbebe = idBebeSeleccionado.idBebe;
      console.log("idBebeSeleccionado", idBebeSeleccionado);
      this.nombreBebe = idBebeSeleccionado.nombre;
      this.vacunas = await this.useBebeStoreAdmi.getVacunas(
        idBebeSeleccionado.idBebe
      );
    }
  },

  methods: {
    async cargarVacunas() {
      try {
        const response = await fetch("http://tu-api/vacunas");
        this.vacunas = await response.json();
      } catch (error) {
        console.error("Error cargando las vacunas:", error);
      }
    },
    async registrarVacuna() {
  try {
    // Validar si `nuevaVacuna.fechaVacunacion` tiene un valor
    if (!this.nuevaVacuna.fechaVacuna) {
      alert("Por favor, selecciona una fecha de vacunación.");
      return;
    }

    // Convertir la fecha en un objeto Date
    const fechaVacuna = new Date(this.nuevaVacuna.fechaVacuna);

    // Verificar si la fecha es válida
    if (isNaN(fechaVacuna.getTime())) {
      alert("La fecha seleccionada no es válida.");
      return;
    }

    // Construir el timestamp en el formato requerido (YYYY-MM-DDTHH:mm:ss.SSSZ)
    const fecha = fechaVacuna.toISOString().split("T")[0]; // YYYY-MM-DD
    const hora = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const fechaHora = `${fecha}T${hora}.000+00:00`;

    // Actualizar el valor en `nuevaVacuna`
    this.nuevaVacuna.fechaVacuna = fechaHora;

    // Enviar los datos al backend
    const response = await this.useBebeStoreAdmi.postVacunas(
      this.IDbebe,
      this.nuevaVacuna
    );

   alert("Vacuna registrada exitosamente");
    this.cargarVacunas();
    this.cerrarModal();
  } catch (error) {
    alert("No se pudo registrar la vacuna: " + error.message);
  }
}
,
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevaVacuna = {
        nombreVacuna: "",
        fechaVacuna: "",
        dosis: "",
        centroSalud: "",
      };
    },
  },
  mounted() {},
};
</script>

<style scoped>
/* Fondo y diseño general */
.main-container {
  background-image: url("/src/assets/Fondobb.png");
  background-repeat: repeat;
  min-height: 100vh;
  padding: 2rem;
}

/* Banner */
.banner {
  background-image: url("/src/assets/banner.png");
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
}
.banner-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.banner-content p {
  font-size: 1.2rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
.banner-content span {
  font-size: 1.2rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Botones */
.btn-registrar {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-registrar:hover {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

/* Tabla de vacunas */
.tabla-vacunas {
  background-color: #f4f4f4;
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tabla-vacunas th,
.tabla-vacunas td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tabla-vacunas th {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}

.tabla-vacunas tbody tr:hover {
  background-color: #f4f4f4;
}

.tabla-vacunas tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.no-data {
  text-align: center;
  font-style: italic;
  color: #666;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 15;
}

.modal-close:hover {
  color: white;
  transform: scale(1.2);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.btn-guardar {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-guardar:hover {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}
</style>

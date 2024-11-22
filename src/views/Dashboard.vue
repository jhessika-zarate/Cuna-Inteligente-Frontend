<template>
  <sidebar />
  <div class="pantalla">
    <div v-if="ContenedorSeleccionado && !ObtencionDatos">
      <div class="muestrabbs">
        <!-- div con for de listaBesbes-->

        <li v-for="bebe in listaBebe" :key="bebe.idBebe">
          <div class="contenedorbb">
            <div v-if="bebe.color == 'Femenino'">
              <img class="logobb" src="@/assets/ninia.png" alt="" />
            </div>
            <div v-if="bebe.color == 'Masculino'">
              <img class="logobb" src="@/assets/ninio.png" alt="" />
            </div>
            <div v-if="bebe.seleccionado">
              <button class="botonbb" @click="actualizarBebe(bebe)">
                {{ bebe.nombre }}
              </button>
            </div>
            <div v-if="!bebe.seleccionado">
              <button class="botonbbelegido" @click="actualizarBebe(bebe)">
                {{ bebe.nombre }}
              </button>
            </div>
          </div>
        </li>
      </div>

      <!-- Título de Estadísticas del bebé -->
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="title">Estadísticas del Bebé</h2>
        </div>
      </div>

      <!-- Primer gráfico que ocupa toda la fila ACTIVUDAD EN LA NOCHE  -->
      <div class="row">
        <div class="col-12">
          <card type="chart">
            \
            <div class="chart-area">
              <line-chart
                class="grafica-principal"
                ref="bigChart"
                chart-id="big-line-chart"
                :chart-data="bigLineChart.chartData"
                :gradient-colors="bigLineChart.gradientColors"
                :gradient-stops="bigLineChart.gradientStops"
                :extra-options="bigLineChart.extraOptions"
              ></line-chart>
            </div>
          </card>
        </div>
      </div>

      <div class="charts-container2">
        <!-- Dos instancias del gráfico con valores de humedad distintos -->
        <div class="col-6 sped">
          <VelocímetroChart :humidityValue="humidityValue1" titulo="Humedad" />
        </div>
        <div class="col-6 sped">
          <VelocímetroChart :humidityValue="humidityValue2" titulo="Temperatura" />
        </div>
      </div>

      <!-- Otros gráficos organizados en 3 columnas -->
      <div class="charts-container">
        <div v-for="chart in charts" :key="chart.chartId" class="chart-item">
          <div class="card">
            <div class="card-body">
              <component
                :is="chart.component"
                class="chart-component"
                :chart-id="chart.chartId"
                :chart-data="chart.chartData"
                gradient-colors='["#f96332", "#f96332"]'
                gradient-stops="[0, 0.5, 0.7, 0.9]"
                :extra-options="chart.extraOptions"
                titulox="Fecha"
                tituloy="kilogramos"
              ></component>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="centered-container">
      <div class="row">
        <div class="col-12 text-center">
          <!-- que si es true  diga seleccionee bebe y sino que diga seleccione otro beb con datos-->
          <h2 class="title" v-if="ObtencionDatos">
            Seleccione un bebe con registros previos
          </h2>
          <h2 class="title" v-else>Seleccione un bebe</h2>

          <div class="muestrabbs">
            <!-- div con for de listaBebes-->
            <li v-for="bebe in listaBebe" :key="bebe.idBebe">
              <div class="contenedorbb">
                <div v-if="bebe.color == 'Femenino'">
                  <img class="logobb" src="@/assets/ninia.png" alt="" />
                </div>
                <div v-if="bebe.color == 'Masculino'">
                  <img class="logobb" src="@/assets/ninio.png" alt="" />
                </div>
                <div v-if="bebe.seleccionado">
                  <button class="botonbb" @click="actualizarBebe(bebe)">
                    {{ bebe.nombre }}
                  </button>
                </div>
                <div v-if="!bebe.seleccionado">
                  <button class="botonbbelegido" @click="actualizarBebe(bebe)">
                    {{ bebe.nombre }}
                  </button>
                </div>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import LineChart from "@/components/Dashboard/LineChart.vue";
import BarChart from "@/components/Dashboard/BarChart.vue";
import { chartData } from "@/components/Dashboard/chartConfig";
import VelocímetroChart from "@/components/Dashboard/VelocímetroChart.vue";
import { useBebeStore } from "@/stores/Publico/Bebe";

import Cookies from "js-cookie";
export default {
  components: {
    LineChart,
    BarChart,
    VelocímetroChart,
    sidebar,
  },
  setup() {
    const bebeStore = useBebeStore();
    const useBebeStoreAdmi = useBebeStore();
    return { bebeStore, useBebeStoreAdmi };
  },
  async beforeCreate() {
    const datos = await this.bebeStore.getTemperaturabyUserData(
      Cookies.get("idUser")
    );
    const BebeSeleccionado = await this.bebeStore.getBebeSeleccionado();
    if (BebeSeleccionado.idUsuario.idUsuario == Cookies.get("idUser")) {
      this.ContenedorSeleccionado = true;
    }
    const actividadBebe = await this.bebeStore.getActivityByBabyData(
      BebeSeleccionado.idBebe
    );
    const crecimientobebe = await this.bebeStore.obtenerDatosGraficas(
      BebeSeleccionado.idBebe
    );
    const humedadBebe = await this.bebeStore.fetchHumedadData(
      BebeSeleccionado.idBebe
    );
    console.log("humedadBebe", humedadBebe);
    const temperaturaBebe = await this.bebeStore.fetchTemperaturaData(
      BebeSeleccionado.idBebe
    );

    // Asignar los valores a los gráficos
    this.humidityValue1 = humedadBebe;
    this.humidityValue2 = temperaturaBebe;

    console.log("temperaturaBebe", temperaturaBebe);

    console.log("actividadBebe", actividadBebe);
    if (actividadBebe) {
      this.ObtencionDatos = false;
    }
    this.bigLineChart = actividadBebe;
    this.charts = crecimientobebe.otherCharts;
    console.log("bigLineChart", this.bigLineChart);
    console.log("charts", this.charts);

    if (!Cookies.get("idUser")) {
      this.$router.push("/login");
    } else {
      console.log("idUser", Cookies.get("idUser"));
    }
  },

  data() {
    return {
      humidityValue1: 0, // Inicializa el valor de humedad para el primer gráfico
      humidityValue2: 0, // Inicializa el valor de humedad para el segundo gráfico

      ContenedorSeleccionado: false,
      ObtencionDatos: true,
      listaBebe: [],
      bigLineChart: chartData.bigLineChart,

      charts: chartData.otherCharts,
      chartData,
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
      Temporalbebe: {
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
    };
  },
  computed: {
    isRTL() {
      return "text-left";
    },
    bigLineChartCategories() {
      return ["Accounts", "Purchases", "Sessions"];
    },
  },
  methods: {
    initBigChart(index) {
      const chart = this.bigLineChart;
      chart.chartData.datasets[0].data = chart.allData[index];
      chart.activeIndex = index;
    },
    actualizarBebe(actualBebe) {
      if (actualBebe.idBebe == this.bebe.idBebe) return;
      console.log("quiero actualizar esta a acyual", actualBebe);
      this.cambiarSeleccionado(actualBebe.idBebe);
      console.log("ahora este es el bebe", this.bebe);
      this.bebe = { ...actualBebe }; // Copiar directamente los datos del bebé seleccionado
      this.getListaBebe();
     
    },

    async cambiarSeleccionado(idNuevoBbes) {
      console.log("id de bebe enviado",idNuevoBbes);
      const datosActualizados = await this.bebeStore.putBebeSeleccionado(idNuevoBbes);

      console.log("datosActualizados", datosActualizados);
    },
    async getListaBebe() {
      console.log("idUser: ", Cookies.get("idUser"));
      const idUser = Cookies.get("idUser");
      console.log("idUser: ", idUser);
      this.listaBebe = await this.useBebeStoreAdmi.getBabybyUser(idUser);
      const pruebaBebe = await this.useBebeStoreAdmi.getBebeSeleccionado();
      this.bebe = { ...pruebaBebe };
      this.Temporalbebe = { ...pruebaBebe };
      console.log("lista luego de pedir", this.listaBebe);
      console.log("bebe seleccionado", this.bebe);
      if (this.listaBebe == null) {
        alert("No se encontraron bebes registrados");
      }
    },
  },
  mounted() {
    //this.initBigChart(0);

    this.getListaBebe().then(() => {
      if (this.listaBebe.length > 0) {
        this.usuario = this.listaBebe[0].idUsuario.username;
        console.log("usuario", this.usuario);
      }
    });
  },
};
</script>
<style scoped>
.pantalla {
  padding: 30px;
  background-image: url("/src//assets/Fondobb.png");
  min-height: 100vh;
  background-repeat: repeat;
  padding-bottom: 5rem;
}
/* Estilo general para las tarjetas */
.card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: #fff;
  overflow: hidden;
  margin-bottom: 20px;
}

/* Títulos principales */
.title {
  font-size: 32px;
  font-weight: 700;
  color: #343a40;
  margin: 20px 0;
  text-transform: uppercase;
}

/* Títulos de las tarjetas */
.card-category {
  font-size: 16px;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 10px;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: #343a40;
  margin: 0;
}

/* Estilo para el encabezado del gráfico */
.card .row {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}
.muestrabbs {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 0 auto;
  align-self: center;
  overflow-x: scroll; /* Permite el desplazamiento horizontal */
  scrollbar-width: none; /* Oculta la barra de desplazamiento en Firefox */
  -ms-overflow-style: none; /* Oculta la barra en IE y Edge */
}
ul {
  list-style: none;
}
li {
  list-style: none;
}
.contenedorbb {
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

.logobb:hover {
  transform: scale(1.1);
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

/* Estilo de los botones del gráfico */
.btn-group-toggle .btn {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-group-toggle .btn:hover {
  background-color: #0056b3;
}

.btn-group-toggle .btn.active {
  background-color: #28a745;
}

.btn-group-toggle .btn:focus {
  outline: none;
}

/* Mejorar el área del gráfico */
.chart-area {
  position: relative;
  height: 100%;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Agregar márgenes entre los gráficos */
.row {
  margin-bottom: 30px;
}

/* Estilos para el contenedor de los gráficos pequeños */
.card .chart-area {
  padding: 10px;
  border-radius: 8px;
  background: #f4f4f4;
  border: 1px solid #ddd;
}

/* Estilos de la columna para que los gráficos se acomoden bien */
.col-lg-4 {
  padding: 15px;
}

/* Títulos dentro de los gráficos pequeños */
.card-category {
  font-size: 14px;
  color: #495057;
  margin-bottom: 5px;
}

.card-title {
  font-size: 18px;
  color: #212529;
  font-weight: 600;
}

/* Agregar un poco de espacio entre los gráficos */
.card {
  margin-bottom: 15px;
  width: 90%;
}

/* Diseño de texto para la alineación de RTL */
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}

/* Contenedor principal para los gráficos */
.charts-container {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(320px, 1fr)
  ); /* Usa un tamaño mínimo adecuado */
  gap: 20px; /* Espacio entre los gráficos */
  padding: 20px;
}

.charts-container2 {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(520px, 1fr)
  ); /* Usa un tamaño mínimo adecuado */
  gap: 20px; /* Espacio entre los gráficos */
  padding: 20px;
}

/* Asegúrate de que el contenedor se vea bien en pantallas más grandes */
@media (min-width: 1200px) {
  .charts-container {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* 3 columnas para pantallas grandes */
  }
  .charts-container2 {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 3 columnas para pantallas grandes */
  }
}
/* Cada gráfico dentro del contenedor */
.chart-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

/* Estilos para los gráficos */
.chart-component {
  height: 16rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 20px;
}
.grafica-principal {
  height: 20rem;
}

/* Asegúrate de que el contenedor se vea bien en pantallas más grandes */
@media (max-width: 450px) {
  .chart-item {
    padding: 0px;
  }
  .charts-container {
    padding: 0px;
  }
  .charts-container2 {
    padding: 0px;
  }
  /* Estilos para los gráficos */
  .chart-component {
    height: 10rem;
  }
  .grafica-principal {
    height: 15rem;
  }
  .sped {
    margin-top: 2rem;
    width: 60%;
    margin-bottom: 2rem;
  }
}
@media (max-width: 400px) {
  .pantalla {
    padding: 10px;
  }
  .sped {
    width: 10%;
  }
}
.sped {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Altura fija para el velocímetro */
  width: 80%;
}

.centered-container {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  min-height: 50vh; /* Altura mínima de la pantalla completa */
}

.title {
  margin-bottom: 20px; /* Ajusta el espaciado del título */
}

.muestrabbs {
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten si hay muchos */
  gap: 10px; /* Espaciado entre los elementos */
  justify-content: center; /* Centra horizontalmente el contenido */
}

.contenedorbb {
  margin: 10px;
}
</style>

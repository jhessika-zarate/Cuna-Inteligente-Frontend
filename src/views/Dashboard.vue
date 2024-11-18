<template>
  <sidebar />
<div class="pantalla">
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
              <div v-if="bebeActual.nombre !== bebe.nombre">
                <button class="botonbb" @click="actualizarBebe(bebe)">{{ bebe.nombre }}</button>
              </div>
              <div v-if="bebeActual.nombre == bebe.nombre">
                <button class="botonbbelegido" @click="actualizarBebe(bebe)">{{ bebe.nombre }}</button>
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
      <template slot="header">
        <div class="row">
          <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
            <h5 class="card-category">Estadísticas generales</h5>
            <h2 class="card-title">Texto del primer gráfico</h2>
          </div>
          <div class="col-sm-6">
            <div
              class="btn-group btn-group-toggle"
              :class="isRTL ? 'float-left' : 'float-right'"
              data-toggle="buttons"
            >
              <label
                v-for="(option, index) in bigLineChartCategories"
                :key="option"
                class="btn btn-sm btn-primary btn-simple"
                :class="{ active: bigLineChart.activeIndex === index }"
                :id="index"
              >
                <input
                  type="radio"
                  @click="initBigChart(index)"
                  name="options"
                  autocomplete="off"
                  :checked="bigLineChart.activeIndex === index"
                />
                {{ option }}
              </label>
            </div>
          </div>
        </div>
      </template>
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


<div class="charts-container">
  <div class="col-6 sped">
    <VelocímetroChart
      :chartData="chartData.velocimetro.chartData"
      :chartOptions="chartData.velocimetro.chartOptions"
    />
  </div>
  <div class="col-6 sped">
    <VelocímetroChart
      :chartData="chartData.velocimetro.chartData"
      :chartOptions="chartData.velocimetro.chartOptions"
    />
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
        ></component>
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
const datos= await this.bebeStore.getTemperaturabyUserData(Cookies.get("idUser"));
console.log("beforeCreate",datos);
this.bigLineChart=datos;
if (!Cookies.get("idUser")) {
  this.$router.push("/login");
}
else {
  console.log("idUser", Cookies.get("idUser"));


}
},

data() {
return {
  listaBebe: [],
  //bigLineChart: chartData.bigLineChart,
  bigLineChart: null,
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
mounted() {
this.initBigChart(0);
this.getListaBebe().then(() => {
  if (this.listaBebe.length > 0) {
    this.actualizarBebe(this.listaBebe[0]); // Seleccionar el primer bebé al cargar
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
ul{
  list-style: none;
}
li{
  list-style: none;
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

/* Asegúrate de que el contenedor se vea bien en pantallas más grandes */
@media (min-width: 1200px) {
.charts-container {
grid-template-columns: repeat(
  3,
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
/* Estilos para los gráficos */
.chart-component {
height: 10rem;
}
.grafica-principal {
height: 15rem;
}
}
@media (max-width: 400px) {
.pantalla {
padding: 10px;
}
}
.sped {
display: flex;
justify-content: center;
align-items: center;
height: 200px; /* Altura fija para el velocímetro */
}

</style>
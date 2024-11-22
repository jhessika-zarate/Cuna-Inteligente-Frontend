<template>
    <div class="main-container">
      <!-- Sidebar -->
      <sidebar />
    
      <!-- Banner -->
      <div class="banner">
        <div class="banner-content">
          <h1>Registro de Llanto</h1>
          <p>Mantén un seguimiento del llanto de tu bebé para un mejor cuidado.</p>
          <h2>Lista de Registros de Llanto de {{ nombreBebe }}</h2></div>
      </div>
    
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
      <!-- Tabla de registros (Siempre visible) -->
      <section class="tabla-registros">
        <table class="tabla-llanto">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Razón</th>
            </tr>
          </thead>
          <tbody>
            <!-- Si hay datos, los muestra aquí -->
            <tr v-if="llantos.length === 0">
              <td colspan="3" class="no-data">No hay registros de llanto aún.</td>
            </tr>
            <tr v-for="llanto in llantos" :key="llanto.idLlanto">
              <td>{{ new Date(
                        llanto.fecha
                      ).toLocaleDateString()  }}</td>
              <td>{{ llanto.razon }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
  import sidebar from '@/components/sidebar.vue';
  import LineChart from "@/components/Dashboard/LineChart.vue";
import BarChart from "@/components/Dashboard/BarChart.vue";
import { chartData } from "@/components/Dashboard/chartConfig";
import VelocímetroChart from "@/components/Dashboard/VelocímetroChart.vue";

import { useBebeStore } from "@/stores/Publico/Bebe";
import Cookies from "js-cookie";
  export default {
    name: 'Llanto',
    components: {
    LineChart,
    BarChart,
    VelocímetroChart,
    sidebar,
  },
    setup() {
    const useBebeStoreAdmi = useBebeStore();
    return { useBebeStoreAdmi };
  },
    data() {
      return {
        nombreBebe: "",
        IDbebe: "",
        charts: chartData.otherCharts,
        llantos: [], // Datos de llanto
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
      this.llantos = await this.useBebeStoreAdmi.getLlanto(
        idBebeSeleccionado.idBebe
      );
      const crecimientobebe = await this.useBebeStoreAdmi.obtenerDatosGraficasLlanto(
        idBebeSeleccionado.idBebe
    );
    this.charts = crecimientobebe.otherCharts;
    }
  },

    
    methods: {
      async cargarLlantos() {
        try {
          const response = await fetch('http://tu-api/llantos');
          this.llantos = await response.json();
        } catch (error) {
          console.error('Error cargando los registros de llanto:', error);
        }
      },
    },
    mounted() {
        },
  };
  </script>
  
  <style scoped>
  /* Fondo y diseño general */
  .main-container {
    background-image: url("/src/assets/Fondobb.png");
    background-repeat: repeat;
    min-height: 100vh;
    padding: 2rem;
    padding-bottom: 7rem;
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
  
  /* Tabla de llanto */
  .tabla-llanto {
    background-color: #f4f4f4;
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .tabla-llanto th,
  .tabla-llanto td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .tabla-llanto th {
    background-color: var(--primary-color);
    color: white;
    font-weight: bold;
  }
  
  .tabla-llanto tbody tr:hover {
    background-color: #f4f4f4;
  }
  
  .tabla-llanto tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .no-data {
    text-align: center;
    font-style: italic;
    color: #666;
  }
  </style>
  
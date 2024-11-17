<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { reactive } from "vue";
import { Chart as ChartJS } from "chart.js";
import {
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registra todos los elementos necesarios
ChartJS.register(BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'X Axis',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Y Axis',
            },
          },
        },
      }),
    },
  },
};
</script>

<style scoped>
/* Estilos generales para los contenedores de los gráficos */
div {
  margin: 20px;
  padding: 15px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Efecto al pasar el ratón sobre el contenedor */
div:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transform: scale(1.02);
}

/* Títulos de los gráficos */
h3 {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

/* Configuración de la leyenda de los gráficos */
.chartjs-legend {
  font-size: 12px;
  font-weight: 600;
  color: #777;
  margin-top: 15px;
  text-align: center;
}



/* Personalización de los ejes del gráfico */
.chartjs-axis {
  color: #495057;
}

.chartjs-axis-title {
  font-size: 14px;
  color: #495057;
  font-weight: 600;
  padding-top: 10px;
}

/* Ejes X e Y */
.x-axis-label,
.y-axis-label {
  font-size: 13px;
  color: #6c757d;
  font-weight: 500;
}

</style>


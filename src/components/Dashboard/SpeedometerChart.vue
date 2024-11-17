<template>
  <div>
    <canvas ref="speedometerChart"></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "chart.js";

// Registra los elementos necesarios para el gráfico
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "SpeedometerChart",
  setup() {
    const speedometerChart = ref(null);

    onMounted(() => {
      const ctx = speedometerChart.value.getContext("2d");

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["", ""], // Los valores del gráfico
          datasets: [
            {
              label: "Speedometer",
              data: [70, 30], // 70% del velocímetro estará lleno, 30% vacío
              backgroundColor: ["#4CAF50", "#e4e4e4"], // Verde para lleno, gris para vacío
              borderWidth: 0,
              circumference: Math.PI,
              rotation: Math.PI,
            },
          ],
        },
        options: {
          responsive: true,
          cutout: "70%", // Controla el tamaño del centro vacío
          rotation: Math.PI, // Empieza desde abajo
          circumference: Math.PI, // Dibuja solo la mitad del círculo
          plugins: {
            legend: {
              display: false, // Ocultar la leyenda
            },
            tooltip: {
              enabled: false, // Desactivar los tooltips
            },
          },
          elements: {
            arc: {
              borderWidth: 0, // Eliminar los bordes de los segmentos
            },
          },
        },
      });
    });

    return {
      speedometerChart,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 300px;
}
</style>

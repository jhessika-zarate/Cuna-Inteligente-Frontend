<template>
  <div>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "VelocimetroChart",
  components: {
    Doughnut,
  },
  props: {
    humidityValue: {
      type: Number,
      required: true,
    },
    titulo: {
      type: String,
      required: false,
      default: "Humedad",
    },
  },
  data() {
    return {
      title: this.titulo,
      subtitle: "Último registro",
      extraOptions: { responsive: true },
      chartData: {
        datasets: [
          {
            label: ["titulo"],
            data: [this.humidityValue, 100 - this.humidityValue], // Humedad sobre 100
            backgroundColor: ["#d9b29c", "#e4e4e4"],
            borderWidth: 0,
          },
        ],
        labels: [this.titulo],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        circumference: 200, // Usar solo la mitad del círculo
        rotation: -100, // Girar para que comience desde la parte inferior
        cutout: "80%", // Ajustar el radio del círculo interno
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  },
};
</script>

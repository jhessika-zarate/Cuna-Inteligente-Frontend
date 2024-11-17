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
  data() {
    return {
      title: "Total Shipments",
      subtitle: "763,215",
      chartData: {
  datasets: [
  
    {
      label:['a', 'b'],

      data: [40, 20], // Mitad y mitad para depuración
      backgroundColor: ["#42b883", "#e4e4e4"],
      borderWidth: 0,
    },
  
  ],labels: [
        'Temperatura',
        
        
    ],
},


chartOptions: {
  responsive: true,
  maintainAspectRatio: false,
  circumference:200, // Usar solo la mitad del círculo
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

import { useBebeStore } from "@/stores/Publico/Bebe";

const config = {
  colors: {
    default: "#344675",
    primary: "#42b883",
    info: "#1d8cf8",
    danger: "#fd5d93",
    teal: "#00d6b4",
    primaryGradient: [
      "rgba(76, 211, 150, 0.1)",
      "rgba(53, 183, 125, 0)",
      "rgba(119,52,169,0)",
    ],
  },
};
const velocimetroData = {
  labels: ["Used", "Remaining"], // Etiquetas de los segmentos
  datasets: [
    {
      data: [80, 20], // Porcentaje de uso y restante
      backgroundColor: ["#42b883", "#eeeeee"], // Colores de cada segmento
      borderColor: ["#42b883", "#eeeeee"], // Colores de borde
      borderWidth: 2,
    },
  ],
};

export const chartData = {
  bigLineChart: {
    allData: [
      [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
      [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
    ],
    activeIndex: 0,
    chartData: {
      datasets: [
        {
          label: "Dataset 1", // Etiqueta para la serie de datos
          data: [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100], // Datos
          backgroundColor: "rgba(108,92,231,0.3)", // Color de fondo con opacidad
          borderColor: "#6c5ce7", // Color del borde (color primario)
          borderWidth: 2, // Ancho del borde
          fill: true, // Relleno del área debajo de la línea
        },
        {
          label: "Dataset 2",
          data: [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 0],
          backgroundColor: "rgba(52,152,219,0.3)", // Azul con opacidad
          borderColor: "#3498db", // Azul claro
          borderWidth: 2,
          fill: true,
        },
        {
          label: "Dataset 3",
          data: [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
          backgroundColor: "rgba(231,76,60,0.3)", // Rojo con opacidad
          borderColor: "#e84c3c", // Rojo
          borderWidth: 2,
          fill: true,
        },
      ],
      labels: [
        "chu",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
    },
    gradientColors: ["#d9b29c", "#d9b29c"], // Amarillo-oro
    gradientStops: [1, 0.6, 0],
    extraOptions: { responsive: true },
  },
  otherCharts: [
    {
      title: "Total Shipments",
      subtitle: "763,215",
      chartId: "purple-line-chart",
      component: "line-chart",
      chartData: {
        datasets: [
          {
            label: "Actividad en la noche", // Etiqueta para la serie de datos

            data: [0, 1, 0, 1, 1, 0],
            backgroundColor: "rgba(155,89,182,0.3)", // Morado claro con opacidad
            borderColor: "#9b59b6", // Morado
            borderWidth: 2,
            fill: true,
          },
        ],
        labels: ["8 pm","9 pm","9:30 pm", "10 pm", "11 pm", "12 pm", "2 am", "5am"],
      },
      gradientColors: ["#8e44ad", "#9b59b6"], // Gradiente morado
      gradientStops: [1, 0.5, 0],
      extraOptions: { responsive: true },
    },
    {
      title: "Daily Sales",
      subtitle: "3,500€",
      chartId: "blue-bar-chart",
      component: "bar-chart",
      chartData: {
        datasets: [
          {
            label: "MES PASADO", // Etiqueta para la serie de datos
            data: [53, 20],
            backgroundColor: "rgba(46,204,113,0.3)", // Verde claro con opacidad
            borderColor: "#2ecc71", // Verde
            borderWidth: 2,
            fill: true,
          },
          {
            label: "MES ACTUAL vs MES PASADO", // Etiqueta para la serie de datos
            data: [93, 10],
            backgroundColor: "#3498db", // Verde claro con opacidad
            borderColor: "#3498db", // Verde
            borderWidth: 2,
            fill: true,
          },
        ],
        labels: ["Peso", "Altura"],
      },
      gradientColors: ["#27ae60", "#2ecc71"], // Gradiente verde
      gradientStops: [1, 0.6, 0],
      extraOptions: { responsive: true },
    },
    {
      title: "Total Shipments",
      subtitle: "763,215",
      chartId: "purple-line-chart",
      component: "line-chart",
      chartData: {
        datasets: [
          {
            label: "Crecimiento altura", // Etiqueta para la serie de datos

            data: [60, 100, 120, 150, 150, 160],
            backgroundColor: "rgba(155,89,182,0.3)", // Morado claro con opacidad
            borderColor: "#9b59b6", // Morado
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Crecimiento altura", // Etiqueta para la serie de datos

            data: [60, 100, 120, 150, 150, 160],
            backgroundColor: "rgba(155,89,182,0.3)", // Morado claro con opacidad
            borderColor: "#9b59b6", // Morado
            borderWidth: 2,
            fill: true,
          },
        ],
        labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      },
      gradientColors: ["#8e44ad", "#9b59b6"], // Gradiente morado
      gradientStops: [1, 0.5, 0],
      extraOptions: { responsive: true },
    },
  ],
  velocimetro: {},
};

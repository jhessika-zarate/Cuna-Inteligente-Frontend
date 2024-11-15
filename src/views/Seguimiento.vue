<template>
    <div class="main-container">
      <sidebar />
      <div class="button-container">
        <!-- Tarjetas con botones grandes -->
        <div class="card" v-for="(option, index) in options" :key="index">
          <button class="card-button">
            <i :class="option.icon"></i>
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import sidebar from "@/components/sidebar.vue";
  
  export default {
    name: "App",
    components: {
      sidebar,
    },
    data() {
      return {
        options: [
          { label: "Desarrollo", icon: "fas fa-baby" },
          { label: "Crecimiento", icon: "fas fa-chart-line" },
          { label: "Alimento", icon: "fas fa-utensils" },
          { label: "Peso", icon: "fas fa-weight" },
          { label: "Sueño", icon: "fas fa-bed" },
          { label: "Llanto", icon: "fas fa-cry" },
        ],
      };
    },
  };
  </script>
  
<style scoped>
.main-container {
  background-image: url('/src/assets/Fondobb.png');
  min-height: 100vh;
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);  /* 3 filas para los 6 botones */
  gap: 20px;
  margin-top: 40px;
  width: 80%;
  max-width: 800px;
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

@media (max-width: 600px) {
  .button-container {
    grid-template-columns: repeat(2, 1fr);  /* 2 columnas */
    grid-template-rows: repeat(3, 1fr);  /* 3 filas */
  }
}
</style>
  
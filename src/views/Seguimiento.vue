<template>
  
    <div class="main-container">
      <sidebar />
      <div class="baby-info">

<div class="info-grid">
  <div class="info-card" style="background-image: url(/src/assets/5.png);">
    <font-awesome-icon :icon="['fas', 'weight-scale']"
      style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
    <p>Peso:</p>
  </div>
  <div class="info-card" style="background-image: url(/src/assets/5.png);">
    <font-awesome-icon :icon="['fas', 'ruler']" style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
    <p>Peso:</p>
  </div>
  <div class="info-card" style="background-image: url(/src/assets/5.png);">
    <font-awesome-icon :icon="['fas', 'baby']" style="height: 5rem;color: whitesmoke;margin: 0.5rem;" />
    <p>Peso:</p>
  </div>
  
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

.baby-info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;

}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  /* Ajusta el número de columnas automáticamente */
  gap: 20px;
  /* Espaciado entre tarjetas */
  margin-top: 20px;
}

.info-card {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 20px;
  align-items: center;
  justify-content: center;

  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.info-card:hover{
  transform: scale(1.05);
}

.info-card i {

  margin-bottom: 10px;
}

.info-card p {
  color: white;
  font-size: medium;
  font-weight: 600;
  font-family: Montserrat
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
  
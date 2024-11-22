<template>
    <div class="main-container">
      <!-- Sidebar -->
      <sidebar />
    
      <!-- Banner -->
      <div class="banner">
        <div class="banner-content">
          <h1>Registro de Llanto</h1>
          <p>Mantén un seguimiento del llanto de tu bebé para un mejor cuidado.</p>
        </div>
      </div>
    
      <!-- Encabezado -->
      <header>
        <h2>Lista de Registros de Llanto</h2>
      </header>
    
      <!-- Tabla de registros (Siempre visible) -->
      <section class="tabla-registros">
        <table class="tabla-llanto">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Duración (min)</th>
              <th>Razón</th>
            </tr>
          </thead>
          <tbody>
            <!-- Si hay datos, los muestra aquí -->
            <tr v-if="llantos.length === 0">
              <td colspan="3" class="no-data">No hay registros de llanto aún.</td>
            </tr>
            <tr v-for="llanto in llantos" :key="llanto.idLlanto">
              <td>{{ llanto.fechaHora }}</td>
              <td>{{ llanto.duracion }}</td>
              <td>{{ llanto.razon }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
  import sidebar from '@/components/sidebar.vue';
  
  export default {
    name: 'Llanto',
    components: {
      sidebar,
    },
    data() {
      return {
        llantos: [], // Datos de llanto
      };
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
      this.cargarLlantos(); // Cargar los datos cuando el componente se monta
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
  
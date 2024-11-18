<template>
    <div class="main-container">
      <div class="consejos-grid">
        <div class="consejo-card" v-for="(consejo, index) in consejos" :key="index">
          <img :src="consejo.imagen" alt="Imagen del consejo" class="consejo-imagen" />
          <h2>{{ consejo.titulo }}</h2>
          <p>{{ consejo.resumen }}</p>
          <button @click="abrirModal(index)">Expandir</button>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="modalVisible" class="modal-overlay" @click="cerrarModal">
        <div class="modal-content" @click.stop>
          <img :src="consejos[consejoActivo].imagen" alt="Imagen del consejo" class="modal-imagen" />
          <h2>{{ consejos[consejoActivo].titulo }}</h2>
          <p>{{ consejos[consejoActivo].detalle }}</p>
          <button @click="cerrarModal">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Consejos",
    data() {
      return {
        consejos: [
          {
            titulo: "Alimentación",
            resumen: "Consulta con el pediatra sobre alimentos adecuados.",
            detalle:
              "Es importante mantener una rutina de alimentación para garantizar que el bebé reciba todos los nutrientes necesarios. Consulta regularmente con el pediatra para adaptar la dieta según la etapa de desarrollo.",
            imagen: "/src/assets/banner.png", // Ruta de la imagen
          },
          {
            titulo: "Sueño",
            resumen: "Asegura un ambiente cómodo para dormir.",
            detalle:
              "Crea una rutina de sueño establecida. Evita el uso de almohadas o juguetes dentro de la cuna para minimizar riesgos.",
            imagen: "/src/assets/banner.png",
          },
          {
            titulo: "Higiene",
            resumen: "Mantén la piel del bebé limpia y seca.",
            detalle:
              "Limpia cuidadosamente la piel del bebé durante el cambio de pañal. Usa productos adecuados para evitar irritaciones.",
            imagen: "/src/assets/banner.png",
          },
          // Agrega más consejos con sus respectivas imágenes
        ],
        modalVisible: false,
        consejoActivo: null,
      };
    },
    methods: {
      abrirModal(index) {
        this.consejoActivo = index;
        this.modalVisible = true;
      },
      cerrarModal() {
        this.modalVisible = false;
        this.consejoActivo = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .main-container {
    background-image: url("/src/assets/Fondobb.png");
    background-repeat: repeat;
    min-height: 100vh;
    padding: 2rem;
  }
  
  .consejos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .consejo-card {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow: hidden;
  }
  
  .consejo-card h2 {
    font-size: 1.25rem;
    margin: 1rem 0 0.5rem;
    color: var(--primary-color);
  }
  
  .consejo-card p {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 1rem;
  }
  
  .consejo-card button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
  }
  
  .consejo-card button:hover {
    background-color: white;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }
  
  .consejo-imagen {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  
  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 800px; /* Aumento del tamaño */
    width: 90%;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .modal-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
  
  .modal-content p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
  
  .modal-content button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .modal-content button:hover {
    background-color: var(--primary-color-dark);
  }
  
  .modal-imagen {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  </style>
  
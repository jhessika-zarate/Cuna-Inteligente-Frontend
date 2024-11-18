<template>
  <div class="main-container">
    <!-- Banner y título -->
    <div class="banner">
      <div class="banner-content">
        <h1>Consejos para Mamás Primerizas</h1>
        <p>Encuentra información útil para cuidar y criar a tu bebé con amor y seguridad.</p>
      </div>
    </div>

    <!-- Sección de consejos -->
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
          imagen: "/src/assets/alimentacion.jpg",
        },
        {
          titulo: "Sueño",
          resumen: "Asegura un ambiente cómodo para dormir.",
          detalle:
            "Crea una rutina de sueño establecida. Evita el uso de almohadas o juguetes dentro de la cuna para minimizar riesgos.",
          imagen: "/src/assets/sueño.jpg",
        },
        {
          titulo: "Higiene",
          resumen: "Mantén la piel del bebé limpia y seca.",
          detalle:
            "Limpia cuidadosamente la piel del bebé durante el cambio de pañal. Usa productos adecuados para evitar irritaciones.",
          imagen: "/src/assets/higiene.jpg",
        },
        {
          titulo: "Paseos y aire fresco",
          resumen: "Beneficia su desarrollo físico y emocional.",
          detalle:
            "Salir al aire libre ayuda a regular el ritmo circadiano y estimula el desarrollo cognitivo del bebé.",
          imagen: "/src/assets/airelibre.jpg",
        },
        {
          titulo: "Lactancia",
          resumen: "La lactancia exclusiva es recomendada hasta los 6 meses.",
          detalle:
            "La leche materna proporciona todos los nutrientes esenciales para el desarrollo del bebé. También refuerza el vínculo emocional.",
          imagen: "/src/assets/lactancia.jpg",
        },
        {
          titulo: "Cuidado de la salud",
          resumen: "Mantén un seguimiento médico constante.",
          detalle:
            "Lleva al bebé a sus chequeos regulares y asegúrate de que reciba sus vacunas a tiempo.",
          imagen: "/src/assets/salud.jpg",
        },
        {
          titulo: "Estimulación temprana",
          resumen: "Juegos y actividades para el desarrollo.",
          detalle:
            "Interactúa con tu bebé mediante sonidos, colores y movimientos. Esto favorece sus habilidades sensoriales y motoras.",
          imagen: "/src/assets/estimulacion.jpg",
        },
        {
          titulo: "Relación con otros",
          resumen: "Socialización desde temprana edad.",
          detalle:
            "Permite que tu bebé interactúe con familiares y otros niños para fomentar sus habilidades sociales.",
          imagen: "/src/assets/relaciones.jpg",
        },
        {
          titulo: "Cuidado postparto para la mamá",
          resumen: "Prioriza también tu bienestar.",
          detalle:
            "Descansa, hidrátate y mantén una dieta balanceada. Cuidar de ti misma es crucial para cuidar a tu bebé.",
          imagen: "/src/assets/postparto.jpg",
        },
        {
          titulo: "Seguridad en casa",
          resumen: "Haz tu hogar seguro para tu bebé.",
          detalle:
            "Coloca protectores en enchufes, asegúrate de que los muebles sean estables y evita objetos pequeños al alcance del bebé.",
          imagen: "/src/assets/seguridad.jpg",
        },
        {
          titulo: "Ergonomía al cargar al bebé",
          resumen: "Cuidar tu postura es importante.",
          detalle:
            "Usa portabebés ergonómicos para distribuir el peso del bebé de forma adecuada y evitar molestias en la espalda.",
          imagen: "/src/assets/ergonomia.jpg",
        },
        {
          titulo: "Llantos y consuelo",
          resumen: "Aprende a interpretar sus necesidades.",
          detalle:
            "El llanto es la principal forma de comunicación del bebé. Puede significar hambre, sueño o incomodidad.",
          imagen: "/src/assets/llanto.jpg",
        },
        {
          titulo: "Desarrollo emocional",
          resumen: "Fortalece el vínculo afectivo.",
          detalle:
            "Abraza, acaricia y habla con tu bebé constantemente para fortalecer la conexión emocional.",
          imagen: "/src/assets/emociones.jpg",
        },
        {
          titulo: "Introducción a sólidos",
          resumen: "Empieza gradualmente a partir de los 6 meses.",
          detalle:
            "Introduce alimentos sólidos como purés y cereales siguiendo las recomendaciones de tu pediatra.",
          imagen: "/src/assets/solidos.jpg",
        },
        {
          titulo: "Hora del baño",
          resumen: "Haz que el baño sea un momento relajante.",
          detalle:
            "Usa agua tibia y productos especiales para bebés. Supervisa siempre al bebé mientras esté en el agua.",
          imagen: "/src/assets/ducha.jpg",
        },
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
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s; /* Suavizar cambios */
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
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: opacity 0.3s ease, visibility 0.3s ease;
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
  .modal-content button {
  background-color: var(--primary-color);
  color: white; 
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s; 
}

.modal-content button:hover {
  background-color: white; 
  color: var(--primary-color); 
  border: 1px solid var(--primary-color); 
}
.consejo-card:hover {
  transform: translateY(-10px); /* Eleva la tarjeta ligeramente */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
  background-color: rgba(245, 245, 245, 0.95); /* Cambio leve en el color de fondo */
}

.modal-overlay[style*="display: flex"] {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}
.banner {
  background-image: url("/src/assets/banner.png"); /* Cambia por tu imagen de fondo */
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


</style>
  
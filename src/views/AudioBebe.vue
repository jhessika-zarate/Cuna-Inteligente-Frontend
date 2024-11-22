<template>
 
  
    <div class="main-container">
      <sidebar />
      <div>
        <div class="controles">
          <!-- Contenedor de ondas -->
          <div class="wave-container" v-if="isRecording">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
          <h1 style="font-weight: 600;">Grabación de Audio</h1>
          <h3>Presiona al oso <br>y acerca tu dispositivo a tu bebe<br> te ayudaremos a detectar <br>el motivo del llanto</h3>
          <!-- Imagen del oso -->
          <img 
            class="logo" 
            src="@/assets/Teddy.png" 
            alt="Iniciar/Detener Grabación" 
            @click="toggleRecording" 
          />
          
          <p v-if="isRecording">Grabando...</p>
          <audio v-if="audioURL" :src="audioURL" controls></audio>
          <button class="botoncito" v-if="audioURL" @click="uploadAudio">Detectar </button>
        </div>
      </div>
       <!-- Modal -->
       <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Motivo del llanto detectado</h2>
        <img v-if="razonllanto" :src="getImageForReason(razonllanto)" alt="Motivo" />
        <p v-if="razonllanto">{{ razonllanto }}</p>
        <button class="botoncito" @click="closeModal">Cerrar</button>
      </div>
    </div>
  
    </div>
    
 
</template>



<script>
import sidebar from "@/components/sidebar.vue";
import { useBebeStore } from "@/stores/Publico/Bebe";
import Cookies from "js-cookie";
export default {
  components: {
    sidebar,
  },
  data() {
    return {
      isRecording: false,
      audioURL: null,
      showModal: false, 
      mediaRecorder: null,
      razonllanto: null,
      audioChunks: [],
      ngrokUrl: "https://jhessika.serverbb.online", // Cambia esto a la URL de tu máquina virtual
    };
  },
  methods: {
    async toggleRecording() {
      if (this.isRecording) {
        this.stopRecording(); // Detener grabación
      } else {
        await this.startRecording(); // Iniciar grabación
      }
    },
    // Método para iniciar la grabación
    // Método para iniciar la grabación
    async startRecording() {
      try {
        console.log("Iniciando grabación...");
        if (
          !navigator.mediaDevices ||
          !MediaRecorder.isTypeSupported("audio/webm")
        ) {
          alert("El navegador no soporta grabación de audio");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        console.log("Micrófono accedido con éxito.");

        // Verificar tipo MIME soportado y configurar MediaRecorder
        const mimeType = MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";
        this.mediaRecorder = new MediaRecorder(stream, { mimeType });

        this.audioChunks = []; // Reinicia los datos del audio
        this.mediaRecorder.ondataavailable = (e) => {
          console.log("Datos de audio disponibles:", e.data);
          this.audioChunks.push(e.data); // Agrega los datos grabados al array
        };

        this.mediaRecorder.onstop = () => {
          console.log("Grabación detenida.");
          if (this.audioChunks.length > 0) {
            const blob = new Blob(this.audioChunks, { type: mimeType });
            this.audioURL = URL.createObjectURL(blob); // Crea una URL para reproducir el audio
            console.log("Audio creado con éxito. URL:", this.audioURL);
          } else {
            console.warn("No hay datos de audio.");
          }
        };

        this.mediaRecorder.start(); // Inicia la grabación
        console.log("Grabación en curso...");
        this.isRecording = true; // Cambia el estado para deshabilitar el botón
      } catch (error) {
        console.error("Error al iniciar la grabación:", error);
        alert("No se pudo acceder al micrófono. Verifica los permisos.");
      }
    },
    // Método para detener la grabación
    stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
        console.log("Deteniendo grabación...");
        this.mediaRecorder.stop(); // Detiene la grabación
        this.isRecording = false; // Cambia el estado para habilitar el botón
      } else {
        console.warn("No hay una grabación activa.");
      }
    },

    // Método para subir el audio al servidor
    // Método para subir el audio al servidor
    // Método para subir el audio al servidor
    async uploadAudio() {
      try {
        if (!this.audioChunks || this.audioChunks.length === 0) {
          console.error("No hay datos de audio para subir.");
          alert("No se grabó ningún audio.");
          return;
        }

        const blob = new Blob(this.audioChunks, { type: "audio/webm" });
        const simulatedResponse = "Hungry"; // Cambiar según las pruebas
        this.razonllanto = simulatedResponse;
        this.openModal();
        if (!blob || blob.size === 0) {
          console.error("El archivo de audio está vacío.");
          alert("El archivo de audio está vacío.");
          return;
        }

        console.log("Subiendo audio al servidor...");
        const formData = new FormData();
        formData.append("audio", blob, "recording.webm");

        const response = await fetch(
          "https://jhessika.serverbb.online/upload-audio",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          alert("Error en el servidor: " + errorText);
          
          return;
        }

        const result = await response.json();
        console.log("Resultado del servidor:", result);
        alert("Audio subido correctamente: " + JSON.stringify(result));
        
        this.audioURL = null;
        this.audioChunks = [];
      } catch (error) {
        console.error("Error al subir el audio:", error);
        alert("Hubo un problema al subir el audio. Verifica el servidor.");
      }
    },
    openModal() {
      this.showModal = true; // Mostrar el modal
    },
    closeModal() {
      this.showModal = false; // Ocultar el modal
    },
    getImageForReason(razonllanto) {
      const images = {
        "Belly pain": "@/assets/belly-pain.jpeg",
        Discomfort: "@/assets/discomfort.jpeg",
        Hungry: "/assets/hungry.jpeg",
        Tired: "@/assets/tired.jpeg",
      };
      return images[razonllanto] || "@/assets/default.png";
    },
  },
};
</script>
<style>
.main-container {
  background-image: url("/src//assets/fondoaudio.png");
  min-height: 100vh;
  background-repeat: repeat;
  
  background-size: auto;
  
}

.logo {
  width: 30rem;
  height: 30rem;
  z-index: 500;
  margin-left: 10px
 
}
.controles{
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 500;
  transform: translate(-50%, -50%);
}
.wave-container {
  position: absolute;
  width: 250px;
  height: 250px;
  top: 45%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  margin-bottom: 20px;
}

.wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 20px solid var(--primary-color); /* Color de la onda */
  border-radius: 50%;
  animation: ripple 1.5s infinite;
}

.wave:nth-child(2) {
  animation-delay: 0.5s;
}

.wave:nth-child(3) {
  animation-delay: 1s;
}

@keyframes ripple {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
.modal-overlay h1{
  color: black
}
h1,h2,h3,p{
  font-family: Montserrat;
  color: white
}
.botoncito{
  font-family: Montserrat;
  margin: 10px;
  background-color: var(--primary-color);
  padding: 10px;
  font-size: larger;
  border-radius: 8%;
  font-weight: 700;
  z-index: 500;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
 
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  max-width: 500px;
  text-align: center;
}

.modal-content h2 {
  font-size: 34px;
  color: black;
  
  margin-bottom: 10px;
  font-weight: 800
}

.modal-content p {
  margin-bottom: 20px;
  color: black;
  
  font-size: 26px;
  font-weight: 500;
}
</style>

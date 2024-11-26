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
        <h1 style="font-weight: 600">Grabación de Audio</h1>
        <h3>
          Presiona al oso <br />y acerca tu dispositivo a tu bebe<br />
          te ayudaremos a detectar <br />el motivo del llanto
        </h3>
        <!-- Imagen del oso -->
        <img
          class="logo"
          src="@/assets/Teddy.png"
          alt="Iniciar/Detener Grabación"
          @click="toggleRecording"
        />

        <p v-if="isRecording">Grabando...</p>
        <audio v-if="audioURL" :src="audioURL" controls></audio>
        <button class="botoncito" v-if="audioURL" @click="uploadAudio">
          Detectar
        </button>
      </div>
    </div>

    <!-- Modal de motivo del llanto -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Motivo del llanto detectado</h2>
        <img
          v-if="razonllanto"
          :src="getImageForReason(razonllanto)"
          alt="Motivo"
          class="imgoso"
        />
        <p v-if="razonllanto">{{ razonllanto }}</p>
        <button class="botoncito" @click="openSpectrogramModal">
          Ver espectrograma
        </button>
        <button class="botoncito" @click="closeModal">Cerrar</button>
      </div>
    </div>

    <!-- Modal del espectrograma -->
    <div
      v-if="showSpectrogramModal"
      class="modal-overlay"
      @click.self="closeSpectrogramModal"
    >
      <div class="modal-content">
        <h2>Espectrograma Mel</h2>
        <span
          >Un espectrograma mel es una variante del espectrograma que se utiliza
          comúnmente en el procesamiento del habla y en tareas de aprendizaje
          automático.</span
        >
        <img
          v-if="spectrogramImage"
          :src="spectrogramImage"
          alt="Espectrograma"
          class="spectrogram-img"
        />
        <button class="botoncito" @click="closeSpectrogramModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import { useBebeStore } from "@/stores/Publico/Bebe";
import Cookies from "js-cookie";
import bellyPainImg from "@/assets/belly-pain.jpeg";
import discomfortImg from "@/assets/discomfort.jpeg";
import hungryImg from "@/assets/hungry.jpeg";
import tiredImg from "@/assets/tired.jpeg";
import RegistroLlanto from "./RegistroLlanto.vue";

export default {
  components: {
    sidebar,
  },
  setup() {
    const useBebeStoreAdmi = useBebeStore();
    return { useBebeStoreAdmi };
  },
  data() {
    return {
      RegistroLlanto: {
        razon: "",
        fecha: "2025-11-22T04:03:08.339+00:00",
        idBebe: {
          idBebe: 0,
        },
      },
      IDbebe: "",
      isRecording: false,
      audioURL: null,
      showModal: false,
      showSpectrogramModal: false, // Estado para mostrar el modal del espectrograma
      mediaRecorder: null,
      razonllanto: null,
      audioChunks: [],
      spectrogramImage: null, // Imagen del espectrograma
      ngrokUrl: "https://jhessika.serverbb.online",
    };
  },
  async beforeCreate() {
    if (!Cookies.get("idUser")) {
      this.$router.push("/login");
    } else {
      console.log("idUser", Cookies.get("idUser"));
      const idBebeSeleccionado =
        await this.useBebeStoreAdmi.getBebeSeleccionado();
      this.IDbebe = idBebeSeleccionado.idBebe;
      console.log("idBebeSeleccionado", idBebeSeleccionado);
      this.nombreBebe = idBebeSeleccionado.nombre;
    }
  },
  methods: {
    async toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        await this.startRecording();
      }
    },
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

        const mimeType = MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";
        this.mediaRecorder = new MediaRecorder(stream, { mimeType });

        this.audioChunks = [];
        this.mediaRecorder.ondataavailable = (e) => {
          this.audioChunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
          if (this.audioChunks.length > 0) {
            const blob = new Blob(this.audioChunks, { type: mimeType });
            this.audioURL = URL.createObjectURL(blob);
          } else {
            console.warn("No hay datos de audio.");
          }
        };

        this.mediaRecorder.start();
        this.isRecording = true;
      } catch (error) {
        console.error("Error al iniciar la grabación:", error);
        alert("No se pudo acceder al micrófono. Verifica los permisos.");
      }
    },

    stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
        this.isRecording = false;
      } else {
        console.warn("No hay una grabación activa.");
      }
    },

    async uploadAudio() {
      this.audioURL = null;
      try {
        if (!this.audioChunks || this.audioChunks.length === 0) {
          alert("No se grabó ningún audio.");
          return;
        }

        const blob = new Blob(this.audioChunks, { type: "audio/webm" });

        if (!blob || blob.size === 0) {
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
        this.razonllanto = result.prediction;
        console.log("Razón del llanto:", this.razonllanto);
        this.openModal();

        const responseImagen = await fetch(
          "https://jhessika.serverbb.online/get-spectrogram",
          {
            method: "GET", // Cambié a "GET"
          }
        );

        if (!responseImagen.ok) {
          const errorText = await responseImagen.text();
          alert("Error en el servidor: " + errorText);
          return;
        }
        // Simulando la respuesta del espectrograma
        this.spectrogramImage = URL.createObjectURL(
          await responseImagen.blob()
        );
        this.registraLlanto(this.razonllanto);
      } catch (error) {
        console.error("Error al subir el audio:", error);
        alert("Hubo un problema al subir el audio.");
      }
    },

    async registraLlanto(dato) {
      if (!this.razonllanto) {
        alert("No se ha detectado un motivo de llanto.");
        return;
      }
      try {
        this.RegistroLlanto.razon = dato;
        this.RegistroLlanto.fecha = new Date().toISOString();
        const response = await this.useBebeStoreAdmi.postLlanto(
          this.IDbebe,
          this.RegistroLlanto
        );
        console.log("Registro de llanto:", response);
      } catch (error) {
        console.error("Error al registrar el llanto:", error);
        alert("Hubo un problema al registrar el llanto.");
      }

      console.log("Registro de llanto:", response);
    },

    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    openSpectrogramModal() {
      this.showSpectrogramModal = true;
    },

    closeSpectrogramModal() {
      this.showSpectrogramModal = false;
    },

    getImageForReason(razonllanto) {
      const images = {
        "Belly pain": bellyPainImg,
        Discomfort: discomfortImg,
        Hungry: hungryImg,
        Tired: tiredImg,
      };
      return images[razonllanto];
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
  margin-left: 10px;
}

.controles {
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
.imgoso {
  width: 150px;
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
  border: 20px solid var(--primary-color);
  /* Color de la onda */
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

.modal-overlay h1 {
  color: black;
}

h1,
h2,
h3,
p {
  font-family: Montserrat;
  color: white;
}

.botoncito {
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
  font-weight: 800;
}

.modal-content p {
  margin-bottom: 20px;
  color: black;

  font-size: 26px;
  font-weight: 500;
}

.spectrogram-img {
  width: 100%;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

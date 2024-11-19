<template>
  <div>
    <h2>Grabación de Audio</h2>
    <p v-if="isRecording">Grabando...</p>

    <button @click="startRecording" :disabled="isRecording">
      Iniciar Grabación
    </button>
    <button @click="stopRecording" :disabled="!isRecording">
      Detener Grabación
    </button>
    <audio v-if="audioURL" :src="audioURL" controls></audio>
    <button v-if="audioURL" @click="uploadAudio">Subir Audio</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRecording: false,
      audioURL: null,
      mediaRecorder: null,
      audioChunks: [],
      ngrokUrl: "https://jhessika-to-do.serverbb.online", // Cambia esto a la URL de tu máquina virtual
    };
  },
  methods: {
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
    async uploadAudio() {
      try {
        // Verifica si hay datos de audio antes de proceder
        if (!this.audioChunks || this.audioChunks.length === 0) {
          console.error("No hay datos de audio para subir.");
          alert("No se grabó ningún audio.");
          return;
        }

        const blob = new Blob(this.audioChunks, { type: "audio/webm" });

        // Verifica que el archivo sea válido
        if (!blob || blob.size === 0) {
          console.error("El archivo de audio está vacío.");
          alert("El archivo de audio está vacío.");
          return;
        }

        console.log("Subiendo audio al servidor...");
        const formData = new FormData();
        formData.append("audio", blob, "recording.webm");

        const response = await fetch(`${this.ngrokUrl}/upload-audio`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          alert("Error en el servidor: " + errorText);
        }

        const result = await response.json();
        console.log("Resultado del servidor:", result);
        alert("Audio subido correctamente: " + JSON.stringify(result));

        // Limpia la URL del audio después de subirlo
        this.audioURL = null;
        this.audioChunks = [];
      } catch (error) {
        console.error("Error al subir el audio:", error);
        alert("Hubo un problema al subir el audio. Verifica el servidor.");
      }
    },
  },
};
</script>

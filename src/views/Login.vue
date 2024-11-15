<template>
    <div class="main-container">
      <div class="progress-bar">
        <div
          class="progress"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>
      </div>
      <div class="form-container">
        <h2 class="step-title">{{ stepTitles[currentStep - 1] }}</h2>
        <div class="contenedorpreguntas">
          <!-- Formulario de preguntas -->
          <form @submit.prevent="nextStep">
            <div
              v-for="(question, index) in currentQuestions"
              :key="index"
              class="question"
            >
              <label :for="`question-${index}`">{{ question.label }}</label>
              <!-- Campo de entrada condicional -->
              <template v-if="question.type === 'text'">
                <input
                  :id="`question-${index}`"
                  type="text"
                  v-model="answers[question.id]"
                  required
                />
              </template>
              <template v-else-if="question.type === 'date'">
                <input
                  :id="`question-${index}`"
                  type="date"
                  v-model="answers[question.id]"
                  required
                />
              </template>
              <template v-else-if="question.type === 'select'">
                <select
                  :id="`question-${index}`"
                  v-model="answers[question.id]"
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option
                    v-for="option in question.options"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </template>
            </div>
            <!-- Botones de navegación -->
            <div class="navigation-buttons">
              <button
                type="button"
                class="blob-btn"
                @click="prevStep"
                v-if="currentStep > 1"
              >
                Anterior
                <span class="blob-btn__inner">
                  <span class="blob-btn__blobs">
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                  </span>
                </span>
              </button>
              <button type="submit" class="blob-btn">
                {{ currentStep === totalSteps ? "Enviar" : "Siguiente" }}
                <span class="blob-btn__inner">
                  <span class="blob-btn__blobs">
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useBebeStore } from "@/stores/Publico/Bebe";
  import { useUsusrioStore } from "@/stores/Publico/Usuario";
  import { mapActions } from "pinia";
  import { useAuthStore } from "@/stores/Privado/authStore";
  export default {
    setup() {
      const { login } = useAuthStore();
      return { login };
    },
    data() {
      return {
        usuario: {
          idUsuario: null,
          username: null,
          gmail: null,
          contrasenia: null,
        },
        bebe: {
          idBebe: null,
          nombre: null,
          apellidopaterno: null,
          apellidomaterno: null,
          fechadenacimiento: null,
          color: null,
          idUsuario: {
            idUsuario: null,
          },
        },
        currentStep: 1,
        answers: {},
        questions: [
          { id: 1, label: "Correo Electrónico", type: "text" },
          { id: 2, label: "Contraseña", type: "text" },
          ],
        questionsPerStep: 3,
        stepTitles: [
          "Inicio de sesión",
        ],
      };
    },
    computed: {
      totalSteps() {
        return Math.ceil(this.questions.length / this.questionsPerStep);
      },
      currentQuestions() {
        const start = (this.currentStep - 1) * this.questionsPerStep;
        return this.questions.slice(start, start + this.questionsPerStep);
      },
    },
    methods: {
      ...mapActions(useBebeStore, ["postBebe"]),
      ...mapActions(useUsusrioStore, ["postUsuario"]),
      ...mapActions(useAuthStore, ["login"]),
  
      nextStep() {
        if (this.currentStep < this.totalSteps) {
          this.currentStep++;
        } else {
          this.submitForm();
        }
      },
      prevStep() {
        if (this.currentStep > 1) {
          this.currentStep--;
        }
      },
      async doLogin(datoGmail, datoContrasenia) {
        try {
          const credentials = {
            gmail: datoGmail,
            contrasenia: datoContrasenia,
          };
          alert("consulta", credentials);
          console.log("consulta", credentials);
          const response = await this.login(credentials);
          alert("perfecto", response);
          if (response) {
            if (
              response.response.type === 1 &&
              response.response.authToken !== null
            ) {

              alert("perfecto");this.$router.push("/Home");
            } else {
              alert("usuarii adentro o contrasenia incorrectos");
              throw new Error("Usuario o contraseña incorrectos");
            }
          } else {
            alert("usuarii o contrasenia incorrectos");
            throw new Error("Usuario o contraseña incorrectos");
          }
        } catch (error) {
          alert("usuarii o contrasenia incorrectos afuera adfuera");
        }
      },
      async submitForm() {
        try {
          this.usuario.gmail = this.answers[1];
          this.usuario.contrasenia = this.answers[2];
  
          this.doLogin(this.usuario.gmail, this.usuario.contrasenia);
  
        } catch (error) {
          console.error("Error al enviar las credenciales:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
  .contenedorpreguntas {
    max-width: 800px; /* Limita el ancho del formulario */
    width: 100%;
  }
  .main-container {
    background-image: url("/src//assets/Fondobb.png");
    min-height: 100vh;
    background-repeat: repeat;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centrado horizontalmente */
    align-items: center; /* Alineación horizontal */
    width: 100%;
    padding: 0 2rem; /* Margen en dispositivos pequeños */
    box-sizing: border-box;
  }
  .progress-bar {
    height: 20px;
    width: 100vw;
    background-color: #e0e0e0;
    margin-bottom: 1rem;
    border-radius: 5px;
    overflow: hidden;
  }
  .progress {
    width: 100%;
    height: 100%;
    background-color: #72b4c2;
    transition: width 0.3s ease;
  }
  .step-title {
    text-align: left;
    font-size: x-large;
    font-weight: 800;
    font-family: Montserrat;
    margin-bottom: 3vh;
    font-style: italic;
  }
  .question {
    display: flex;
    flex-direction: column;
    color: rgb(56, 56, 56);
    margin-bottom: 1.5rem; /* Espacio entre preguntas */
  }
  
  .question label {
    font-weight: bold;
    margin-bottom: 0.5rem; /* Espacio entre el label y el input */
    font-size: medium;
    font-family: Montserrat;
  }
  
  .question input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 15px;
    font-family: Montserrat;
  }
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .blob-btn {
    position: relative;
    padding: 15px 40px;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    background-color: #72b4c2;
    border-color: #31545c;
    cursor: pointer;
    outline: none;
    border-radius: 30px;
    transition: color 0.5s;
  }
  
  .blob-btn__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 30px;
    background: #ffffff;
    z-index: -1;
  }
  
  .blob-btn__blobs {
    position: relative;
    height: 100%;
    filter: url("#goo");
  }
  
  .blob-btn__blob {
    position: absolute;
    top: 2px;
    width: 25%;
    height: 100%;
    background: #0505a9;
    border-radius: 100%;
    transform: translate3d(0, 150%, 0) scale(1.4);
    transition: transform 0.45s;
  }
  
  .blob-btn:hover {
    color: #ffffff;
  }
  
  .blob-btn:hover .blob-btn__blob {
    transform: translate3d(0, 0, 0) scale(1.4);
  }
  
  .blob-btn__blob:nth-child(1) {
    left: 0;
    transition-delay: 0s;
  }
  .blob-btn__blob:nth-child(2) {
    left: 25%;
    transition-delay: 0.08s;
  }
  .blob-btn__blob:nth-child(3) {
    left: 50%;
    transition-delay: 0.16s;
  }
  .blob-btn__blob:nth-child(4) {
    left: 75%;
    transition-delay: 0.24s;
  }
  </style>
  
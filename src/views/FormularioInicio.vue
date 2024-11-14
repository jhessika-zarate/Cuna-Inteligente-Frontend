<template>
    <div class="form-container">
      <!-- Barra de progreso -->
      <div class="progress-bar">
        <div
          class="progress"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>
      </div>
  
      <!-- Título de la página de preguntas -->
      <h2 class="step-title">{{ stepTitles[currentStep - 1] }}</h2>
      <div class="contenedorpreguntas">
        <!-- Formulario de preguntas -->
        <form @submit.prevent="nextStep">
          <div v-for="(question, index) in currentQuestions" :key="index" class="question">
            <label :for="`question-${index}`">{{ question.label }}</label>
            <input
              :id="`question-${index}`"
              type="text"
              v-model="answers[question.id]"
              required
            />
          </div>
          
          <!-- Botones de navegación -->
          <div class="navigation-buttons">
            <button type="button" class="blob-btn" @click="prevStep" v-if="currentStep > 1">
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
  
    <!-- SVG necesario para el efecto blob -->
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
          <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
        </filter>
      </defs>
    </svg>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentStep: 1,
        answers: {}, 
        questions: [
          { id: 1, label: "Nombre" },
          { id: 2, label: "Relación" },
          { id: 3, label: "Pregunta 3" },
          { id: 4, label: "Pregunta 4" },
          { id: 5, label: "Pregunta 5" },
          { id: 6, label: "Pregunta 6" },
          { id: 7, label: "Pregunta 7" },
          { id: 8, label: "Pregunta 8" },
          { id: 9, label: "Pregunta 9" },
        ],
        questionsPerStep: 3,
        stepTitles: [
          "Sobre ti",
          "Sección 2: Detalles adicionales",
          "Sección 3: Información final"
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
      submitForm() {
        console.log("Formulario enviado:", this.answers);
        alert("Formulario completado. ¡Gracias!");
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  
  .form-container {
    max-width: 400px;
    margin: auto;
  }
  .progress-bar {
    height: 10px;
    width: 100%;
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
    font-size: xx-large;
    font-weight: 800;
    font-family: Montserrat;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .question {
    margin-bottom: 1rem;
    font-family: Montserrat;
    font-size: medium;
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
    color: #0505A9;
    font-size: 16px;
    font-weight: bold;
    background-color: transparent;
    border: none;
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
    filter: url('#goo');
  }
  
  .blob-btn__blob {
    position: absolute;
    top: 2px;
    width: 25%;
    height: 100%;
    background: #0505A9;
    border-radius: 100%;
    transform: translate3d(0, 150%, 0) scale(1.4);
    transition: transform 0.45s;
  }
  
  .blob-btn:hover {
    color: #FFFFFF;
  }
  
  .blob-btn:hover .blob-btn__blob {
    transform: translate3d(0, 0, 0) scale(1.4);
  }
  
  .blob-btn__blob:nth-child(1) { left: 0; transition-delay: 0s; }
  .blob-btn__blob:nth-child(2) { left: 25%; transition-delay: 0.08s; }
  .blob-btn__blob:nth-child(3) { left: 50%; transition-delay: 0.16s; }
  .blob-btn__blob:nth-child(4) { left: 75%; transition-delay: 0.24s; }
  </style>
  
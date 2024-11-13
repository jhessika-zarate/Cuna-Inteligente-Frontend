<template>
    <div class="container">
      <input type="checkbox" id="check">
      <div class="sidebar">
        <a href="#" @click="redirectToHumedad">
          <i class="fas fa-water"></i>
          <span>Niveles de Humedad</span>
        </a>
        <a href="#" @click="redirectToTemperatura">
          <i class="fas fa-thermometer-half"></i>
          <span>Control de Temperatura</span>
        </a>
        <a href="#" @click="redirectToDeteccionSonido">
          <i class="fas fa-microphone-alt"></i>
          <span>Detección de Sonido</span>
        </a>
        <a href="#" @click="redirectToHistorial">
          <i class="fas fa-history"></i>
          <span>Historial de Actividades</span>
        </a>
        <a @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Salir</span>
        </a>
      </div>
    </div>
  </template>
  <script>
  
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  
  :root {
    --accent-color: #fff;
    --gradient-color: #FBFBFB;
  }
  
  .container {
    display: flex;
    flex-direction: column-reverse; /* Reordena los elementos, colocando el sidebar al final */
    align-items: center;
  
    z-index: 10000000;
  }
  
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(-45deg, #e3eefe 0%, #efddfb 100%);
  }
  
  .sidebar {
    z-index: 9999;
    flex-direction: column-reverse; 
    position: fixed;
    bottom: 0; /* Alinea el sidebar en la parte inferior */
    width: 100%;
    background: linear-gradient(#f3eac9,#f3eac9);
    border-top: 1px solid #ccc; /* Agrega una línea superior para separar el sidebar del contenido */
    padding-bottom: 2px;
    padding-top: 2px; /* Añade espacio superior para el contenido del sidebar */
  }
  
  .sidebar header {
    font-size: 28px;
    color: #353535;
    line-height: 70px;
    text-align: center;
    background-color: #fff;
    user-select: none;
    font-family: 'Lato', sans-serif;
  }
  
  
  .sidebar a {
    height: 65px;
    width: 100%;
    color: #dbdbdb;
    line-height: 65px;
    padding: 3%;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    transition: all .5s ease;
  }
  
  a.active, a:hover {
    color: #000000;
    margin-bottom: -5px;
    border-bottom: 5px solid var(--accent-color);
    background: linear-gradient(to left, var(--accent-color), var(--gradient-color));
  }
  
  .sidebar a i {
    font-size: 23px;
    margin: 0%;
    padding: 20px ;
    
    
  }
  
  .sidebar a span {
    letter-spacing: 1px;
  
  }
  
  #check {
    display: none;
  }
  
  
  
  .sidebar > a.active, .sidebar > a:hover:nth-child(even) {
    --accent-color: #b0bca6;
    --gradient-color: #61888c;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
      inset -7px -7px 10px 0px rgba(0, 0, 0, .1),
      3.5px 3.5px 20px 0px rgba(0, 0, 0, .1),
      2px 2px 5px 0px rgba(0, 0, 0, .1);
    border-radius: 1rem;
  }
  
  .sidebar a.active, .sidebar > a:hover:nth-child(odd) {
    --accent-color: #61888c;
    --gradient-color: #b0bca6;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
      inset -7px -7px 10px 0px rgba(0, 0, 0, .1),
      3.5px 3.5px 20px 0px rgba(0, 0, 0, .1),
      2px 2px 5px 0px rgba(0, 0, 0, .1);
    border-radius: 1rem;
    
  }
  
  
  
  .frame {
    width: 50%;
    height: 30%;
    margin: auto;
    text-align: center;
  }
  
  h2 {
    position: relative;
    text-align: center;
    color: #353535;
    font-size: 60px;
    font-family: 'Lato', sans-serif;
    margin: 0;
    color: #a759f5;
  }
  
  p {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    text-align: center;
    font-size: 30px;
    color: #d6adff;
    margin: 0;
  }
  
  .title {
    font-style: italic;
    font-size: 1.2rem;
    color: #000000;
    margin-bottom: 10px;
    position: relative;
  }
  
  @media(max-width: 860px) {
    .sidebar {
      height: auto;
      padding-right: 2%;
      
    }
  
    header, #btn, #cancel {
      display: none;
    }
  
    span {
      position: absolute;
      margin-left: 23px;
      opacity: 0;
      visibility: hidden;
    }
  
    .sidebar a {
      height: 80px;
    }
  
    .sidebar a i {
  
    }
  
    a:hover {
      width: 200px;
    }
  
    .sidebar a:hover span {
      opacity: 10;
      
    }
  }
  @media(min-width: 860px) {
    .sidebar > a.active, .sidebar > a:hover:nth-child(even) {
      scale: 1;
      translate: 1rem;
    }
  
    .sidebar a.active, .sidebar > a:hover:nth-child(odd) {
      scale: 1;
      translate: 1rem;
    }
  }
  
  @media(max-width: 540px) {
    .sidebar {
      height: auto;
      padding-left: 20%;
      
    }
  
    
  }
  
  
  @media(max-width: 450px) {
    .sidebar {
      
      
      
    }
  .sidebar a i {
    font-size: 23px;
    margin: 0%;
    padding: 3% ;
  }
  i{
  
  }
    
  }
  
  </style>
  
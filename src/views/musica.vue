<template>
  <div class="main-container">
    <sidebar />
    <div class="music-list-container">
      <header class="header">
        <h1 style="font-weight: 700">Selecciona Música</h1>
      </header>
      <div class="categories">
        <h2>Categorías</h2>
        <ul class="category-list">
          <li
            v-for="category in categories"
            :key="category.id"
            class="category-item"
          >
            <button @click="filterByCategory(category.id)">
              {{ category.name }}
            </button>
          </li>
        </ul>
      </div>
      <div class="song-list">
        <h2>{{ selectedCategoryName }}</h2>
        <ul>
          <li
            v-for="song in filteredSongs"
            :key="song.id"
            class="song-item"
            @click="selectSong(song)"
            :class="{ selected: selectedSong && selectedSong.id === song.id }"
          >
            <img :src="song.cover" alt="Cover" class="song-cover" />
            <div class="song-info">
              <h3 class="nombrecancion">{{ song.title }}</h3>
              <p>{{ song.description }}</p>
              <audio :src="song.audio" controls class="audio-player"></audio>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="selectedSong" class="bottom-button">
        <button @click="sendToMobile(selectedSong)">
          Enviar "{{ selectedSong.title }}" al móvil
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useBebeStore } from "@/stores/Publico/Bebe";
import sidebar from "@/components/sidebar.vue";
import Cookies from "js-cookie";
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
      categories: [
        { id: 1, name: "Canciones" },
        { id: 2, name: "Sonidos Relajantes" },
      ],
      songs: [
        {
          id: 1,
          title: "Canción de Cuna",
          description: "Canción clásica de cuna",
          cover: "/src//assets/imgmusica/1.jpg",
          category: 1,
          audio: "/src//assets/musica/1.mp3",
        },
        {
          id: 2,
          title: "Estrellita donde estas",
          description: "Cancion de piano",
          cover: "/src//assets/imgmusica/2.jpg",
          category: 1,
          audio: "/src//assets/musica/2.mp3",
        },
        {
          id: 3,
          title: "Duermete niño",
          description: "Duermete niño, duermete ya. Cancion de Piano",
          cover: "/src//assets/imgmusica/3.jpg",
          category: 1,
          audio: "/src//assets/musica/3.mp3",
        },
        {
          id: 4,
          title: "(They Long to Be) Close to You",
          description: "Cancion de Richard Chamberlain version cancion de cuna",
          cover: "/src//assets/imgmusica/4.jpg",
          category: 1,
          audio: "/src//assets/musica/4.mp3",
        },
        {
          id: 5,
          title: "Castillo Vagabundo",
          description: "Cancion de Studio Ghibli",
          cover: "/src//assets/imgmusica/5.jpg",
          category: 1,
          audio: "/src//assets/musica/5.mp3",
        },
        {
          id: 6,
          title: "Sonido Blanco",
          description: "Puede servir para ayudar a conciliar el sueño",
          cover: "/src//assets/imgmusica/6.jpg",
          category: 2,
          audio: "/src//assets/musica/6.mp3",
        },
        {
          id: 7,
          title: "Lluvia",
          description: "Lluvia suave y relajante",
          cover: "/src//assets/imgmusica/7.jpg",
          category: 2,
          audio: "/src//assets/musica/7.mp3",
        },
      ],
      selectedCategory: null,
      selectedSong: null, // Canción seleccionada
    };
  },
  computed: {
    filteredSongs() {
      if (!this.selectedCategory) {
        return this.songs;
      }
      return this.songs.filter(
        (song) => song.category === this.selectedCategory
      );
    },
    selectedCategoryName() {
      const category = this.categories.find(
        (cat) => cat.id === this.selectedCategory
      );
      return category ? category.name : "Todas las canciones";
    },
  },
  methods: {
    filterByCategory(categoryId) {
      this.selectedCategory = categoryId;
    },
    async selectSong(song) {
      this.selectedSong = song; // Guardar la canción seleccionadaputBebeSeleccionarMusica
      //alert(`selecciona la cancion "${song.id}" al móvil.`);
      const sleccionMusica =
        await this.useBebeStoreAdmi.putBebeSeleccionarMusica(
          Cookies.get("idUser"),
          song.id
        );
      console.log("seleccionMusica", sleccionMusica);
    },
    async sendToMobile(song) {
      //alert(`Enviando la canción "${song.title}" al móvil.`);
      const movil = await this.useBebeStoreAdmi.putBebeReproducirMusica(
        Cookies.get("idUser")
      );
      // Aquí puedes implementar la lógica para enviar la canción al móvil.
    },
  },
};
</script>

<style scoped>
.banner-container {
  position: relative;
  width: 100%;
  height: 23vh;
  /* Mantener la altura del banner */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* Apilar logo y texto verticalmente */
  gap: 10px;
  /* Espacio entre los elementos */
}
.logoe {
  width: 7rem;

  position: absolute;
  top: 20%;
  left: 17%;
  z-index: 50;
  transform: translate(-50%, -50%);
}
.banner-text {
  position: absolute;
  top: 40%;
  /* Ajusta según sea necesario */
  left: 40%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: Montserrat, sans-serif;
  z-index: 1;
  /* Asegura que el texto esté por encima del logo */
}
.banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Asegura que la imagen cubra el contenedor */
  filter: brightness(0.7);
}
.main-container {
  align-items: center;
  align-content: center;
  min-height: 100vh;
  background-repeat: repeat;
  padding-bottom: 10rem;
}
li,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.music-list-container {
  font-family: "Roboto", sans-serif;
  padding: 30px;
  width: 90%;
  height: 80%;
  margin: 0 auto;
  padding: none;
  border-radius: 10px;
  background-color: #4b2f03;
}
.header {
  text-align: center;
  background-image: linear-gradient(
    -45deg,
    var(--primary-color) 0%,
    var(--highlight-color) 100%
  );
  color: white;
  padding: 15px;
  border-radius: 5px;
}
.categories {
  margin: 20px 0;
}
.category-list {
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  scrollbar-width: none;
  /* Oculta la barra de desplazamiento en Firefox */
  -ms-overflow-style: none;
}
.category-item button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: medium;
}
.category-item button:hover {
  background-color: var(--secondary-color);
}
.song-list {
  margin-top: 20px;
}
.song-item {
  display: flex;
  font-size: large;
  align-items: center;
  overflow-y: scroll;
  scrollbar-width: none;
  /* Oculta la barra de desplazamiento en Firefox */
  -ms-overflow-style: none;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.song-item.selected {
  background-color: #f0f8ff;
  border: 8px solid var(--primary-color);
}
.bottom-button {
  position: fixed;
  bottom: 80px;
  left: 0;
  width: 100%;
  background-color: var(--secondary-color);
  text-align: center;
  padding: 1px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
.bottom-button button {
  padding: 15px 30px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.bottom-button button:hover {
  background-color: var(--secondary-color);
  color: white;
}
.song-cover {
  width: 90px;
  height: 90px;
  border-radius: 5px;
}
.song-info h3 {
  margin: 0;
  color: black;
  font-size: 20px;
}

.song-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
.audio-player {
  margin-top: 10px;
  width: 400px;
}
@media (max-width: 550px) {
  .bottom-button {
    bottom: 50px;
  }
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

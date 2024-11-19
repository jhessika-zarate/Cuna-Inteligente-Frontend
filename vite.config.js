import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // Configuración para el servidor de desarrollo
  server: {
    proxy: {
      "/upload-audio": {
        target: "https://jhessika-to-do.serverbb.online", // Asegúrate de que el backend Flask esté en este puerto
        changeOrigin: true,
        secure: false, // Asegúrate de que se permita la conexión no segura si es necesario
      },
    },
  },
  /// Configuración para el servidor de desarrollo
});

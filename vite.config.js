import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
   //vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // Configuración para el servidor de desarrollo
  server: {
    proxy: {
      '/upload-audio': {
        target: 'http://192.168.90.22:5000',  // URL de tu backend Flask en la máquina virtual
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
      /// Configuración para el servidor de desarrollo
})

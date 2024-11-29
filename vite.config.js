import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet à Render ou d'autres plateformes d'héberger correctement
    port: process.env.PORT || 5173, // Utilise le port spécifié par l'environnement ou 5173 par défaut
  },
})

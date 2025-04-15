import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})

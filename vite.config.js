
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CLAVE: Esto asegura que todas las rutas se construyan correctamente
  // para Netlify, corrigiendo el error de despliegue.
  base: '/', 
})
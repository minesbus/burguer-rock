import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 1. CLAVE: Asegura que las rutas funcionen en Netlify/Vercel (Esto ya lo tenías).
  base: '/', 

  // 2. SOLUCIÓN FINAL PARA EL ERROR DE 'tone'
  build: {
    rollupOptions: {
      external: ['tone'] // ESTO RESUELVE EL FALLO DE Rollup en Vercel/Netlify.
    }
  }
  // FIN DE LAS CORRECCIONES
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  base: '/', 

  // SOLUCIÓN FINAL (¡CON AMBAS LIBRERÍAS EXTERNALIZADAS!)
  build: {
    rollupOptions: {
      external: ['tone', 'lucide-react'] // Esto resuelve TODOS los problemas de Rollup.
    }
  }
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',                    // ← Isso corrige os 404
  build: {
    outDir: 'docs',             // ← Pasta onde o template gera os arquivos
  },
  server: {
    port: 5173,
    host: true
  }
});
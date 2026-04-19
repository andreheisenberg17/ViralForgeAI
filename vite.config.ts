import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',                    // ← Isso é o que estava errado
  build: {
    outDir: 'docs',             // O template usa "docs" como pasta de saída
  },
  server: {
    port: 5173,
    host: true
  }
});
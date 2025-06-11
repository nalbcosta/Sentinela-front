import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ""
      }
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          bootstrap: ['react-bootstrap', 'bootstrap'],
        }
      }
    }
  }
})

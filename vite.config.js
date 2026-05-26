import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@react-three/fiber', '@react-three/drei', '@react-spring/three', '@react-spring/core'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // increase limit to 1000kb to suppress warning for now
  },
})
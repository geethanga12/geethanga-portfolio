import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React runtime into its own long-cached chunk
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library — changes less often than app code
          'vendor-motion': ['framer-motion'],
          // Icon library — large, split out for better caching
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
})

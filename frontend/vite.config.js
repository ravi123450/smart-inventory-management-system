import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Customize the development server port
    open: true, // Automatically open the app in the browser
  },
  build: {
    outDir: 'dist', // Specify the output directory for production builds
    sourcemap: true, // Generate source maps for debugging
  },
  resolve: {
    alias: {
      '@': '/src', // Create a shortcut for importing from the src directory
    },
  },
})

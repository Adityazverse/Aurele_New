import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Aurele_New/',
  plugins: [react()],
  server: {
    host: true, // Listen on all local IPs
    allowedHosts: true // Allow tunneling services like localtunnel
  }
})

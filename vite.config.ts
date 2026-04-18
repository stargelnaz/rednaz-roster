import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const buildDate = new Date()
  .toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: '2-digit' })
  .toUpperCase()
  .replace(/ /g, '-')

const BUILD_INFO = `v0.1.0 · ${buildDate}`

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5180,
  },
  define: {
    __BUILD__: JSON.stringify(BUILD_INFO),
  },
})

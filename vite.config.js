import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://bf4634a16911.ngrok-free.app/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

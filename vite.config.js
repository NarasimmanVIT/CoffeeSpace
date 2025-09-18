// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    allowedHosts: [
      "3a3ea3673377.ngrok-free.app",
    ],
  },

})

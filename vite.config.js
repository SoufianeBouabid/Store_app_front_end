import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],

  build: {
    publicPath: "/",
    rollupOptions: {
      input: {
        app: './index.html',
      },
      external: ["@fortawesome/free-solid-svg-icons", "@fortawesome/react-fontawesome"],
    },
  },
})

import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api/v1/autenticacion/registro': process.env.EF_PERSONAL_DEV_API ?? 'http://127.0.0.1:5257',
    },
  },
})

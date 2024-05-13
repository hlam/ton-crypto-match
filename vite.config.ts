import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-ignore
  base: process.env.GH_PAGES ? '/ton-crypto-match/' : './',
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
})

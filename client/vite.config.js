import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://harvest-hub-server-one.vercel.app/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Adjust the rewrite logic
      },
    },
  },
});
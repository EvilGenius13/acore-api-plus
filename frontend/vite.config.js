import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3005',
  //       changeOrigin: true,
  //     },
  //   },
  // },
});

import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    EnvironmentPlugin({
      API_URL: 'http://localhost:3001/api', // Default value or use from .env
    }),
  ],
  build: {
    outDir: 'dist',
  },
});

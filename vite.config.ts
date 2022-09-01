import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4103,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./node_modules/bloben-components/styles/colors.scss";`,
      },
    },
  },
});

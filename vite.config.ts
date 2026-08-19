import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Define the configuration settings for our Vite compilation engine
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // Automatically opens the app in the browser when running
  },
});
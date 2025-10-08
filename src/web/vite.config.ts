import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Atlas-Bearing-The-Heavens-terminal-simulator/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

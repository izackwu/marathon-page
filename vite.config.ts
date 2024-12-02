import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: { 
    'import.meta.env.VITE_SITE_TITLE': '"My Marathon Journey"'
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Make sure 'export default' is included at the beginning!
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
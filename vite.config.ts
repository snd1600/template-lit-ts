import { defineConfig } from 'vite';
import windicss from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [windicss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});

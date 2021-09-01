import { defineConfig } from 'vite';
import windicss from 'vite-plugin-windicss';

/* eslint @typescript-eslint/ban-ts-comment: off */
/* eslint @typescript-eslint/no-unsafe-call: off */
export default defineConfig({
  plugins: [
    // @ts-ignore
    windicss.default(),
  ],
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

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gamana: resolve(__dirname, 'work/gamana.html'),
        cashel: resolve(__dirname, 'work/cashel.html'),
        catalyse: resolve(__dirname, 'work/catalyse.html'),
        cybonet: resolve(__dirname, 'work/cybonet.html'),
      },
    },
  },
});

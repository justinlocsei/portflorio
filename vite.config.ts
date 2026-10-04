import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { getPaths } from './src/build/paths.ts';

const paths = getPaths();

export default defineConfig({
  build: {
    emptyOutDir: true,
    manifest: true,
    outDir: paths.dist.site,
    rollupOptions: {
      input: paths.entry.client
    }
  },
  plugins: [react()],
  root: paths.site,
  ssr: {
    noExternal: ['react', 'react-dom']
  }
});

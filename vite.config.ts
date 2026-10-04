import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { getPaths } from './src/build/paths.ts';

import path from 'node:path';

const paths = getPaths();

export default defineConfig({
  build: {
    emptyOutDir: true,
    manifest: true,
    outDir: paths.dist.site,
    rollupOptions: {
      input: path.join(paths.site, 'entry-client.tsx')
    }
  },
  plugins: [react()],
  root: paths.site,
  ssr: {
    noExternal: ['react', 'react-dom']
  }
});

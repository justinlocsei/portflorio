import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { getPaths } from './paths.ts';

import path from 'node:path';

const paths = getPaths();

/**
 * Build a Vite configuration
 */
function buildConfig({
  entryFileNames,
  input,
  output,
  ssr
}: {
  entryFileNames?: string;
  input: string;
  output: string;
  ssr: boolean;
}) {
  return defineConfig({
    build: {
      emptyOutDir: true,
      manifest: true,
      outDir: output,
      rollupOptions: {
        input,
        output: entryFileNames ? { entryFileNames } : undefined
      },
      ssr
    },
    plugins: [react()],
    root: paths.site,
    ssr: { noExternal: ['react', 'react-dom'] }
  });
}

export const client = buildConfig({
  input: paths.entry.client,
  output: paths.dist.site,
  ssr: false
});

export const server = buildConfig({
  entryFileNames: path.relative(
    paths.dist.build,
    paths.dist.serverBundle
  ),
  input: paths.entry.server,
  output: paths.dist.build,
  ssr: true
});

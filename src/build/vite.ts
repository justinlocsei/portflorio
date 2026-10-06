import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { getPaths } from './paths.ts';

import { readFileSync } from 'node:fs';
import path from 'node:path';

const paths = getPaths();

/**
 * Get npm packages to include in the vendor chunk
 */
function getVendorPackages(): string[] {
  return Object.keys(
    JSON.parse(
      readFileSync(path.join(paths.root, 'package.json'), 'utf8')
    ).dependencies as Record<string, string>
  );
}

/**
 * Build a Vite configuration
 */
function buildConfig({
  entryFileNames,
  input,
  output,
  ssr,
  vendorChunk
}: {
  entryFileNames?: string;
  input: string;
  output: string;
  ssr: boolean;
  vendorChunk: boolean;
}) {
  const vendor = getVendorPackages();

  return defineConfig({
    appType: 'spa',
    build: {
      emptyOutDir: true,
      manifest: true,
      outDir: output,
      rollupOptions: {
        input,
        output: {
          ...(entryFileNames ? { entryFileNames } : {}),
          ...(vendorChunk
            ? {
              manualChunks: id => {
                if (id.includes('node_modules')) {
                  for (const name of vendor) {
                    if (id.includes(`/node_modules/${name}/`)) {
                      return 'vendor';
                    }
                  }
                }

                return undefined;
              }
            }
            : {})
        }
      },
      ssr
    },
    plugins: [react()],
    root: paths.site,
    ssr: { noExternal: vendor }
  });
}

export const client = buildConfig({
  input: paths.entry.client,
  output: paths.dist.site,
  ssr: false,
  vendorChunk: true
});

export const server = buildConfig({
  entryFileNames: path.relative(
    paths.dist.build,
    paths.dist.serverBundle
  ),
  input: paths.entry.server,
  output: paths.dist.build,
  ssr: true,
  vendorChunk: false
});

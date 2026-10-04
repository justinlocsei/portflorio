import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);

/**
 * Get the paths for the repository
 */
export function getPaths() {
  const src = path.join(REPO_ROOT, 'src');
  const dist = path.join(REPO_ROOT, 'dist');
  const site = path.join(src, 'site');

  return {
    arrangements: path.join(REPO_ROOT, 'arrangements'),
    dist: {
      build: path.join(dist, 'build'),
      root: dist,
      serverBundle: path.join(dist, 'build', 'server.js'),
      site: path.join(dist, 'site')
    },
    entry: {
      client: path.join(site, 'entry', 'client.tsx'),
      server: path.join(site, 'entry', 'server.tsx')
    },
    root: REPO_ROOT,
    src,
    site
  };
}

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

  const distSite = path.join(dist, 'site');

  return {
    arrangements: path.join(REPO_ROOT, 'arrangements'),
    dist: {
      build: path.join(dist, 'build'),
      images: path.join(distSite, 'images'),
      root: dist,
      serverBundle: path.join(dist, 'build', 'server.js'),
      site: distSite
    },
    entry: {
      client: path.join(site, 'entry', 'client.tsx'),
      server: path.join(site, 'entry', 'server.tsx')
    },
    generated: path.join(site, 'generated'),
    root: REPO_ROOT,
    src,
    site
  };
}

/**
 * Convert a route to its HTML file
 */
export function routeToFile(
  route: string,
  root: string
): string {
  return path.join(
    root,
    ...route.split('/'),
    'index.html'
  );
}

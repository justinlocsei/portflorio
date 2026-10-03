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
  return {
    arrangements: path.join(REPO_ROOT, 'arrangements'),
    root: REPO_ROOT
  };
}

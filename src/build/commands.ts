import { OperationalError } from 'larkspur';

import type { EnvironmentVariables } from '../core/types.ts';
import { REPO_ROOT } from './paths.ts';

import { spawnSync } from 'node:child_process';

/**
 * Run an npm executable
 */
export function npx(
  npmBin: string,
  args: string[] = [],
  options: { env?: EnvironmentVariables } = {}
): void {
  const result = spawnSync(
    'npm',
    ['exec', '--', npmBin, ...args],
    {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      env: { ...process.env, ...options.env },
      stdio: 'inherit'
    }
  );

  if (result.error || result.status !== 0) {
    throw OperationalError.silent();
  }
}

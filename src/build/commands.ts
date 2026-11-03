import { OperationalError } from 'larkspur';

import type { EnvironmentVariables } from '../core/types.ts';
import { REPO_ROOT } from './paths.ts';

import { spawnSync } from 'node:child_process';

/**
 * Options for running a command
 */
type CommandOptions = {
  cwd?: string;
  env?: EnvironmentVariables;
  silent?: boolean;
};

/**
 * Run a command and show its output
 */
export function showOutput(
  command: string,
  args: string[] = [],
  { cwd, env, silent = false }: CommandOptions = {}
): void {
  const result = spawnSync(command, args, {
    cwd: cwd ?? REPO_ROOT,
    encoding: 'utf8',
    env: { ...process.env, ...env },
    stdio: 'inherit'
  });

  if (result.error || result.status !== 0) {
    throw silent ? OperationalError.silent() : new OperationalError(
      `${[command, ...args].join(' ')} failed`
    );
  }
}

/**
 * Run an npm executable
 */
export function npx(
  npmBin: string,
  args: string[] = [],
  options: Pick<CommandOptions, 'cwd' | 'env'> = {}
): void {
  showOutput('npm', ['exec', '--', npmBin, ...args], {
    ...options,
    silent: true
  });
}

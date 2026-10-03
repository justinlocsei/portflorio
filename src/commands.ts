import { REPO_ROOT } from './paths.ts';
import type { EnvironmentVariables } from './types.ts';

import type {
  SpawnSyncOptions,
  SpawnSyncOptionsWithStringEncoding
} from 'node:child_process';
import { spawnSync } from 'node:child_process';

/**
 * Options for running a command
 */
type CommandOptions = {
  cwd?: string;
  env?: EnvironmentVariables;
};

/**
 * Run a command
 */
function run(
  command: string,
  args: string[],
  options: SpawnSyncOptions = {}
): string {
  const spawnOptions: SpawnSyncOptionsWithStringEncoding = {
    ...options,
    cwd: options.cwd ?? REPO_ROOT,
    encoding: 'utf8',
    env: { ...process.env, ...options.env }
  };

  const result = spawnSync(command, args, spawnOptions);
  const label = [command, ...args].join(' ');

  if (result.error) {
    throw new Error(`Failed to run command: ${label}`, result.error);
  }

  const output = result
    .output
    .filter(Boolean)
    .join('\n');

  if (result.status !== 0) {
    throw new Error(
      `${label} exited with code ${result.status ?? 'unknown'}\n${output}`
    );
  }

  return output;
}

/**
 * Run a command and capture its output
 */
export function captureOutput(
  command: string,
  args: string[] = [],
  options?: CommandOptions
): string {
  return run(command, args, { ...options, stdio: 'pipe' });
}

/**
 * Run a command and show its output
 */
export function showOutput(
  command: string,
  args: string[] = [],
  options?: CommandOptions
): void {
  run(command, args, { ...options, stdio: 'inherit' });
}

/**
 * Run a command from node_modules via npm exec
 */
export function npx(
  npmBin: string,
  args: string[] = [],
  options: Pick<CommandOptions, 'env'> = {}
): void {
  showOutput('npm', ['exec', '--', npmBin, ...args], options);
}

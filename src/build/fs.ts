import fs from 'node:fs/promises';

/**
 * Report whether a path is a directory
 */
export function isDirectory(path: string): Promise<boolean> {
  return fs.stat(path).then(
    s => s.isDirectory(),
    () => false
  );
}

/**
 * Report whether a path is a file
 */
export function isFile(path: string): Promise<boolean> {
  return fs.stat(path).then(
    s => s.isFile(),
    () => false
  );
}

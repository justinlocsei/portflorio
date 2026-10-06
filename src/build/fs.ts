import fs from 'fs-extra';

/**
 * Create a symlink, overwriting any existing resource
 */
export async function ensureSymlink(
  linkPath: string,
  targetPath: string
): Promise<void> {
  await fs.remove(linkPath);
  await fs.ensureSymlink(targetPath, linkPath);
}

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

import { afterEach, assert, beforeEach, describe, it } from 'vitest';

import { isDirectory, isFile } from './fs.ts';

import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

let tempDir = '';

beforeEach(async () => {
  tempDir = await mkdtemp(path.join(tmpdir(), 'portflorio-fs-'));
});

afterEach(async () => {
  await rm(tempDir, { force: true, recursive: true });
});

describe('isDirectory', () => {
  it('returns true for a directory', async () => {
    assert.isTrue(await isDirectory(tempDir));
  });

  it('returns false when the path is a file', async () => {
    const file = path.join(tempDir, '01.json');
    await writeFile(file, '{}');

    assert.isFalse(await isDirectory(file));
  });

  it('returns false when the path is missing', async () => {
    assert.isFalse(await isDirectory(path.join(tempDir, 'missing')));
  });
});

describe('isFile', () => {
  it('returns true for a file', async () => {
    const file = path.join(tempDir, '01.json');
    await writeFile(file, '{}');

    assert.isTrue(await isFile(file));
  });

  it('returns false when the path is a directory', async () => {
    assert.isFalse(await isFile(tempDir));
  });

  it('returns false when the path is missing', async () => {
    assert.isFalse(await isFile(path.join(tempDir, 'missing')));
  });
});

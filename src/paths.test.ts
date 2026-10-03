import { assert, describe, it } from 'vitest';

import { getPaths, REPO_ROOT } from './paths.ts';

import fs from 'node:fs';
import path from 'node:path';

describe('getPaths', () => {
  it('includes the repository root', () => {
    assert.equal(getPaths().root, REPO_ROOT);
  });

  it('includes a directory containing arrangements', () => {
    const images = fs.globSync(
      path.join(getPaths().arrangements, '**', '*.jpg')
    );

    assert.isNotEmpty(images);
  });
});

describe('REPO_ROOT', () => {
  it('is the root of the repository', () => {
    assert.isTrue(
      fs.statSync(path.join(REPO_ROOT, 'README.md')).isFile()
    );
  });
});

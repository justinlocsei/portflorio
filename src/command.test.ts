import { assert, describe, it } from 'vitest';

import { captureOutput } from './commands.ts';

describe('captureOutput', () => {
  it('captures the output of a command', () => {
    assert.equal(captureOutput('echo', ['hello']), 'hello\n');
  });

  it('throws an error if the command fails', () => {
    assert.throws(() => captureOutput('false'), /exited with code 1/);
  });

  it('throws an error if an invalid command is provided', () => {
    const name = 'not-a-valid-command';

    assert.throws(() => captureOutput(name), name);
  });
});

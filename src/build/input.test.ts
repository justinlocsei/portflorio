import { assert, describe, it } from 'vitest';

import { requestLines } from './input.ts';

import { PassThrough } from 'node:stream';

function createStreams() {
  return {
    input: new PassThrough(),
    output: new PassThrough()
  };
}

describe('requestLines', () => {
  it('collects lines until a blank line is entered', async () => {
    const { input, output } = createStreams();

    const lines = requestLines({ input, output });

    input.write('alfa\n');
    input.write('bravo\n');
    input.write('\n');

    assert.deepEqual(await lines, ['alfa', 'bravo']);
  });

  it('trims whitespace from each line', async () => {
    const { input, output } = createStreams();

    const lines = requestLines({ input, output });

    input.write('  alfa  \n');
    input.write('\n');

    assert.deepEqual(await lines, ['alfa']);
  });

  it('writes the prompt to output', async () => {
    const { input, output } = createStreams();
    const written: string[] = [];

    output.on('data', (chunk) => {
      written.push(chunk.toString());
    });

    const lines = requestLines({ input, output, prompt: '> ' });

    input.write('\n');

    await lines;

    assert.include(written.join(''), '> ');
  });

  it('accepts suggestions without changing line collection', async () => {
    const { input, output } = createStreams();

    const lines = requestLines({
      input,
      output,
      suggestions: ['alfa', 'bravo']
    });

    input.write('alfa\n');
    input.write('\n');

    assert.deepEqual(await lines, ['alfa']);
  });
});

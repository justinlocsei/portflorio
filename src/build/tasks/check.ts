import C from 'larkspur';

import { npx } from '../commands.ts';

const CHECKS = {
  code: [['biome', ['lint', '.', '--error-on-warnings']]],
  formatting: [
    ['biome', ['ci', '--linter-enabled=false', '.']],
    ['dprint', ['check']]
  ],
  types: [['tsc', ['--noEmit']]]
} satisfies Record<string, Array<[string, string[]]>>;

/**
 * The name of a supported check
 */
type CheckName = keyof typeof CHECKS;

export default C(
  'Check code',
  {
    only: C.flag('choice', 'Only run a specific check', {
      choices: Object.keys(CHECKS) as CheckName[],
      repeatable: true
    })
  },
  ({ only }) => {
    for (const [name, commands] of Object.entries(CHECKS)) {
      if (!only.length || only.includes(name as CheckName)) {
        for (const [command, args] of commands) {
          npx(command, args);
        }
      }
    }
  }
);

import C from 'larkspur';

import { npx } from '../commands.ts';

export default C(
  'Run tests',
  { file: C.flag('path', 'A test file to run', { repeatable: true }) },
  flags => {
    npx('vitest', ['run', '--reporter', 'verbose', ...flags.file]);
  }
);

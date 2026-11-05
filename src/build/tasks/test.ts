import C from 'larkspur';

import { npx } from '../commands.ts';
import { generateData } from '../site.ts';

export default C(
  'Run tests',
  {
    file: C.flag('path', 'A test file to run', { repeatable: true }),
    prepare: C.flag('boolean', 'Prepare site data', { default: true })
  },
  async flags => {
    if (flags.prepare) {
      await generateData();
    }

    npx('vitest', ['run', '--reporter', 'verbose', ...flags.file]);
  }
);

import C from 'larkspur';

import { npx } from '../commands.ts';

export default C(
  'Format code',
  () => {
    npx('biome', ['check', '--write', '--linter-enabled=false', '.']);
    npx('dprint', ['fmt']);
  }
);

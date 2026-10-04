import C from 'larkspur';

import { npx } from '../commands.ts';
import { buildDevelopmentIndex, buildStaticSite } from '../site.ts';

export default C.group('Manage the site', {
  build: C('Build the site', async () => {
    await buildStaticSite();
  }),

  develop: C('Run a development server', async () => {
    await buildDevelopmentIndex();
    npx('vite');
  })
});

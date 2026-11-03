import C from 'larkspur';

import { npx } from '../commands.ts';
import {
  buildDevelopmentIndex,
  buildStaticSite,
  generateData
} from '../site.ts';

export default C.group('Manage the site', {
  build: C('Build the site', async () => {
    await buildStaticSite();
  }),

  deploy: C(
    'Deploy the site',
    {
      build: C.flag('boolean', 'Build before deploying', { default: true }),
      'dry-run': C.flag('boolean', 'Test deployment', { default: false })
    },
    async flags => {
      if (flags.build) {
        await buildStaticSite();
      }

      npx('wrangler', ['deploy', ...(flags['dry-run'] ? ['--dry-run'] : [])]);
    }
  ),

  develop: C('Run a development server', async () => {
    await buildDevelopmentIndex();
    npx('vite');
  }),

  prepare: C('Prepare site data', async () => {
    await generateData();
  })
});

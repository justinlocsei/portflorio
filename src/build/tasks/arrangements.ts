import C from 'larkspur';

import { isISODate } from '../../core/time.ts';
import { addArrangement } from '../arrangements.ts';
import { loadFlowers } from '../flowers.ts';
import { requestLines } from '../input.ts';

export default C.group('Manage the catalog of arrangements', {
  add: C(
    'Add an arrangement',
    {
      date: C.flag('string', 'A custom arrangement date in YYYY-MM-DD format', {
        isValid: isISODate
      }),
      image: C.flag('path', 'The path to the image', { required: true })
    },
    async ({ date, image }) => {
      console.log('Flowers:');

      const flowers = await requestLines({
        prompt: '- ',
        suggestions: await loadFlowers().then(fs => fs.map(f => f.name))
      });

      const arrangement = await addArrangement({ date, image, flowers });

      console.log(
        '\nArrangement added',
        JSON.stringify(arrangement, null, 2)
      );
    }
  )
});

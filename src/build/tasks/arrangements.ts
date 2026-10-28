import C from 'larkspur';

import { isISODate } from '../../core/time.ts';
import {
  addArrangement,
  listArrangementIDs,
  loadArrangements,
  pickArrangement,
  tryStoredID
} from '../arrangements.ts';
import { loadFlowers } from '../flowers.ts';
import { requestLines } from '../input.ts';
import { shareArrangement } from '../share.ts';

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
  ),

  share: C(
    'Share an arrangement',
    {
      id: C.flag('string', 'The ID of the arrangement to share', {
        completion: listArrangementIDs,
        required: true
      })
    },
    async flags => {
      const arrangement = pickArrangement(
        await loadArrangements(),
        tryStoredID(flags.id)
      );

      console.log(await shareArrangement(arrangement));
    }
  )
});

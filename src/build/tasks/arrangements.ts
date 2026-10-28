import C from 'larkspur';

import { isISODate } from '../../core/time.ts';
import { MECHANICS } from '../../core/types.ts';
import {
  addArrangement,
  listArrangementIDs,
  loadArrangements,
  pickArrangement,
  tryStoredID
} from '../arrangements.ts';
import { loadFlowers } from '../flowers.ts';
import { findSourceImages } from '../images.ts';
import { requestLines } from '../input.ts';
import paths from '../paths.ts';
import { shareArrangement } from '../share.ts';

export default C.group('Manage the catalog of arrangements', {
  add: C(
    'Add an arrangement',
    {
      date: C.flag('string', 'A custom ISO date', { isValid: isISODate }),
      id: C.flag('string', 'The ID of the source images', { required: true }),
      mechanic: C.flag('choice', 'The mechanic of the arrangement', {
        choices: MECHANICS,
        required: true
      })
    },
    async ({ date, id, mechanic }) => {
      const images = await findSourceImages(paths.images, Number(id));

      console.log('Flowers:');

      const flowers = await requestLines({
        prompt: '- ',
        suggestions: await loadFlowers().then(fs => fs.map(f => f.name))
      });

      const arrangement = await addArrangement({
        date,
        images,
        flowers,
        mechanic
      });

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

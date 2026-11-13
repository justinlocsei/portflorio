import C from 'larkspur';

import { getISODate, isISODate } from '../../core/time.ts';
import { MECHANICS } from '../../core/types.ts';
import {
  addArrangement,
  listArrangementIDs,
  loadArrangements,
  pickArrangement,
  tryStoredID
} from '../arrangements.ts';
import { showOutput } from '../commands.ts';
import { loadFlowers } from '../flowers.ts';
import { findSourceImages } from '../images.ts';
import { requestFlowers } from '../input.ts';
import paths from '../paths.ts';
import { shareArrangement } from '../share.ts';

export default C.group('Manage the catalog of arrangements', {
  add: C(
    'Add an arrangement',
    {
      commit: C.flag('boolean', 'Commit the arrangement', { default: true }),
      date: C.flag('string', 'A custom ISO date', { isValid: isISODate }),
      id: C.flag('string', 'The ID of the source images', { required: true }),
      mechanic: C.flag('choice', 'The mechanic of the arrangement', {
        choices: MECHANICS,
        required: true
      })
    },
    async ({ commit, date, id, mechanic }) => {
      const images = await findSourceImages(paths.images, Number(id));

      showOutput('imgcat', [images.preview]);

      console.log('\nFlowers:');

      const flowers = await requestFlowers({
        flowerNames: await loadFlowers().then(fs => fs.map(f => f.name))
      });

      const arrangement = await addArrangement({
        date,
        images,
        flowers,
        mechanic
      });

      if (!commit) {
        return;
      }

      showOutput('git', ['add', paths.arrangements]);

      showOutput('git', [
        'commit',
        '-m',
        `Add arrangement for ${
          getISODate(arrangement.date)
        } (${arrangement.storedID})`
      ]);
    }
  ),

  share: C(
    'Share an arrangement',
    {
      id: C.flag('string', 'The ID of the arrangement to share', {
        completion: listArrangementIDs
      })
    },
    async flags => {
      const arrangements = await loadArrangements();

      const latestID = arrangements
        .map(a => a.storedID)
        .sort()
        .pop();

      if (!latestID) {
        throw new Error('No arrangements found');
      }

      const arrangement = pickArrangement(
        arrangements,
        tryStoredID(flags.id || latestID)
      );

      console.log(shareArrangement(arrangement));
    }
  )
});

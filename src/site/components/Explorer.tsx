import { summarizeFlowers } from '../../core/flowers.ts';
import type { Arrangement, ExplorerView } from '../types.ts';
import { useState } from '../ui.ts';
import C from './Explorer.styles.ts';
import Gallery from './Gallery.tsx';
import Lens from './Lens.tsx';

export default function Explorer({
  arrangements: allArrangements
}: {
  arrangements: Arrangement[];
}) {
  const [view, setView] = useState<ExplorerView>({
    colors: [],
    flowers: []
  });

  const { colors, flowers } = view;

  const allFlowers = summarizeFlowers(allArrangements);

  let arrangements = allArrangements;

  if (flowers.length) {
    arrangements = arrangements.filter(a =>
      flowers.every(flower => a.flowers.some(f => f.name === flower))
    );
  }

  if (colors.length) {
    arrangements = arrangements.filter(a =>
      colors.every(color => a.flowers.some(f => f.colors.includes(color)))
    );
  }

  return (
    <div className={C.root}>
      <aside className={C.lens}>
        <Lens
          arrangements={arrangements}
          flowers={allFlowers}
          setView={setView}
          view={view}
        />
      </aside>

      <main className={C.gallery}>
        <Gallery arrangements={arrangements} />
      </main>
    </div>
  );
}

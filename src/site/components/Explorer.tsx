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
    flowers: []
  });

  const flowers = summarizeFlowers(allArrangements);

  const arrangements = allArrangements.filter((arrangement) => {
    return view.flowers.every(flower =>
      arrangement.flowers.some(f => f.name === flower)
    );
  });

  return (
    <div className={C.root}>
      <aside className={C.lens}>
        <Lens
          arrangements={arrangements}
          flowers={flowers}
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

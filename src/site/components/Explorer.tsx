import type { Arrangement } from '../types.ts';
import C from './Explorer.styles.ts';
import Gallery from './Gallery.tsx';
import Lens from './Lens.tsx';

export default function Explorer({
  arrangements
}: {
  arrangements: Arrangement[];
}) {
  return (
    <div className={C.root}>
      <aside className={C.lens}>
        <Lens arrangements={arrangements} />
      </aside>

      <main className={C.gallery}>
        <Gallery arrangements={arrangements} />
      </main>
    </div>
  );
}

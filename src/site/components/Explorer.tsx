import { summarizeFlowers } from '../../core/flowers.ts';
import type {
  Arrangement,
  View,
  ViewFilter,
  ViewFilterID,
  ViewManager,
  ViewMode
} from '../types.ts';
import { useState } from '../ui.ts';
import C from './Explorer.styles.ts';
import Gallery from './Gallery.tsx';
import Lens from './Lens.tsx';
import Photo from './Photo.tsx';
import Status from './Status.tsx';

const DEFAULT_VIEW: View = {
  colors: [],
  flowers: []
};

export default function Explorer({
  arrangements: allArrangements
}: {
  arrangements: Arrangement[];
}) {
  const [mode, setMode] = useState<ViewMode>('list');
  const [view, setView] = useState<View>({ ...DEFAULT_VIEW });

  const { arrangement } = view;
  const allFlowers = summarizeFlowers(allArrangements);
  const arrangements = filterArrangements(allArrangements, view);

  const manager: ViewManager = {
    colors: createViewFilter(view, setView, 'colors'),
    flowers: createViewFilter(view, setView, 'flowers')
  };

  return (
    <div className={C.root}>
      <aside className={C.lens}>
        <Lens
          arrangements={arrangements}
          flowers={allFlowers}
          view={manager}
        />
      </aside>

      <main className={C.gallery}>
        <Gallery
          arrangements={arrangements}
          mode={mode}
          onRequestArrangement={arrangement =>
            setView({ ...view, arrangement })}
          view={manager}
        />
      </main>

      <footer className={C.status}>
        <Status
          arrangements={arrangements.length}
          mode={mode}
          onClear={() => setView(DEFAULT_VIEW)}
          onSelectMode={setMode}
          totalArrangements={allArrangements.length}
        />
      </footer>

      {arrangement && (
        <div className={C.arrangement.root}>
          <div className={C.arrangement.image}>
            <div className={C.arrangement.photo}>
              <Photo arrangement={arrangement} type='full' />
            </div>

            <button
              className={C.arrangement.close}
              onClick={() => setView({ ...view, arrangement: undefined })}
              type='button'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function filterArrangements(
  all: Arrangement[],
  { colors, flowers }: View
): Arrangement[] {
  let arrangements = all;

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

  return arrangements;
}

function createViewFilter<T extends string>(
  view: View,
  setView: (view: View) => void,
  key: ViewFilterID
): ViewFilter<T> {
  const set = new Set(view[key] as string[]);

  return {
    active: set.size > 0,
    add: (...items: T[]) => {
      setView({ ...view, [key]: [...view[key], ...items] });
    },
    clear: () => {
      setView({ ...view, [key]: [] });
    },
    has: (item: T) => {
      return set.has(item);
    },
    remove: (...items: T[]) => {
      setView({
        ...view,
        [key]: view[key].filter(item => !items.includes(item as T))
      });
    },
    toggle: (...items: T[]) => {
      let current = view[key];

      for (const item of items) {
        if (set.has(item)) {
          current = current.filter(i => i !== item);
        } else {
          current = [...current, item];
        }
      }

      setView({ ...view, [key]: [...current] });
    }
  };
}

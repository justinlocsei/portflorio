import { summarizeFlowers } from '../../core/flowers.ts';
import { labelArrangement } from '../display.ts';
import type {
  Arrangement,
  View,
  ViewFilter,
  ViewFilterID,
  ViewManager,
  ViewMode
} from '../types.ts';
import { useEffect, useRef, useState } from '../ui.ts';
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const allFlowers = summarizeFlowers(allArrangements);
  const arrangements = filterArrangements(allArrangements, view);

  useEffect(() => {
    if (!arrangement) {
      return;
    }

    const previouslyFocused = document.activeElement;

    closeRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [arrangement?.id]);

  useEffect(() => {
    if (!arrangement) {
      return;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [arrangement?.id]);

  useEffect(() => {
    if (!arrangement) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setView(current => ({ ...current, arrangement: undefined }));
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [arrangement?.id]);

  const manager: ViewManager = {
    colors: createViewFilter(view, setView, 'colors'),
    flowers: createViewFilter(view, setView, 'flowers')
  };

  const inert = arrangement !== undefined;

  return (
    <div className={C.root}>
      <aside aria-label='Filters' className={C.lens} inert={inert}>
        <Lens
          arrangements={arrangements}
          flowers={allFlowers}
          view={manager}
        />
      </aside>

      <section
        aria-label='View options'
        className={C.status}
        inert={inert}
      >
        <Status
          arrangements={arrangements.length}
          mode={mode}
          onClear={() => setView(DEFAULT_VIEW)}
          onSelectMode={setMode}
          totalArrangements={allArrangements.length}
        />
      </section>

      <main aria-label='Arrangements' className={C.gallery} inert={inert}>
        <Gallery
          arrangements={arrangements}
          mode={mode}
          onRequestArrangement={arrangement =>
            setView({ ...view, arrangement })}
          view={manager}
        />
      </main>

      {arrangement && (
        <div
          aria-label={labelArrangement(arrangement)}
          aria-modal='true'
          className={C.arrangement.root}
          role='dialog'
        >
          <div className={C.arrangement.image}>
            <div className={C.arrangement.photo}>
              <Photo
                arrangement={arrangement}
                loading='eager'
                type='full'
              />
            </div>

            <button
              className={C.arrangement.close}
              onClick={() =>
                setView(current => ({ ...current, arrangement: undefined }))}
              ref={closeRef}
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
  setView: (view: (current: View) => View) => void,
  key: ViewFilterID
): ViewFilter<T> {
  const set = new Set(view[key] as string[]);

  return {
    active: set.size > 0,
    add: (...items: T[]) => {
      setView(current => ({
        ...current,
        [key]: [...current[key], ...items],
        source: undefined
      }));
    },
    clear: () => {
      setView(current => ({
        ...current,
        [key]: [],
        source: undefined
      }));
    },
    has: (item: T) => {
      return set.has(item);
    },
    remove: (...items: T[]) => {
      setView(current => ({
        ...current,
        [key]: current[key].filter(item => !items.includes(item as T)),
        source: undefined
      }));
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

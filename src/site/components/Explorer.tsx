import type { Color } from '../../core/colors.ts';
import { summarizeFlowers } from '../../core/flowers.ts';
import { labelArrangement } from '../display.ts';
import type { Arrangement, View, ViewManager, ViewMode } from '../types.ts';
import { useEffect, useLayoutEffect, useRef, useState } from '../ui.ts';
import { createViewFilter, filterArrangements } from '../view.ts';
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
  const [scrollTarget, setScrollTarget] = useState<number | null>(null);

  const { arrangement } = view;

  const closeRef = useRef<HTMLButtonElement>(null);
  const skipLensScroll = useRef(true);

  const allFlowers = summarizeFlowers(allArrangements);
  const arrangements = filterArrangements(allArrangements, view);

  useLayoutEffect(() => {
    if (scrollTarget === null) {
      return;
    }

    document.getElementById(String(scrollTarget))?.scrollIntoView();
    setScrollTarget(null);
  }, [scrollTarget]);

  useLayoutEffect(() => {
    if (skipLensScroll.current) {
      skipLensScroll.current = false;
      return;
    } else if (scrollTarget !== null) {
      return;
    }

    window.scrollTo(0, 0);
  }, [mode, view.colors, view.flowers]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (arrangement) {
        setView(current => ({ ...current, arrangement: undefined }));
      } else if (view.colors.length || view.flowers.length) {
        setView({ ...DEFAULT_VIEW });
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [arrangement, view.colors, view.flowers]);

  useEffect(() => {
    if (!arrangement) {
      return;
    }

    const previouslyFocused = document.activeElement;

    closeRef.current?.focus();

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }

      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [arrangement?.id]);

  const manager: ViewManager = {
    colors: createViewFilter(view, setView, 'colors'),
    flowers: createViewFilter(view, setView, 'flowers')
  };

  const onToggleArrangementFlower = (id: number, flower: string) => {
    manager.flowers.toggle(flower);
    setScrollTarget(id);
  };

  const onToggleArrangementColor = (id: number, color: Color) => {
    manager.colors.toggle(color);
    setScrollTarget(id);
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
          onClear={() => setView({ ...DEFAULT_VIEW })}
          onSelectMode={setMode}
          totalArrangements={allArrangements.length}
        />
      </section>

      <main aria-label='Arrangements' className={C.gallery} inert={inert}>
        <Gallery
          arrangements={arrangements}
          mode={mode}
          onToggleColor={onToggleArrangementColor}
          onToggleFlower={onToggleArrangementFlower}
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

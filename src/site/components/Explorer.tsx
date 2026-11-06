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
  flowers: [],
  focus: null
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

  useLayoutEffect(() => {
    const { focus } = view;

    if (focus !== null) {
      document.getElementById(String(focus))?.scrollIntoView();
      setView(v => ({ ...v, focus: null }));
    }
  }, [view.focus]);

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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setView(current => ({ ...current, arrangement: undefined }));
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }

      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
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
          onClear={() => setView({ ...DEFAULT_VIEW })}
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

import type { ViewMode } from '../types.ts';
import type { Children } from '../ui.ts';
import { useId } from '../ui.ts';
import C from './Status.styles.ts';

type ModeSelector = (mode: ViewMode) => void;

const SECTIONS = ['count', 'mode'] as const;
const MODES: ViewMode[] = ['grid', 'list'];

const SECTION_LABELS: Record<typeof SECTIONS[number], string> = {
  count: 'Arrangements',
  mode: 'Display Format'
};

const MODE_LABELS: Record<ViewMode, string> = {
  list: 'List',
  grid: 'Grid'
};

export default function Status({
  arrangements,
  mode: currentMode,
  onClear,
  onSelectMode,
  totalArrangements
}: {
  arrangements: number;
  mode: ViewMode;
  onClear: () => void;
  onSelectMode: ModeSelector;
  totalArrangements: number;
}) {
  const filtered = arrangements < totalArrangements;
  const modeLegendId = useId();

  return (
    <div className={C.root}>
      <Section type='count'>
        <p
          aria-atomic='true'
          aria-live='polite'
          className={C.counts.root}
        >
          {filtered && (
            <>
              <span className={C.counts.visible}>
                {arrangements}
              </span>

              <span className={C.counts.joiner}>/</span>
            </>
          )}

          <span className={C.counts.count}>
            {totalArrangements}
          </span>

          {filtered && (
            <button
              aria-label='Show all arrangements'
              className={C.counts.reset}
              onClick={onClear}
              type='button'
            >
              All
            </button>
          )}
        </p>
      </Section>

      <Section legendId={modeLegendId} type='mode'>
        <ul aria-labelledby={modeLegendId} className={C.modes}>
          {MODES.map(mode => (
            <Mode
              current={mode === currentMode}
              key={mode}
              mode={mode}
              onSelect={onSelectMode}
            />
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  children,
  legendId,
  type
}: {
  children: Children;
  legendId?: string;
  type: typeof SECTIONS[number];
}) {
  const S = C.section;

  return (
    <div className={S.root(type)}>
      <div className={S.title} id={legendId}>
        {SECTION_LABELS[type]}
      </div>

      <div className={S.content}>{children}</div>
    </div>
  );
}

function Mode({
  current,
  mode,
  onSelect
}: {
  current: boolean;
  mode: ViewMode;
  onSelect: ModeSelector;
}) {
  const S = C.mode;

  return (
    <li className={S.root(current ? 'selected' : 'selectable')}>
      <button
        aria-pressed={current}
        className={S.select}
        disabled={current}
        onClick={() => onSelect(mode)}
        type='button'
      >
        {MODE_LABELS[mode]}
      </button>
    </li>
  );
}

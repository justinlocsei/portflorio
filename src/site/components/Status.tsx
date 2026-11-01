import type { ViewMode } from '../types.ts';
import type { Children } from '../ui.ts';
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

  return (
    <div className={C.root}>
      <Section type='count'>
        <p className={C.counts.root}>
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
              className={C.counts.reset}
              onClick={onClear}
              type='button'
            >
              All
            </button>
          )}
        </p>
      </Section>

      <Section type='mode'>
        <ul className={C.modes}>
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
  type
}: {
  children: Children;
  type: typeof SECTIONS[number];
}) {
  const S = C.section;

  return (
    <div className={S.root(type)}>
      <div className={S.title}>{SECTION_LABELS[type]}</div>

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
        className={S.select}
        onClick={() => onSelect(mode)}
        type='button'
      >
        {MODE_LABELS[mode]}
      </button>
    </li>
  );
}

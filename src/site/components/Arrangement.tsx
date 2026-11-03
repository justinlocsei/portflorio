import { identifiers } from 'ruscus';

import { COLORS } from '../../core/colors.ts';
import { formatDate, getISODate } from '../../core/time.ts';
import { labelMechanic } from '../display.ts';
import type {
  Arrangement as ArrangementType,
  ViewMode,
  ViewProps
} from '../types.ts';
import { useId } from '../ui.ts';
import C from './Arrangement.styles.ts';
import Photo from './Photo.tsx';

export default function Arrangement({
  arrangement,
  mode,
  onSelect,
  view
}: ViewProps & {
  arrangement: ArrangementType;
  mode: ViewMode;
  onSelect: () => void;
}) {
  const { swatch } = identifiers(C);
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      className={C.root(mode === 'grid' && 'grid')}
    >
      <button
        className={C.media}
        onClick={onSelect}
        type='button'
      >
        <Photo arrangement={arrangement} type='preview' />
      </button>

      <div className={C.meta}>
        <header className={C.details.root}>
          <h3 className={C.details.date}>
            <time dateTime={getISODate(arrangement.date)} id={titleId}>
              {formatDate(arrangement.date)}
            </time>
          </h3>

          <p className={C.details.mechanic}>
            {labelMechanic(arrangement.mechanic)}
          </p>
        </header>

        <ul className={C.flowers}>
          {arrangement.flowers.map(flower => {
            const { name } = flower;
            const flowerActive = view.flowers.has(name);

            return (
              <li
                className={C.flower.root(flowerActive && 'selected')}
                key={name}
              >
                <button
                  className={C.flower.name}
                  onClick={() => view.flowers.toggle(name)}
                  type='button'
                >
                  {name}
                </button>

                <span className={C.flower.colors.root}>
                  {flower.colors.map(c => {
                    const colorActive = view.colors.has(c);

                    return (
                      <button
                        className={C.flower.colors.color(
                          colorActive ? 'selected' : 'selectable'
                        )}
                        key={c}
                        onClick={() => view.colors.toggle(c)}
                        style={{ [swatch]: `#${COLORS[c].hex}` }}
                        type='button'
                      />
                    );
                  })}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

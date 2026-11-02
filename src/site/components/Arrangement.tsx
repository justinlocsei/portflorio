import { identifiers } from 'ruscus';

import { COLORS } from '../../core/colors.ts';
import { formatDate, getISODate } from '../../core/time.ts';
import { labelArrangement, labelColor, labelMechanic } from '../display.ts';
import type {
  Arrangement as ArrangementType,
  ViewMode,
  ViewProps
} from '../types.ts';
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

  return (
    <article className={C.root(mode === 'grid' && 'grid')}>
      <button
        aria-label={`View arrangment: ${labelArrangement(arrangement)}`}
        className={C.media}
        onClick={onSelect}
        type='button'
      >
        <Photo arrangement={arrangement} type='preview' />
      </button>

      <div className={C.meta}>
        <div className={C.details.root}>
          <time
            className={C.details.date}
            dateTime={getISODate(arrangement.date)}
          >
            {formatDate(arrangement.date)}
          </time>

          <div className={C.details.mechanic}>
            {labelMechanic(arrangement.mechanic)}
          </div>
        </div>

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
                  aria-label={`Filter by ${name.toLocaleLowerCase()}`}
                  aria-pressed={flowerActive}
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
                        aria-label={`Filter by ${
                          labelColor(c).toLocaleLowerCase()
                        }`}
                        aria-pressed={colorActive}
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

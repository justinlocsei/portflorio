import { identifiers } from 'ruscus';

import { COLORS } from '../../core/colors.ts';
import { formatDate, getISODate } from '../../core/time.ts';
import { labelMechanic } from '../display.ts';
import type { Arrangement as ArrangementType, ViewProps } from '../types.ts';
import C from './Arrangement.styles.ts';
import Photo from './Photo.tsx';

export default function Arrangement({
  arrangement,
  view
}: ViewProps & {
  arrangement: ArrangementType;
}) {
  const { swatch } = identifiers(C);

  return (
    <article className={C.root}>
      <div className={C.media}>
        <Photo arrangement={arrangement} type='preview' />
      </div>

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

            return (
              <li
                className={C.flower.root(
                  (view.flowers.has(name)
                    || flower.colors.some(c => view.colors.has(c)))
                    && 'selected'
                )}
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
                  {flower.colors.map(c => (
                    <button
                      className={C.flower.colors.color(
                        view.colors.has(c) ? 'selected' : 'selectable'
                      )}
                      key={c}
                      onClick={() => view.colors.toggle(c)}
                      style={{ [swatch]: `#${COLORS[c].hex}` }}
                      title={COLORS[c].name}
                      type='button'
                    />
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

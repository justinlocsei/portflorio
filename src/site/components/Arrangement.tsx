import { identifiers } from 'ruscus';

import { COLORS } from '../../core/colors.ts';
import { formatDate, getISODate } from '../../core/time.ts';
import type { ImageID } from '../../core/types.ts';
import { map } from '../../core/utils.ts';
import { labelMechanic } from '../display.ts';
import type { Arrangement as ArrangementType, ViewProps } from '../types.ts';
import C from './Arrangement.styles.ts';
import Photo from './Photo.tsx';

export default function Arrangement({
  arrangement,
  type,
  view
}: ViewProps & {
  arrangement: ArrangementType;
  type: 'detail' | 'overview';
}) {
  const photo = map(type).to<ImageID>({
    detail: 'full',
    overview: 'preview'
  });

  const { swatch } = identifiers(C);

  return (
    <article className={C.root}>
      <a className={C.media} href={arrangement.route}>
        <Photo arrangement={arrangement} type={photo} />
      </a>

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
            const { colors, name } = flower;

            return (
              <li
                className={C.flower.root(
                  view.flowers.includes(name) && 'selected'
                )}
                key={name}
              >
                <span className={C.flower.name}>{name}</span>

                <span
                  className={C.flower.colors.root}
                >
                  {colors.slice(0, 2).map(c => (
                    <span
                      className={C.flower.colors.color}
                      key={c}
                      style={{ [swatch]: `#${COLORS[c].hex}` }}
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

import { formatDate, getISODate } from '../../core/time.ts';
import type { ImageID } from '../../core/types.ts';
import { map } from '../../core/utils.ts';
import { labelMechanic } from '../display.ts';
import type { Arrangement as ArrangementType } from '../types.ts';
import C from './Arrangement.styles.ts';
import Photo from './Photo.tsx';

export default function Arrangement({
  arrangement,
  type
}: {
  arrangement: ArrangementType;
  type: 'detail' | 'overview';
}) {
  const photo = map(type).to<ImageID>({
    detail: 'full',
    overview: 'preview'
  });

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
          {arrangement.flowers.map(flower => (
            <li className={C.flower} key={flower.name}>
              {flower.name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

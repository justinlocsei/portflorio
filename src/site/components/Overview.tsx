import { formatDate, getISODate } from '../../core/time.ts';
import type { Arrangement } from '../types.ts';
import C from './Overview.styles.ts';
import Photo from './Photo.tsx';

export default function Overview(
  { arrangement }: { arrangement: Arrangement }
) {
  return (
    <div className={C.root}>
      <a className={C.media} href={arrangement.route}>
        <Photo arrangement={arrangement} type='preview' />
      </a>

      <div className={C.meta}>
        <time className={C.date} dateTime={getISODate(arrangement.date)}>
          {formatDate(arrangement.date)}
        </time>

        <ul className={C.flowers}>
          {arrangement.flowers.map(flower => (
            <li className={C.flower} key={flower}>
              {flower}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { IMAGE_DIMENSIONS } from '../../core/site.ts';
import { listItems } from '../../core/text.ts';
import { formatDate, getISODate } from '../../core/time.ts';
import type { Arrangement } from '../types.ts';
import C from './Overview.styles.ts';

const IMAGE = IMAGE_DIMENSIONS.preview;

export default function Overview({
  arrangement
}: {
  arrangement: Arrangement;
}) {
  const { flowers, images } = arrangement;

  return (
    <div className={C.root}>
      <a className={C.media} href={arrangement.route}>
        <img
          alt={`A floral arrangement with ${
            listItems(flowers.map(f => f.toLocaleLowerCase()), 'and')
          }`}
          className={C.image}
          decoding='async'
          height={IMAGE.height}
          loading='lazy'
          src={images.preview}
          width={IMAGE.width}
        />
      </a>

      <div className={C.meta}>
        <time className={C.date} dateTime={getISODate(arrangement.date)}>
          {formatDate(arrangement.date)}
        </time>

        <ul className={C.flowers}>
          {flowers.map(flower => (
            <li className={C.flower} key={flower}>
              {flower}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

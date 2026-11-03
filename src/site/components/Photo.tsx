import { IMAGE_DIMENSIONS } from '../../core/site.ts';
import type { ImageID } from '../../core/types.ts';
import { describeArrangement, scaleBy } from '../display.ts';
import type { Arrangement } from '../types.ts';
import C from './Photo.styles.ts';

export default function Photo({
  arrangement,
  loading = 'lazy',
  type
}: {
  arrangement: Arrangement;
  loading?: 'eager' | 'lazy';
  type: ImageID;
}) {
  const image = arrangement.images[type];
  const size = scaleBy(IMAGE_DIMENSIONS[type], 0.5);

  return (
    <img
      alt={describeArrangement(arrangement, { colors: type === 'full' })}
      className={C.root}
      decoding='async'
      height={size.height}
      loading={loading}
      src={image}
      width={size.width}
    />
  );
}
